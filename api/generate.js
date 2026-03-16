const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jgfvwfalxnrdujaoqoiq.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZnZ3ZmFseG5yZHVqYW9xb2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTI4OTYsImV4cCI6MjA4OTIyODg5Nn0.amJtx-4ZGWi_psLbKte6z_W0oE1Ua9EWQxYVhHpatkc';
const DAILY_LIMIT = 10;

async function sb(path, method = 'GET', body = null) {
  const opts = {
    method, headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : undefined
    }
  };
  if (body) opts.body = JSON.stringify(body);
  Object.keys(opts.headers).forEach(k => opts.headers[k] === undefined && delete opts.headers[k]);
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, opts);
  return r.json();
}

async function getUsage(ip) {
  const today = new Date().toISOString().slice(0, 10);
  const data = await sb(`rate_limits?ip=eq.${encodeURIComponent(ip)}&date=eq.${today}&select=count`);
  return data?.[0]?.count || 0;
}

async function incrementUsage(ip) {
  const today = new Date().toISOString().slice(0, 10);
  const current = await getUsage(ip);
  if (current >= DAILY_LIMIT) return false;
  if (current === 0) {
    await sb('rate_limits', 'POST', { ip, date: today, count: 1 });
  } else {
    await sb(`rate_limits?ip=eq.${encodeURIComponent(ip)}&date=eq.${today}`, 'PATCH', { count: current + 1 });
  }
  return true;
}

async function decrementUsage(ip) {
  const today = new Date().toISOString().slice(0, 10);
  const current = await getUsage(ip);
  if (current > 0) {
    await sb(`rate_limits?ip=eq.${encodeURIComponent(ip)}&date=eq.${today}`, 'PATCH', { count: current - 1 });
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server API key not configured.' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';

  if (req.body?.action === 'check_remaining') {
    const used = await getUsage(ip);
    return res.status(200).json({ remaining: Math.max(0, DAILY_LIMIT - used), limit: DAILY_LIMIT });
  }

  const allowed = await incrementUsage(ip);
  if (!allowed) {
    return res.status(429).json({
      error: `Daily limit reached (${DAILY_LIMIT}/day). Enter your own API key in ⚙ for unlimited.`,
      remaining: 0
    });
  }

  try {
    const { system, messages, temperature } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        temperature: temperature ?? 0.7,
        system,
        messages
      })
    });

    const data = await response.json();
    if (!response.ok) {
      await decrementUsage(ip);
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const used = await getUsage(ip);
    return res.status(200).json({ ...data, _remaining: Math.max(0, DAILY_LIMIT - used) });
  } catch (error) {
    await decrementUsage(ip);
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
