# DentTalks Media (DentTracks)

Static media platform for **DentTracks** content — Independence@Scale series, podcasts/masterclasses, and DentTracks blogs.

## Stack

- `index.html` — DentTracks-styled media UI (tabs + cards)
- `site-config.js` — live URLs + media catalog (series, podcasts, blogs)
- `assets/` — presenters + flyer art

## Configure the intro recording

In `site-config.js`, set:

```js
introRecordingUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
```

Until that is set, the Independence@Scale featured card prompts Eventbrite registration.

## Local preview

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Hostinger deploy

Upload to `public_html`:

- `index.html`
- `site-config.js`
- `assets/` (entire folder)
- `blog/` (entire folder — local article pages)

Then clear Hostinger / Cloudflare cache.

## Tabs

1. **Independence@Scale** — intro recording + next live session + presenters  
2. **Podcasts** — DentTracks / DentTalks YouTube episodes  
3. **Blogs** — DentTracks insight articles  
