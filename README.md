# DentTalks presents Independence@Scale

Static one-page website for the DentTalks **Independence@Scale** educational series.

## Project contents

| File / folder | Purpose |
| --- | --- |
| `index.html` | Full landing page |
| `site-config.js` | Live links and next-session details |
| `assets/` | Presenter photo and intro flyer |
| `README_DEPLOY.md` | Hostinger / Cloudflare / Netlify deploy notes |

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Before Hostinger deploy

1. Edit `site-config.js` and add real URLs for join / recording / business briefing.
2. Replace placeholder images in `assets/` with the final:
   - `clark-caflisch-2026.png`
   - `intro-webinar-flyer.png`
3. Optionally set `domain` and add a canonical URL in `index.html`.

## Hostinger upload checklist

Upload these into the site’s `public_html` folder:

- `index.html`
- `site-config.js`
- `assets/` (entire folder)

Keep `index.html` at the root of `public_html`, enable SSL, and point the domain at the Hostinger site.

See `README_DEPLOY.md` for fuller hosting options.
