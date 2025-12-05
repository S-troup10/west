// Common helpers for all pages - Modern Dark Theme
const navLinks = [
  { label: "Home", href: "index.html", key: "home" },
  { label: "About", href: "about.html", key: "about" },
  { label: "Gallery", href: "gallery.html", key: "gallery" },
  { label: "Join", href: "join.html", key: "join" },
  { label: "Merchandise", href: "merchandise.html", key: "merch" },
  { label: "Coaches", href: "coaches.html", key: "coaches" },
  { label: "Sponsors", href: "sponsors.html", key: "sponsors" }
];

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMultiline(text = "") {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function renderNav(activeKey) {
  const container = document.getElementById("site-nav");
  if (!container) return;
  const { club, images } = window.siteContent;
  const navConfig = window.siteContent.navigation;
  const links = navConfig?.links ?? navLinks;
  const adminLabel = navConfig?.adminLabel ?? "Admin";
  const logoSrc = images?.logo || 'logo.png';
  container.innerHTML = `
    <div class="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
      <a href="index.html" class="flex items-center gap-3 group">
        <div class="relative">
          <div class="absolute inset-0 bg-primary/30 rounded-full blur-lg group-hover:bg-primary/50 transition-all"></div>
          <img src="${logoSrc}" alt="Club logo" class="relative h-12 w-12 rounded-full border-2 border-primary/30 bg-dark object-contain" />
        </div>
        <div class="hidden sm:block">
          <p class="text-base font-bold text-white group-hover:text-primary transition-colors">${club?.shortName ?? "West Basketball"}</p>
          <p class="text-xs text-white/50">${club?.tagline?.substring(0, 40) ?? ""}...</p>
        </div>
      </a>
      <nav class="hidden lg:flex items-center gap-1">
        ${links
          .map((link) => {
            const active = link.key === activeKey;
            return `<a href="${link.href}" class="px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active
                ? "bg-primary/20 text-primary"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }">${link.label}</a>`;
          })
          .join("")}
      </nav>
      <div class="flex items-center gap-3">
        <a href="admin.html" class="text-xs rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 hover:border-primary/50 hover:text-primary transition-all">${adminLabel}</a>
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg bg-white/5 text-white/70 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="hidden lg:hidden border-t border-white/5 bg-dark/95 backdrop-blur-xl">
      <div class="px-6 py-4 space-y-2">
        ${links
          .map((link) => {
            const active = link.key === activeKey;
            return `<a href="${link.href}" class="block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-primary/20 text-primary"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }">${link.label}</a>`;
          })
          .join("")}
      </div>
    </div>
  `;
  
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const { club, images } = window.siteContent;
  const footerData = window.siteContent.footer ?? {};
  const logoSrc = images?.logo || 'logo.png';
  el.innerHTML = `
    <div class="max-w-6xl mx-auto py-12 px-6">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div class="md:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <img src="${logoSrc}" alt="Club logo" class="h-12 w-12 rounded-full border border-white/10 bg-dark object-contain" />
            <div>
              <p class="text-lg font-bold text-white">${club?.name ?? "West Basketball Club"}</p>
              <p class="text-sm text-white/50">${footerData.tagline ?? "Youth basketball in Newcastle"}</p>
            </div>
          </div>
          <p class="text-white/50 text-sm max-w-md">${club?.tagline ?? "Building players, community, and a lifelong love of the game."}</p>
        </div>
        <div class="space-y-3">
          <p class="text-white font-semibold">${footerData.quickLinksTitle ?? "Quick Links"}</p>
          <div class="space-y-2">
            ${(footerData.quickLinks || []).map((link) => `<a href="${link.href}" class="block text-sm text-white/50 hover:text-primary transition-colors">${link.label}</a>`).join("\n")}
          </div>
        </div>
        <div class="space-y-3">
          <p class="text-white font-semibold">${footerData.connectTitle ?? "Connect"}</p>
          <div class="space-y-2">
            ${(footerData.connectLinks || []).map((link) => `<a href="${link.href}" class="block text-sm text-white/50 hover:text-primary transition-colors">${link.label}</a>`).join("\n")}
          </div>
        </div>
      </div>
      <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>&copy; ${new Date().getFullYear()} ${club?.name ?? "West Basketball Club"}. All rights reserved.</p>
        <p>${footerData.note ?? "Built for families, players, and the community."}</p>
      </div>
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
      <a href="${link.href}" class="group glass rounded-xl px-5 py-4 flex items-center justify-between hover:border-primary/30 transition-all card-hover">
        <span class="text-white font-medium">${link.label}</span>
        <svg class="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
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
        <article class="glass card-hover rounded-2xl p-6 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs text-white/40">${item.date ?? ""}</span>
            <span class="inline-flex items-center gap-1.5 text-xs text-primary">
              <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Latest
            </span>
          </div>
          <h3 class="text-lg font-bold text-white">${item.title ?? "Update"}</h3>
          <p class="text-sm text-white/60 leading-relaxed">${formatMultiline(item.summary ?? "")}</p>
          <a class="inline-flex items-center gap-2 text-sm text-primary font-medium group" href="${item.url ?? "#"}">
            Read more
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
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
        <a href="${sponsor.url ?? "#"}" class="flex items-center justify-center p-4 min-h-24 transition-transform hover:scale-110" aria-label="${sponsor.name}">
          <img src="${sponsor.logo}" alt="${sponsor.name}" class="max-h-24 md:max-h-28 object-contain drop-shadow-xl brightness-110 hover:brightness-125 transition-all" />
        </a>`
    )
    .join("\n");
}

function renderAboutDetails() {
  const data = window.siteContent.about ?? {};
  const aboutPage = window.siteContent.pages?.about ?? {};
  const intro = document.getElementById("about-intro");
  const history = document.getElementById("about-history");
  const values = document.getElementById("about-values");
  const lifeMembers = document.getElementById("about-life-members");
  const photos = document.getElementById("about-photos");
  const heroTag = document.getElementById("about-hero-tag");
  const heroTitle = document.getElementById("about-hero-title");
  const heroHighlight = document.getElementById("about-hero-highlight");
  const historyTitle = document.getElementById("about-history-title");
  const valuesTitle = document.getElementById("about-values-title");
  const lifeTitle = document.getElementById("about-life-title");
  const lifeDesc = document.getElementById("about-life-description");
  const contactTag = document.getElementById("about-contact-tag");
  const contactTitle = document.getElementById("about-contact-title");
  const contactHighlight = document.getElementById("about-contact-highlight");
  const contactDesc = document.getElementById("about-contact-desc");
  const contactCta = document.getElementById("about-contact-cta");
  if (heroTag) heroTag.textContent = aboutPage.heroTag ?? "Our Story";
  if (heroTitle) heroTitle.textContent = aboutPage.heroTitle ?? "About";
  if (heroHighlight) heroHighlight.textContent = aboutPage.heroHighlight ?? "West Basketball";
  if (intro) intro.innerHTML = formatMultiline(data.intro ?? "");
  if (history) history.innerHTML = formatMultiline(data.history ?? "");
  if (historyTitle) historyTitle.textContent = aboutPage.historyTitle ?? "Our History";
  if (valuesTitle) valuesTitle.textContent = aboutPage.valuesTitle ?? "Our Values";
  if (lifeTitle) lifeTitle.textContent = aboutPage.lifeMembersTitle ?? "Life Members";
  if (lifeDesc) lifeDesc.innerHTML = formatMultiline(aboutPage.lifeDescription ?? "");
  if (contactTag) contactTag.textContent = aboutPage.contactTag ?? "";
  if (contactTitle) contactTitle.textContent = aboutPage.contactTitle ?? "";
  if (contactHighlight) contactHighlight.textContent = aboutPage.contactHighlight ?? "";
  if (contactDesc) contactDesc.innerHTML = formatMultiline(aboutPage.contactDescription ?? "");
  if (contactCta) {
    contactCta.innerHTML = `${aboutPage.contactCtaLabel ?? "Send us an email"} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
    contactCta.href = aboutPage.contactCtaHref ?? contactCta.href;
  }
  if (values) {
    values.innerHTML = (data.values ?? [])
      .map((val) => `<li class="px-4 py-3 rounded-xl glass text-white">${val}</li>`)
      .join("\n");
  }
  if (lifeMembers) {
    lifeMembers.innerHTML = (data.lifeMembers ?? [])
      .map((member) => `<li class="text-white/80">${member}</li>`)
      .join("\n");
  }
  if (photos) {
    photos.innerHTML = (data.photos ?? [])
      .map(
        (src) => `<div class="image-card card-hover"><img src="${src}" alt="Club moment" class="rounded-2xl object-cover w-full h-64" loading="lazy" /></div>`
      )
      .join("\n");
  }
}

function renderJoinContent() {
  const joinPage = window.siteContent.pages?.join ?? {};
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = formatMultiline(value ?? "");
  };
  setText("join-hero-tag", joinPage.heroTag);
  setText("join-hero-title", joinPage.heroTitle);
  setText("join-hero-highlight", joinPage.heroHighlight);
  setText("join-hero-description", joinPage.heroDescription);
  setText("join-help-tag", joinPage.helpTag);
  setText("join-help-title", joinPage.helpTitle);
  setText("join-help-text", joinPage.helpText);
  const helpCta = document.getElementById("join-help-cta");
  if (helpCta) {
    helpCta.innerHTML = `${joinPage.helpCtaLabel ?? "Talk to us"} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
    helpCta.href = joinPage.helpCtaHref ?? "about.html#contact";
  }

  const container = document.getElementById("join-streams");
  if (container) {
    const streams = joinPage.streams || [];
    container.innerHTML = streams
      .map(
        (stream) => {
          const anchor = stream.id || (stream.title ? stream.title.toLowerCase().replace(/\s+/g, "-") : "stream");
          return `
        <div id="${anchor}" class="section-fade">
          <div class="glass card-hover rounded-3xl p-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 ${stream.badge ? "bg-primary/10" : "bg-accent/10"} rounded-full blur-2xl"></div>
            <div class="relative">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h2 class="text-3xl font-bold text-white">${stream.title || "Program"}</h2>
                </div>
                ${stream.badge ? `<span class="text-xs text-primary border border-primary/30 rounded-full px-4 py-2 bg-primary/10">${stream.badge}</span>` : ""}
              </div>
              <p class="text-white/60 text-lg leading-relaxed mb-6">${formatMultiline(stream.description || "")}</p>
              <div class="flex flex-wrap gap-3">
                ${(stream.links || [])
                  .filter((link) => link && (link.label || link.href))
                  .map(
                    (link, idx) => `
                      <a href="${link.href || "#"}" class="btn-secondary rounded-full px-6 py-3 text-white font-medium ${idx > 0 ? "border-white/20" : ""}">
                        ${link.label || "Learn more"}
                      </a>
                    `
                  )
                  .join("\n")}
              </div>
            </div>
          </div>
        </div>
      `;
        }
      )
      .join("\n");
  }
}

function renderMerchContent() {
  const merch = window.siteContent.merch;
  const merchPage = window.siteContent.pages?.merch ?? {};
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = formatMultiline(value ?? "");
  };
  setText("merch-hero-tag", merchPage.heroTag);
  setText("merch-hero-title", merchPage.heroTitle);
  setText("merch-hero-highlight", merchPage.heroHighlight);
  setText("merch-store-tag", merchPage.storeTag);
  setText("merch-store-title", merchPage.storeTitle);
  setText("merch-store-highlight", merchPage.storeHighlight);
  const blurb = document.getElementById("merch-blurb");
  const store = document.getElementById("merch-store-link");
  if (blurb) blurb.innerHTML = formatMultiline(merch?.blurb ?? "");
  if (store && merch?.storeUrl) store.href = merch.storeUrl;
  setText("merch-store-description", merchPage.storeDescription);
  const pillars = document.getElementById("merch-pillars");
  if (pillars) {
    pillars.innerHTML = (merchPage.pillars || [])
      .map(
        (pillar) => `
        <div class="text-center">
          <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p class="text-sm text-white/60">${pillar}</p>
        </div>
      `
      )
      .join("\n");
  }
  if (store) {
    store.innerHTML = `${merchPage.ctaLabel || "Go to merch store"} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
  }
}

function renderCoachesContent() {
  const coaches = window.siteContent.coaches;
  const coachesPage = window.siteContent.pages?.coaches ?? {};
  const blurb = document.getElementById("coaches-blurb");
  if (blurb) blurb.innerHTML = formatMultiline(coaches?.blurb ?? "");
  const resourcesContainer = document.getElementById("coaches-resources");
  if (resourcesContainer) {
    const resources = coachesPage.resources || [];
    resourcesContainer.innerHTML = resources
      .map(
        (item) => `
        <div class="glass card-hover rounded-3xl p-8 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-24 h-24 ${item.title === "Templates" ? "bg-accent/10" : "bg-primary/10"} rounded-full blur-2xl"></div>
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                <svg class="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h2 class="text-2xl font-bold text-white mb-3">${item.title || "Resource"}</h2>
              <p class="text-white/60 mb-6">${formatMultiline(item.description || "")}</p>
              <a href="${item.href || "#"}" class="inline-flex items-center gap-2 text-primary font-medium group">
                ${item.ctaLabel || "Open"} 
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
      `
      )
      .join("\n");
  }
  const ctaTag = document.getElementById("coaches-cta-tag");
  const ctaTitle = document.getElementById("coaches-cta-title");
  const ctaHighlight = document.getElementById("coaches-cta-highlight");
  const ctaDesc = document.getElementById("coaches-cta-desc");
  const ctaBtn = document.getElementById("coaches-cta-button");
  if (ctaTag) ctaTag.textContent = coachesPage.ctaTag ?? "Get Involved";
  if (ctaTitle) ctaTitle.textContent = coachesPage.ctaTitle ?? "Want to";
  if (ctaHighlight) ctaHighlight.textContent = coachesPage.ctaHighlight ?? "Coach?";
  if (ctaDesc) ctaDesc.innerHTML = formatMultiline(coachesPage.ctaDescription ?? "");
  if (ctaBtn) {
    ctaBtn.innerHTML = `${coachesPage.ctaLabel ?? "Contact us"} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
    ctaBtn.href = coachesPage.ctaHref ?? "mailto:coaching@westbasketball.com.au";
  }
}

function renderHero() {
  const hero = window.siteContent.hero ?? {};
  const home = window.siteContent.pages?.home ?? {};
  const heading = document.getElementById("hero-title");
  const highlight = document.getElementById("hero-highlight");
  const kicker = document.getElementById("home-hero-kicker");
  const sub = document.getElementById("hero-sub");
  const primary = document.getElementById("hero-primary");
  const secondary = document.getElementById("hero-secondary");
  if (kicker) kicker.textContent = home.heroKicker ?? "";
  if (heading) heading.textContent = home.heroTitle ?? hero.headline ?? "";
  if (highlight) highlight.textContent = home.heroHighlight ?? "";
  if (sub) sub.innerHTML = formatMultiline(hero.subhead ?? "");
  if (primary && hero.primaryCta) {
    primary.innerHTML = `${hero.primaryCta.label} <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>`;
    primary.href = hero.primaryCta.href;
  }
  if (secondary && hero.secondaryCta) {
    secondary.textContent = hero.secondaryCta.label;
    secondary.href = hero.secondaryCta.href;
  }
}

function renderGallery(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const gallery = window.siteContent.gallery ?? [];
  el.innerHTML = gallery
    .map(
      (photo, index) => `
        <div class="gallery-item glass card-hover rounded-2xl overflow-hidden cursor-pointer" onclick="openLightbox(${index})">
          <div class="relative aspect-[4/3] overflow-hidden">
            <img src="${photo.src}" alt="${photo.caption}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <span class="inline-block px-3 py-1 text-xs rounded-full bg-primary/20 text-primary mb-2">${photo.category ?? 'Photo'}</span>
                <p class="text-white font-medium">${photo.caption ?? ''}</p>
              </div>
            </div>
          </div>
        </div>`
    )
    .join("\n");
}

function refreshContent() {
  window.siteContent = loadSiteData();
}
