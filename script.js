/* ============================================================
   Insurance Services (Group) India — interactions + contact form
   ============================================================ */

/* -----------------------------------------------------------
   CONTACT FORM CONFIG  —  ONE STEP to make the form live:

   1. Go to  https://web3forms.com  and enter  kunal.mukhi@gmail.com
   2. You'll receive a free "Access Key" by email (no account needed).
   3. Paste it below, replacing YOUR_WEB3FORMS_ACCESS_KEY.

   Submissions are then emailed straight to kunal.mukhi@gmail.com.
   Until a key is set, the form falls back to opening the visitor's
   email app pre-filled to kunal.mukhi@gmail.com (still works).
   ----------------------------------------------------------- */
const WEB3FORMS_ACCESS_KEY = "e5ce9d70-832c-4174-8fdb-a6e56abac74d";
const FALLBACK_EMAIL = "kunal.mukhi@gmail.com";

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Sticky nav shadow ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  ".section__head, .prose, .cap, .partner, .tl, .band__item, .contact__intro, .formcard, .trust__inner, .vision__text, .vision__pillars li"
);
revealEls.forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Contact form ---------- */
const form = document.getElementById("contactForm");
const statusEl = form.querySelector(".form__status");
const submitBtn = form.querySelector(".form__submit");
const labelEl = form.querySelector(".form__submit-label");

const setStatus = (msg, type) => {
  statusEl.textContent = msg;
  statusEl.className = "form__status show " + (type || "");
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const validate = () => {
  let ok = true;
  const checks = [
    ["name", (v) => v.trim().length >= 2],
    ["email", (v) => isEmail(v.trim())],
    ["message", (v) => v.trim().length >= 5],
  ];
  checks.forEach(([id, test]) => {
    const el = form.elements[id];
    const valid = test(el.value);
    el.classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  });
  return ok;
};

// clear the invalid state as the user corrects a field
["name", "email", "message"].forEach((id) => {
  form.elements[id].addEventListener("input", (e) =>
    e.target.classList.remove("invalid")
  );
});

const mailtoFallback = () => {
  const f = form.elements;
  const subject = `Insurance enquiry — ${f.interest.value}`;
  const body =
    `Name: ${f.name.value}\n` +
    `Email: ${f.email.value}\n` +
    `Phone: ${f.phone.value || "—"}\n` +
    `Area of interest: ${f.interest.value}\n\n` +
    `${f.message.value}\n`;
  window.location.href =
    `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // honeypot — if filled, silently drop (likely a bot)
  if (form.elements.botcheck.checked) return;

  if (!validate()) {
    setStatus("Please complete the highlighted fields.", "err");
    return;
  }

  // No access key configured yet → graceful email-app fallback
  if (
    !WEB3FORMS_ACCESS_KEY ||
    WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY"
  ) {
    setStatus("Opening your email app to send this enquiry…", "ok");
    mailtoFallback();
    return;
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New enquiry — ${form.elements.interest.value}`,
    from_name: "Kunal Mukhi Website",
    name: form.elements.name.value.trim(),
    email: form.elements.email.value.trim(),
    phone: form.elements.phone.value.trim(),
    interest: form.elements.interest.value,
    message: form.elements.message.value.trim(),
  };

  form.classList.add("is-sending");
  submitBtn.disabled = true;
  labelEl.textContent = "Sending…";
  setStatus("", "");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      form.reset();
      setStatus(
        "Thank you — your request has been sent. Kunal will respond within one business day.",
        "ok"
      );
    } else {
      throw new Error(data.message || "Submission failed");
    }
  } catch (err) {
    setStatus(
      "Something went wrong sending your request. Please email kunal.mukhi@gmail.com or call +91 98186 66620.",
      "err"
    );
  } finally {
    form.classList.remove("is-sending");
    submitBtn.disabled = false;
    labelEl.textContent = "Send request";
  }
});
