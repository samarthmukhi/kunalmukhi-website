# Kunal Mukhi — Personal Website

A one-page personal website for **Kunal Mukhi**, Founder & Director of Insurance
Services (Group) India — a New Delhi general-insurance advisory. Built to convey
the gravitas of an established, third-generation insurance practice.

**Live site:** [kunalmukhi.com](https://kunalmukhi.com) _(pending deployment)_

## Highlights

- Single-page, fully responsive landing site (desktop → mobile)
- Institutional "high-finance" visual identity — deep navy, restrained gold, editorial serif
- Personal focus: hero portrait, first-person **Vision**, third-generation heritage
- Featured insurer partners: IFFCO-Tokio, Reliance General, ICICI Lombard
- Working **contact form** (Web3Forms, with an email-app fallback)

## Tech

Plain, dependency-free static site — HTML, CSS and vanilla JavaScript. No build step.

```
index.html      → markup
styles.css      → styling
script.js       → nav, scroll reveals, contact form
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
