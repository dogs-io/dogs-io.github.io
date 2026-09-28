# SOS Pets Mobile public site

Hebrew is served at `/`; English is served at `/en/`. Edit the matching HTML
files together, then check both pages locally with:

```bash
python3 -m http.server 3002 --bind 127.0.0.1 --directory .
```

The protected volunteer guide remains a separate build at `/guide/`. Public
landing assets use the `/landing-assets/` URL prefix.

The footer keeps `© 2026 SOS Pets Mobile` as the copyright line. Its separate
centered developer credit links Sergei Bazarnik to `https://bazarnik.dev/`; use
`סרגיי בזרניק` on the Hebrew page and keep both language variants synchronized.

The landing page follows the device light/dark preference on first visit. Its
icon button cycles Automatic, Light, Dark, then Automatic again, matching the
guide; Light or Dark is stored in local storage as `sos-landing-theme`, while
Automatic removes that key. The language control matches the guide too: globe
plus language on wider screens, globe-only on phones. Mobile navigation is a
reading-direction side drawer with a matching edge menu button, centered brand,
backdrop, localized accessible labels, an organization link, and official
localized store badges anchored at the bottom. Keep the small pre-stylesheet
theme script in both HTML files so the saved or system theme is applied before
the first paint.

Both language pages declare ICO and 32-pixel PNG favicons plus a 180-pixel
Apple touch icon generated from the canonical S.O.S app icon. All three use the
supported `/landing-assets/` path. Keep their declarations and assets together
when the app artwork changes.

`landing-assets/volunteer.jpeg` is copied byte-for-byte from
`../../ios/sos/Assets.xcassets/volunteer.imageset/volunteer.jpeg`; use the source
asset, never a screenshot of the app displaying it.

The Hebrew App Store badge is the unmodified SVG downloaded from Apple's App
Store Marketing Tools localized badge endpoint. The Hebrew and English Google
Play badges are the official localized web SVGs from Google's Partner Marketing
Hub. Keep the vector originals: the previous 120×40 Apple and 270×80 Google
rasters become visibly pixelated on high-density screens.

Nginx caches landing assets as immutable. Whenever `styles.css` or `site.js`
changes, update its `?v=` content fingerprint in both HTML files before
deploying. This prevents a new page from being paired with an old cached asset.

Keep SEO metadata synchronized in both HTML files. Each page has its own title,
description, canonical URL, language alternates, and localized social text,
while both use `landing-assets/social-preview.jpg`. The JSON-LD graph describes
the free mobile app and its S.O.S Pets publisher. Update visible facts,
metadata, and structured data together; never add ratings or reviews that are
not real.
