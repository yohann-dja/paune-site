/* ─────────────────────────────────────────────────────────────────
   Cloudflare Pages middleware — DISABLED
   ─────────────────────────────────────────────────────────────────
   The Basic Auth gate is currently disabled: every request passes
   through. To re-enable, replace the body of `onRequest` with the
   commented block below AND make sure the SITE_PASSWORD environment
   variable is set in the Cloudflare Pages dashboard.
   ───────────────────────────────────────────────────────────────── */

interface Env {
  SITE_PASSWORD: string;
}

export const onRequest: PagesFunction<Env> = async ({ next }) => {
  return next();
};

/* ─── To re-enable password protection, use this body instead ──────

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const auth = request.headers.get('Authorization');

  if (auth?.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
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

─────────────────────────────────────────────────────────────────── */
