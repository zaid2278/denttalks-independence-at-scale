# DentTalks / Independence@Scale — One-Page Website

This is a static website designed to run on Hostinger, Cloudflare Pages, Netlify, GitHub Pages, or any standard web host.

## 1. Before publishing
Edit `site-config.js` and add your live links:

- `joinSeriesUrl`: Google Form, Calendly, HubSpot, GoHighLevel, Formspree landing form, etc.
- `introRecordingUrl`: YouTube, Vimeo, Google Drive, or recording page.
- `businessBriefingUrl`: separate business-interest form or booking link.
- `nextSessionDate`: e.g. `September 17, 2026 • 4:00 PM CT`.
- `nextSessionTitle`: update for the next webinar.
- `domain`: your final website domain.

If the URLs are left blank, the site automatically shows a non-broken "coming soon" state.

## 2. Cloudflare Pages
### Fastest method
1. Log in to Cloudflare.
2. Go to **Workers & Pages → Create → Pages → Upload assets**.
3. Upload the contents of this folder (or the ZIP after extracting it).
4. Cloudflare creates a `*.pages.dev` preview URL.
5. In **Custom domains**, connect your domain.
6. Keep SSL/TLS on **Full (strict)** once DNS is connected.

### Git method
Put these files in a GitHub repository and connect the repository to Cloudflare Pages. There is no build command and the output directory is the repository root.

## 3. Hostinger

### Manual upload
1. Open **Websites → Manage → File Manager**.
2. Open the site's `public_html` folder.
3. Upload `index.html`, `site-config.js`, and the `assets` folder (plus `blog/` if changed).
4. Make sure `index.html` is directly in `public_html`.
5. Point the purchased domain to the Hostinger site.
6. Enable the included SSL certificate.

### Auto-deploy from GitHub (recommended)
Hostinger’s built-in **Advanced → GIT** can be temporarily unavailable. Use GitHub Actions + FTP instead.

1. In hPanel go to **Files → FTP Accounts** (or **Websites → denttalks.com → Files → FTP**).
2. Create/note an FTP account whose home points at the site (or use the main account).
3. Copy: **FTP hostname/IP**, **username**, **password**. Confirm whether plain FTP (port 21) or FTPS is required.
4. On GitHub open the repo → **Settings → Secrets and variables → Actions → New repository secret** and add:

| Secret | Example / notes |
| --- | --- |
| `FTP_SERVER` | Hostname or IP from hPanel (often `ftp.denttalks.com` or `*.hostingersite.com`) |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |

Optional: if Hostinger requires FTPS or a different remote path, edit `.github/workflows/deploy-hostinger.yml` (`protocol` / `port` / `server-dir`). Default remote path is `/public_html/`.

5. Push to `main` (or run **Actions → Deploy to Hostinger → Run workflow**).
6. Check the Actions run log. Live site should match the repo after a successful deploy (hard-refresh / purge Cloudflare if you use it).

The workflow file is `.github/workflows/deploy-hostinger.yml`. It uploads the site root and skips `.git`, `.github`, `dist`, and README files.

## 4. Domain strategy
Because DentTalks is the education/media brand, the cleanest long-term architecture is usually:

- Main domain: a DentTalks-branded domain
- Series path: `/independence-at-scale`
- Or a dedicated series domain that redirects/canonicals back to DentTalks later.

Possible names to check with a registrar (availability NOT verified):
- denttalks.live
- denttalks.education
- denttalksseries.com
- independenceatscale.com
- joinindependenceatscale.com

Avoid relying on a domain until your registrar confirms it is available and does not create a trademark/brand conflict.

## 5. Recommended lead capture
For the first release, the simplest approach is:

- `Join the Series` → Google Form / HubSpot / GoHighLevel form
- `Watch the Introduction` → YouTube/Vimeo unlisted or public video
- `Business Briefing` → separate form or calendar; do not combine this with accredited CE registration

## 6. SEO after domain purchase
Update:
- `<link rel="canonical">` (add it in `index.html`)
- `og:url`
- sitemap/robots if you add them
- social image if you replace the flyer

The page already includes title, description, Open Graph, mobile responsiveness, and basic accessibility.
