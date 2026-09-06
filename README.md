# sharp11-site
Play-alongs, chord charts and practice tools.

## Android App Links

`.well-known/assetlinks.json` associates this site with `app.sharp11` and the
**Play app signing certificate**, as verified in Play Console. Do not substitute
the upload or debug certificate. Update this file when Play signing keys change.

GitHub Pages serves the file directly on `https://sharp11.app`. It redirects
`www.sharp11.app` to the apex domain, but Android domain verification does not
accept a redirect for the Digital Asset Links file. The Cloudflare Worker in
`workers/app-links.mjs` returns the same bundled JSON directly for that one URL;
all other site requests retain the existing GitHub Pages behavior.

After approval to publish:

1. Publish the updated JSON through the site's normal GitHub Pages deployment.
2. Deploy `wrangler.jsonc` with `npx wrangler deploy` in the Cloudflare account
   managing `sharp11.app`. The `www` DNS record must remain proxied. This route
   does not replace the site's hosting or require a new custom domain.
3. Whenever the JSON changes, republish both GitHub Pages and the Worker.
4. Check both HTTPS endpoints without following redirects. Each must return
   HTTP 200, `application/json`, package `app.sharp11`, and the Play certificate.
5. In Play Console > Deep links, recheck both domains. Then verify an actual
   Play-signed installation with `adb shell pm verify-app-links --re-verify
   app.sharp11` and `adb shell pm get-app-links app.sharp11` after verification
   completes. A debug/upload-signed APK does not prove Play certificate validation.

Local Worker packaging check (no deployment):
`npx wrangler deploy --dry-run --outdir .wrangler/dry-run`.
