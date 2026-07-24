# Kunal Mukhi — Personal Website

A one-page personal website for **Kunal Mukhi**, Founder & Director of Insurance
Services (Group) India — a New Delhi general-insurance advisory. Built to convey
the gravitas of an established, third-generation insurance practice.

**Live site:** [kunalmukhi.com](https://kunalmukhi.com) _(pending deployment)_

## Highlights

- Multi-page, fully responsive site — Home · About · Products · Contact (desktop → mobile)
- Institutional "high-finance" visual identity — deep navy, restrained gold, editorial serif
- Personal focus: hero portrait, first-person **Vision**, third-generation heritage
- Dedicated **Products** page (general, life & health taxonomy)
- Featured insurer partners: ICICI Lombard, LIC of India, Manipal Cigna
- Working **contact form** (Web3Forms, with an email-app fallback)

## Tech

Plain, dependency-free static site — HTML, CSS and vanilla JavaScript. No build step.

```
index.html      → home (hero, vision snapshot, partners, capabilities, CTA)
about.html      → bio, full vision, third-generation heritage, track record
products.html   → full product range (general / life / health)
contact.html    → enquiry form + phone / email / office / LinkedIn
styles.css      → styling (shared across all pages)
script.js       → nav, scroll reveals, contact form (guarded per page)
assets/         → portrait imagery
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Contact form setup (one step)

The form sends to `kunal.mukhi@gmail.com` via [Web3Forms](https://web3forms.com):

1. Get a free Access Key at web3forms.com (enter `kunal.mukhi@gmail.com`).
2. In `script.js`, replace `YOUR_WEB3FORMS_ACCESS_KEY` with it.

Until a key is set, the form gracefully opens the visitor's email app pre-filled.

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site (no framework, no build
command). Pushing to `main` triggers an automatic deployment.
