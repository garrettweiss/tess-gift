/**
 * Vercel serverless function: logs visitor IP (and optional geo headers) so you can
 * see who viewed the site in the Vercel dashboard (Project → Logs).
 * Called once when the app loads from the client.
 */
export default function handler(
  req: { method?: string; headers: Record<string, string | string[] | undefined> },
  res: { status: (code: number) => { end: () => void }; setHeader: (name: string, value: string) => void }
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(204).end();
    return;
  }

  const raw =
    req.headers['x-forwarded-for'] ??
    req.headers['x-real-ip'] ??
    req.headers['x-vercel-forwarded-for'] ??
    '';
  const ip = (typeof raw === 'string' ? raw.split(',')[0] : raw[0] ?? '').trim() || 'unknown';
  const country = req.headers['x-vercel-ip-country'];
  const city = req.headers['x-vercel-ip-city'];

  const payload = { time: new Date().toISOString(), ip, country, city };
  console.log('[visit]', JSON.stringify(payload));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(204).end();
}
