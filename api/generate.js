// Free-trial server proxy has been retired.
// This endpoint no longer holds or spends the owner's ANTHROPIC_API_KEY.
// The app keeps working site-side with your own API key (BYOK, ⚙ settings).
const DISABLED = {
  error: 'Free trial API has been disabled. Please use your own API key (BYOK).',
  code: 'FREE_TRIAL_DISABLED',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  return res.status(410).json(DISABLED);
}
