// Common helpers for all pages
const navLinks = [
  { label: "Home", href: "index.html", key: "home" },
  { label: "About", href: "about.html", key: "about" },
  { label: "Join the Club", href: "join.html", key: "join" },
  { label: "Merchandise", href: "merchandise.html", key: "merch" },
  { label: "Coaches", href: "coaches.html", key: "coaches" },
  { label: "Sponsors", href: "sponsors.html", key: "sponsors" }
];

function renderNav(activeKey) {
  const container = document.getElementById("site-nav");
  if (!container) return;
  const { club } = window.siteContent;
  container.innerHTML = `
    <div class="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
      <a href="index.html" class="flex items-center gap-3">
        <img src="logo.png" alt="Club logo" class="h-11 w-11 rounded-full border border-green-100 bg-white object-contain" />
        <div>
          <p class="text-sm font-semibold text-slate-900">${club?.name ?? "Club"}</p>
          <p class="text-xs text-slate-500">${club?.tagline ?? ""}</p>
        </div>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        ${navLinks
          .map((link) => {
            const active = link.key === activeKey;
            return `<a href="${link.href}" class="${
              active
                ? "text-green-700 font-semibold"
                : "text-slate-700 hover:text-green-700"
            }">${link.label}</a>`;
          })
          .join("")}
      </nav>
      <div class="flex items-center gap-2">
        <a href="admin.html" class="text-xs rounded-full border border-slate-200 px-3 py-1.5 text-slate-800 hover:border-green-500 hover:text-green-700">Admin</a>
      </div>
    </div>
  `;
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const { club } = window.siteContent;
  el.innerHTML = `
    <div class="max-w-6xl mx-auto py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
      <p>© ${new Date().getFullYear()} ${club?.name ?? "The Club"}. Built for families, players, and the community.</p>
      <a href="about.html#contact" class="hover:text-green-700">Contact</a>
    </div>
  `;
}

function renderQuickLinks(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const links = window.siteContent.quickLinks ?? [];
  el.innerHTML = links
    .map(
      (link) => `
      <a href="${link.href}" class="group rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-card hover:-translate-y-0.5 transition">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm text-slate-900">${link.label}</span>
          <span class="text-xs text-green-700 group-hover:translate-x-0.5 transition">?</span>
        </div>
      </a>`
    )
    .join("\n");
}

function renderNews(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const news = window.siteContent.news ?? [];
  el.innerHTML = news
    .map(
      (item) => `
        <article class="rounded-2xl border border-slate-200 bg-white p-4 shadow-card space-y-2 hover:-translate-y-0.5 transition">
          <div class="flex items-center justify-between text-xs text-slate-500">
            <span>${item.date ?? ""}</span>
            <span class="inline-flex items-center gap-1 text-green-700">Latest</span>
          </div>
          <h3 class="text-lg font-semibold text-slate-900">${item.title ?? "Update"}</h3>
          <p class="text-sm text-slate-600">${item.summary ?? ""}</p>
          <a class="text-sm text-green-700 hover:text-green-800" href="${item.url ?? "#"}">Read more</a>
        </article>
      `
    )
    .join("\n");
}

function renderSponsors(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const sponsors = window.siteContent.sponsors ?? [];
  el.innerHTML = sponsors
    .map(
      (sponsor) => `
        <a href="${sponsor.url ?? "#"}" class="rounded-2xl border border-slate-200 bg-white px-5 py-4 flex items-center justify-center shadow-card hover:-translate-y-0.5 transition" aria-label="${sponsor.name}">
          <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-h-14 object-contain" />
        </a>`
    )
    .join("\n");
}

function renderAboutDetails() {
  const data = window.siteContent.about ?? {};
  const intro = document.getElementById("about-intro");
  const history = document.getElementById("about-history");
  const values = document.getElementById("about-values");
  const lifeMembers = document.getElementById("about-life-members");
  const photos = document.getElementById("about-photos");
  if (intro) intro.textContent = data.intro ?? "";
  if (history) history.textContent = data.history ?? "";
  if (values) {
    values.innerHTML = (data.values ?? [])
      .map((val) => `<li class="px-3 py-2 rounded-xl bg-white border border-slate-200 shadow-card text-slate-800">${val}</li>`)
      .join("\n");
  }
  if (lifeMembers) {
    lifeMembers.innerHTML = (data.lifeMembers ?? [])
      .map((member) => `<li class="text-slate-900">${member}</li>`)
      .join("\n");
  }
  if (photos) {
    photos.innerHTML = (data.photos ?? [])
      .map(
        (src) => `<img src="${src}" alt="Club moment" class="rounded-2xl border border-slate-200 shadow-card object-cover w-full" loading="lazy" />`
      )
      .join("\n");
  }
}

function renderJoinContent() {
  const { join } = window.siteContent;
  const u8u10 = document.getElementById("join-u8u10");
  const juniors = document.getElementById("join-juniors");
  if (u8u10) u8u10.textContent = join?.u8u10 ?? "";
  if (juniors) juniors.textContent = join?.juniors ?? "";
}

function renderMerchContent() {
  const merch = window.siteContent.merch;
  const blurb = document.getElementById("merch-blurb");
  const store = document.getElementById("merch-store-link");
  if (blurb) blurb.textContent = merch?.blurb ?? "";
  if (store && merch?.storeUrl) store.href = merch.storeUrl;
}

function renderCoachesContent() {
  const coaches = window.siteContent.coaches;
  const blurb = document.getElementById("coaches-blurb");
  const guide = document.getElementById("coaches-guide");
  const templates = document.getElementById("coaches-templates");
  if (blurb) blurb.textContent = coaches?.blurb ?? "";
  if (guide && coaches?.guideUrl) guide.href = coaches.guideUrl;
  if (templates && coaches?.templatesUrl) templates.href = coaches.templatesUrl;
}

function renderHero() {
  const hero = window.siteContent.hero ?? {};
  const heading = document.getElementById("hero-title");
  const sub = document.getElementById("hero-sub");
  const primary = document.getElementById("hero-primary");
  const secondary = document.getElementById("hero-secondary");
  if (heading) heading.textContent = hero.headline ?? "";
  if (sub) sub.textContent = hero.subhead ?? "";
  if (primary && hero.primaryCta) {
    primary.textContent = hero.primaryCta.label;
    primary.href = hero.primaryCta.href;
  }
  if (secondary && hero.secondaryCta) {
    secondary.textContent = hero.secondaryCta.label;
    secondary.href = hero.secondaryCta.href;
  }
}

function refreshContent() {
  window.siteContent = loadSiteData();
}
