/* ─────────────────────────────────────────────────────────────────
   Cloudflare Pages middleware — Basic Auth gate
   ─────────────────────────────────────────────────────────────────
   Runs on Cloudflare's edge BEFORE any asset is served. As long as
   the request lacks valid Basic Auth credentials, the browser
   receives a 401 — meaning the HTML / JS / images are NEVER sent
   without the right password. This is true server-side protection,
   not bypassable from DevTools.

   The expected password lives in the Cloudflare Pages "Environment
   variables" (Settings → Environment variables → add SITE_PASSWORD
   as an *encrypted* variable). Never commit the real password.
   ───────────────────────────────────────────────────────────────── */

interface Env {
  SITE_PASSWORD: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const auth = request.headers.get('Authorization');

  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      // Basic Auth format is "user:password"; we ignore the user field
      // (anything works) and only check the password.
      const password = decoded.slice(decoded.indexOf(':') + 1);
      if (password === env.SITE_PASSWORD) {
        return next();
      }
    } catch {
      // malformed header → fall through to 401
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="PAUNE Architectes"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
