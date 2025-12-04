// Shared site data and helpers for the club pages
// Uses localStorage so the admin page can tweak content without a backend.

const defaultSiteData = {
  club: {
    name: "West Basketball Club",
    shortName: "West Basketball",
    tagline: "Building players, community, and a lifelong love of the game.",
    homeIntro:
      "Welcome to West Basketball Club. We develop players of every age with a focus on teamwork, effort, and fun."
  },
  hero: {
    headline: "A club for every age and stage",
    subhead:
      "From U8s starting out to U18s chasing championships, we're here to teach skills, values, and love for the game.",
    primaryCta: { label: "Join the club", href: "join.html" },
    secondaryCta: { label: "Meet our coaches", href: "coaches.html" }
  },
  news: [
    {
      title: "Winter season registrations now open",
      date: "Feb 26",
      summary: "Secure your spot for U8-U18 competitions. Early bird closes March 15.",
      url: "join.html"
    },
    {
      title: "Holiday skills camp announced",
      date: "Jan 30",
      summary: "Three-day camp with guest coaches focusing on shooting and decision making.",
      url: "about.html"
    }
  ],
  quickLinks: [
    { label: "Fixtures", href: "https://example.com/fixtures" },
    { label: "Merch Store", href: "merchandise.html" },
    { label: "Training Schedule", href: "https://example.com/training" },
    { label: "West Basketball Values", href: "about.html#values" },
    { label: "Newcastle Basketball", href: "https://www.newcastlebasketball.com.au" },
    { label: "Contact Us", href: "about.html#contact" }
  ],
  sponsors: [
    {
      name: "Summit Sport",
      logo: "https://dummyimage.com/240x110/0f172a/22d3ee&text=Summit+Sport",
      url: "https://example.com"
    },
    {
      name: "Coastline Physio",
      logo: "https://dummyimage.com/240x110/0f172a/a855f7&text=Coastline+Physio",
      url: "https://example.com"
    },
    {
      name: "Nova Energy",
      logo: "https://dummyimage.com/240x110/0f172a/f59e0b&text=Nova+Energy",
      url: "https://example.com"
    }
  ],
  about: {
    intro:
      "Founded by volunteers and parents, West Basketball Club helps players grow on and off the court. We focus on fundamentals, team play, and a strong club culture.",
    values: ["Effort first", "Respect teammates and officials", "Team before self", "Enjoy the game"],
    history:
      "Started with a single junior team, the club now supports dozens of squads across age groups with pathways into senior competitions.",
    lifeMembers: ["Alex Jensen", "Sam Lee", "Taylor Morgan"],
    photos: [
      "U12-Knights.jpg",
      "U14-West-Raiders.jpg"
    ]
  },
  join: {
    u8u10:
      "Our U8 and U10 programs focus on fundamentals and fun. Short games, high ball touches, and coaches who prioritise encouragement.",
    juniors:
      "Junior squads (U12-U18) train weekly with structured plans for skills, decision making, and fitness. Grading and team lists are updated each season."
  },
  merch: {
    blurb:
      "Players must wear club shorts and reversible singlets on game day. Training singlets and hoodies are optional but encouraged for warm-up.",
    storeUrl: "https://example.com/merch"
  },
  coaches: {
    blurb:
      "Our coaches create safe, competitive, and supportive sessions. They follow club practice plans and development templates so every age group grows consistently.",
    guideUrl: "https://example.com/coaching-guide.pdf",
    templatesUrl: "https://example.com/coaching-templates.zip"
  }
};

function loadSiteData() {
  try {
    const cached = localStorage.getItem("clubSiteData");
    if (cached) {
      return { ...defaultSiteData, ...JSON.parse(cached) };
    }
  } catch (err) {
    console.warn("Could not read saved site data", err);
  }
  return JSON.parse(JSON.stringify(defaultSiteData));
}

function saveSiteData(data) {
  localStorage.setItem("clubSiteData", JSON.stringify(data));
  window.siteContent = data;
}

function resetSiteData() {
  localStorage.removeItem("clubSiteData");
  window.siteContent = JSON.parse(JSON.stringify(defaultSiteData));
}

// expose the data immediately for page scripts
window.siteContent = loadSiteData();
