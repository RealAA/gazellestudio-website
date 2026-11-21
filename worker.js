// Serves the static site from ./site and forwards Gazelle Circle app paths to the Circle app on Netlify.
// /gazelle-circle/ itself is a page of this website; everything below it (sign-in, dashboards, API) is the app.
const CIRCLE = 'https://gazelle-circle.netlify.app';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (['/gazelle-circle', '/gazelle-circle/', '/gazelle-circle/index.html'].includes(url.pathname)) {
      return env.ASSETS.fetch(request);
    }
    const forwarded = new Request(CIRCLE + url.pathname + url.search, request);
    forwarded.headers.set('X-Forwarded-Host', url.host);
    return fetch(forwarded, { redirect: 'manual' });
  },
};
