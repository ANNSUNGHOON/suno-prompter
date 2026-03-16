const DAILY_LIMIT = 10;
const memUsage = {};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server API key not configured.' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const today = new Date().toISOString().slice(0, 10);
  const key = `${ip}:${today}`;

  // Memory-based backup rate limit
  if (!memUsage[key]) memUsage[key] = 0;

  if (req.body?.action === 'check_remaining') {
    return res.status(200).json({ remaining: Math.max(0, DAILY_LIMIT - (memUsage[key] || 0)), limit: DAILY_LIMIT });
  }

  if (memUsage[key] >= DAILY_LIMIT) {
    return res.status(429).json({ error: `Daily limit reached (${DAILY_LIMIT}/day).`, remaining: 0 });
  }

  memUsage[key]++;

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
      memUsage[key]--;
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    return res.status(200).json({ ...data, _remaining: Math.max(0, DAILY_LIMIT - memUsage[key]) });
  } catch (error) {
    memUsage[key]--;
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
