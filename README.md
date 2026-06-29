# Dr Imran Hayat Master Website

A premium static master website for `drimranhayat.com`, built with plain HTML, CSS, and JavaScript. It is designed as a professional academic portfolio and a central gateway for educational websites and future subdomain-based learning platforms.

## Folder Structure

```text
/
|-- index.html
|-- styles.css
|-- script.js
|-- README.md
|-- assets/
|   |-- favicon/
|   |   |-- favicon.svg
|   |-- images/
|       |-- og-image.svg
|-- data/
    |-- projects.json
```

## Edit Project Cards

Learning hub cards are stored in `data/projects.json`. Add, remove, or edit objects in that file:

```json
{
  "title": "New Learning Hub",
  "category": "Subject / Audience",
  "description": "Short accurate description of the platform.",
  "url": "https://example.drimranhayat.com",
  "futureUrl": "https://future.drimranhayat.com",
  "status": "Planned / In Development",
  "icon": "book-open"
}
```

Available icon names include `book-open`, `mosque`, `scroll`, `library`, `target`, `sparkles`, `heart`, `network`, `pen`, `graduation`, and `presentation`.

## Update Links

- Confirm live project links in `data/projects.json`.
- Replace `#` placeholders in `index.html` for Privacy Policy, Terms of Use, and social or research profiles once real URLs are available.
- Keep placeholder links where details are not yet confirmed to avoid inventing profiles or claims.

## Update SEO Metadata

SEO tags are in the `<head>` of `index.html`.

Update these when the site branding changes:

- `<title>`
- meta description
- canonical URL
- Open Graph title, description, URL, and image
- Twitter card metadata
- Person JSON-LD
- WebSite JSON-LD

The Open Graph image currently points to `assets/images/og-image.svg`. Replace it later if a custom branded image or professional photo-based preview becomes available.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare Pages, choose **Create a project**.
3. Connect the GitHub repository.
4. Use these settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
5. Deploy.
6. In **Custom domains**, add `drimranhayat.com`.
7. Follow Cloudflare's DNS instructions, usually adding the required CNAME or using Cloudflare nameservers.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Open repository **Settings**.
3. Go to **Pages**.
4. Select the branch, usually `main`.
5. Select the root folder `/`.
6. Save and wait for GitHub Pages to publish.

For a custom domain, add `drimranhayat.com` in the Pages custom domain field and configure DNS with your domain provider.

## Connect `drimranhayat.com`

For Cloudflare Pages:

- Add `drimranhayat.com` under the Pages project's custom domains.
- Ensure DNS points to the Cloudflare Pages target.
- Enable HTTPS after Cloudflare verifies the domain.

For GitHub Pages:

- Add a `CNAME` file containing `drimranhayat.com` if GitHub does not create it automatically.
- Add the GitHub Pages DNS records required by GitHub.
- Enable HTTPS in repository Pages settings.

## Add Future Subdomains

For each future learning hub:

1. Build or deploy the subdomain site separately.
2. Add its DNS record, for example `quran.drimranhayat.com`.
3. Update the relevant card in `data/projects.json`:
   - set `url` to the live subdomain
   - update `status` to `Live`
   - remove `futureUrl` if no longer needed

## Future Content Areas

The current page includes ready sections for:

- learning websites and digital projects
- research areas
- teaching areas
- future publications
- future downloadable resources
- monetization readiness through policy links and expandable project/resource sections
- contact and academic profile links

Do not add publications, awards, affiliations, testimonials, statistics, or social links until verified information is available.
