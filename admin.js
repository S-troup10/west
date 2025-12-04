// Admin panel logic for editing club site data in-place

function buildListEditor(containerId, items, fields) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  items.forEach((item, idx) => {
    container.appendChild(createCard(item, idx));
  });

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className =
    "mt-3 inline-flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-3 py-2 text-sm text-green-200 hover:border-green-300";
  addBtn.textContent = "Add another";
  addBtn.onclick = () => {
    const card = createCard({}, container.children.length);
    container.insertBefore(card, addBtn);
  };
  container.appendChild(addBtn);

  function createCard(item, idx) {
    const card = document.createElement("div");
    card.className = "mb-3 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3";
    card.dataset.index = idx;

    fields.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.className = "space-y-1";
      const label = document.createElement("label");
      label.className = "text-xs text-slate-300";
      label.textContent = field.label;
      const input = field.multiline
        ? document.createElement("textarea")
        : document.createElement("input");
      input.name = `${containerId}-${field.name}-${idx}`;
      input.className =
        "w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-green-300 focus:outline-none";
      if (field.multiline) input.rows = 3;
      input.value = item[field.name] ?? "";
      wrapper.append(label, input);
      card.appendChild(wrapper);
    });

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className =
      "text-xs text-rose-300 hover:text-rose-200 border border-white/10 rounded-lg px-2 py-1";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => card.remove();
    card.appendChild(removeBtn);

    return card;
  }
}

function collectList(containerId, fields) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  const cards = Array.from(container.querySelectorAll("[data-index]"));
  return cards.map((card) => {
    const item = {};
    fields.forEach((field) => {
      const input = card.querySelector(`[name^="${containerId}-${field.name}"]`);
      item[field.name] = input ? input.value.trim() : "";
    });
    return item;
  });
}

function hydrateAdminForms() {
  const data = window.siteContent;

  // Hero
  setValue("hero-headline", data.hero.headline);
  setValue("hero-subhead", data.hero.subhead);
  setValue("hero-primary-label", data.hero.primaryCta.label);
  setValue("hero-primary-href", data.hero.primaryCta.href);
  setValue("hero-secondary-label", data.hero.secondaryCta.label);
  setValue("hero-secondary-href", data.hero.secondaryCta.href);

  setValue("club-tagline", data.club.tagline);
  setValue("club-intro", data.club.homeIntro);

  buildListEditor("news-list", data.news, [
    { name: "title", label: "Title" },
    { name: "date", label: "Date" },
    { name: "summary", label: "Summary", multiline: true },
    { name: "url", label: "Link" }
  ]);

  buildListEditor("quick-links-list", data.quickLinks, [
    { name: "label", label: "Label" },
    { name: "href", label: "URL" }
  ]);

  buildListEditor("sponsor-list", data.sponsors, [
    { name: "name", label: "Name" },
    { name: "logo", label: "Logo URL" },
    { name: "url", label: "Website" }
  ]);

  setValue("about-intro-field", data.about.intro);
  setValue("about-history-field", data.about.history);
  setValue("about-values-field", (data.about.values || []).join("\n"));
  setValue("about-members-field", (data.about.lifeMembers || []).join("\n"));

  setValue("join-u8u10-field", data.join.u8u10);
  setValue("join-juniors-field", data.join.juniors);

  setValue("merch-blurb-field", data.merch.blurb);
  setValue("merch-store-field", data.merch.storeUrl);

  setValue("coaches-blurb-field", data.coaches.blurb);
  setValue("coaches-guide-field", data.coaches.guideUrl);
  setValue("coaches-templates-field", data.coaches.templatesUrl);
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value ?? "";
}

function attachAdminHandlers() {
  const saveBtn = document.getElementById("save-admin");
  const resetBtn = document.getElementById("reset-admin");
  const toast = document.getElementById("admin-toast");

  saveBtn?.addEventListener("click", () => {
    const data = loadSiteData();
    data.hero.headline = document.getElementById("hero-headline").value.trim();
    data.hero.subhead = document.getElementById("hero-subhead").value.trim();
    data.hero.primaryCta.label = document.getElementById("hero-primary-label").value.trim();
    data.hero.primaryCta.href = document.getElementById("hero-primary-href").value.trim();
    data.hero.secondaryCta.label = document.getElementById("hero-secondary-label").value.trim();
    data.hero.secondaryCta.href = document.getElementById("hero-secondary-href").value.trim();

    data.club.tagline = document.getElementById("club-tagline").value.trim();
    data.club.homeIntro = document.getElementById("club-intro").value.trim();

    data.news = collectList("news-list", ["title", "date", "summary", "url"].map((name) => ({ name })));
    data.quickLinks = collectList("quick-links-list", ["label", "href"].map((name) => ({ name })));
    data.sponsors = collectList("sponsor-list", ["name", "logo", "url"].map((name) => ({ name })));

    data.about.intro = document.getElementById("about-intro-field").value.trim();
    data.about.history = document.getElementById("about-history-field").value.trim();
    data.about.values = document.getElementById("about-values-field").value
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);
    data.about.lifeMembers = document.getElementById("about-members-field").value
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);

    data.join.u8u10 = document.getElementById("join-u8u10-field").value.trim();
    data.join.juniors = document.getElementById("join-juniors-field").value.trim();

    data.merch.blurb = document.getElementById("merch-blurb-field").value.trim();
    data.merch.storeUrl = document.getElementById("merch-store-field").value.trim();

    data.coaches.blurb = document.getElementById("coaches-blurb-field").value.trim();
    data.coaches.guideUrl = document.getElementById("coaches-guide-field").value.trim();
    data.coaches.templatesUrl = document.getElementById("coaches-templates-field").value.trim();

    saveSiteData(data);
    showToast(toast, "Saved. Refresh the public pages to see updates.");
  });

  resetBtn?.addEventListener("click", () => {
    resetSiteData();
    hydrateAdminForms();
    showToast(toast, "Reset to starter content.");
  });
}

function showToast(el, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 2200);
}

window.addEventListener("DOMContentLoaded", () => {
  hydrateAdminForms();
  attachAdminHandlers();
});
