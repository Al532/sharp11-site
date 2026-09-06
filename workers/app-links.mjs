import assetLinks from '../.well-known/assetlinks.json' with { type: 'json' };

// Only the Digital Asset Links endpoint is routed here. GitHub Pages continues
// to handle the site and its normal www-to-apex redirects.
export default {
  fetch(request) {
    const url = new URL(request.url);
    if (url.hostname !== 'www.sharp11.app' || url.pathname !== '/.well-known/assetlinks.json') {
      return fetch(request);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' }
      });
    }
    return new Response(request.method === 'HEAD' ? null : JSON.stringify(assetLinks, null, 2) + '\n', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=600'
      }
    });
  }
};
