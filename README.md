# Mathibe Geomatics & Consulting – Website

A professional, dark-themed geomatics website built with vanilla HTML5, CSS3, and JavaScript (no jQuery, no Bootstrap 4). Seven service pages, portfolio, testimonials, quote form, and a blog post.

---

## 📁 File Structure

```
mathibe-geomatics/
├── index.html              ← Homepage (all 8 required sections)
├── about.html
├── quote.html
├── contact.html
├── testimonials.html
├── portfolio.html
├── 404.html
├── services/
│   ├── 3d-laser-scanning.html
│   ├── gpr-underground-detection.html
│   ├── drone-lidar-surveys.html
│   ├── topographical-surveys.html
│   ├── mining-surveys.html
│   ├── engineering-surveys.html
│   └── draughting.html
├── blog/
│   └── why-lidar-matters.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       └── mathibe-logo.jpeg
├── sitemap.xml
├── robots.txt
├── _redirects              ← Netlify clean URLs
└── README.md
```

---

## 🔧 Setup & Configuration

### 1. Replace the Formspree Endpoint

All contact and quote forms use Formspree for email delivery. To activate them:

1. Go to [https://formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your endpoint (looks like `https://formspree.io/f/abcdefgh`).
3. Search for `https://formspree.io/f/your-endpoint` across all HTML files and replace with your real endpoint.

Files to update:
- `index.html` (quick enquiry form)
- `contact.html` (contact form)
- `quote.html` (quote request form)

### 2. Replace Unsplash Images with Real Client Photos

All images are currently sourced from Unsplash. To replace with real project photos:

1. Upload your images to `assets/images/` (optimise to ≤200KB per image, WebP preferred).
2. Replace each `src="https://images.unsplash.com/..."` URL with your local path, e.g. `src="../assets/images/project-midrand.jpg"`.

Key images to replace:
- Hero carousel backgrounds (3 images in `index.html`)
- Portfolio project thumbnails (`portfolio.html`, `index.html`)
- Testimonial avatars (use actual client photos if permitted, or professional stock)
- Service page headers (one per service page)

### 3. Google Maps Embed

The contact page includes a placeholder Google Maps iframe. To show your exact office location:

1. Go to [https://www.google.com/maps](https://www.google.com/maps) and search `1069 Ga-Rankuwa View, Gauteng`.
2. Click **Share** → **Embed a map** → copy the iframe URL.
3. Replace the `src` attribute in the `<iframe>` in `contact.html` and `index.html`.

### 4. Self-Hosting Google Fonts (Optional for Production)

For best performance and privacy, self-host the fonts:

```bash
# Install google-webfonts-helper or use fontsource
npm install @fontsource/montserrat @fontsource/open-sans
```

Or download WOFF2 files from [https://fonts.google.com](https://fonts.google.com) and add `@font-face` declarations to `css/style.css`.

### 5. Update `sitemap.xml`

Replace `https://www.mathibegeomatics.co.za` with your actual live domain throughout `sitemap.xml`.

### 6. Social Media Links

Update placeholder `href="#"` social links in all footers with real social profile URLs:
- Facebook: `https://www.facebook.com/mathibegeomatics`
- LinkedIn: `https://www.linkedin.com/company/mathibe-geomatics`
- Instagram: `https://www.instagram.com/mathibegeomatics`
- WhatsApp: Already configured with `wa.me/27817734326`

---

## 🚀 Deployment

### Deploy to Netlify (Recommended – Free)

1. Zip the entire `mathibe-geomatics/` folder.
2. Go to [https://app.netlify.com](https://app.netlify.com) → **Add new site** → **Deploy manually**.
3. Drag the zip file into the upload zone.
4. Set your custom domain in **Domain settings**.
5. The `_redirects` file automatically enables clean URLs (no `.html` extension).

### Deploy to any Static Host (GitHub Pages, Vercel, etc.)

Simply upload all files maintaining the directory structure. Ensure the web server is configured to serve `404.html` for missing routes.

---

## 🔑 Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 (semantic) | Page structure |
| CSS3 (custom properties, Grid, Flexbox) | Styling |
| Vanilla ES2020+ JavaScript | Interactivity |
| Font Awesome 6 (CDN) | Icons |
| Google Fonts (CDN) | Typography |
| Formspree | Form email delivery |
| Unsplash (placeholder) | Stock images |

**No jQuery. No Bootstrap. No frameworks.**

---

## ✅ Features Implemented

- [x] Dark premium theme (black + gold)
- [x] Bootstrap-free responsive design (mobile 320px to 1440px+)
- [x] Hero carousel with touch support, auto-play, and pause on hover
- [x] Intersection Observer scroll reveal animations
- [x] Counter animation (stats section)
- [x] Sticky navbar with scroll state and active link detection
- [x] Hamburger mobile menu with dropdowns
- [x] WhatsApp floating button (pre-filled message)
- [x] Back to top button
- [x] POPIA cookie consent banner (localStorage)
- [x] Contact & quote forms with Fetch API (no page reload)
- [x] Client-side form validation
- [x] Portfolio filter by category
- [x] JSON-LD structured data (LocalBusiness, Service, BreadcrumbList)
- [x] XML sitemap and robots.txt
- [x] Netlify `_redirects` for clean URLs
- [x] All 7 service pages with specs, case studies, and sidebars
- [x] Google Maps embed
- [x] Click-to-call and mailto links
- [x] Lazy loading images
- [x] SEO meta titles and descriptions on every page

---

## 📞 Support

For questions about this website, contact:
- **Phone:** +27 81 773 4326
- **Email:** kagiso@mathibegeomatics.co.za
- **WhatsApp:** https://wa.me/27817734326
