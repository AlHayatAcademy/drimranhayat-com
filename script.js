const iconPaths = {
  "book-open": '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 24.5z"/><path d="M20 2v20"/>',
  mosque: '<path d="M4 22V11l8-6 8 6v11"/><path d="M9 22v-7a3 3 0 0 1 6 0v7"/><path d="M2 22h20"/><path d="M12 5V2"/>',
  scroll: '<path d="M8 21h8a4 4 0 0 0 4-4V5a3 3 0 0 0-6 0v13a3 3 0 0 1-6 0V4H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h3z"/><path d="M14 5h6"/>',
  library: '<path d="M4 19V5"/><path d="M8 19V5"/><path d="M12 19V5"/><path d="M16 19V5"/><path d="M20 19V5"/><path d="M2 21h20"/><path d="M2 3h20"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  sparkles: '<path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z"/><path d="M5 17l.8 2.2L8 20l-2.2.8L5 23l-.8-2.2L2 20l2.2-.8z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  network: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="7" r="3"/><circle cx="12" cy="18" r="3"/><path d="M8.7 7.2l6.6-.4"/><path d="M7.7 8.4l3 7.2"/><path d="M16.5 9.6l-3 5.8"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  graduation: '<path d="M22 10L12 5 2 10l10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
  presentation: '<path d="M3 4h18v12H3z"/><path d="M12 16v5"/><path d="M8 21h8"/>',
  mail: '<path d="M4 4h16v16H4z"/><path d="M4 7l8 6 8-6"/>',
  map: '<path d="M12 21s7-5.3 7-12A7 7 0 0 0 5 9c0 6.7 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  external: '<path d="M7 7h10v10"/><path d="M7 17L17 7"/><path d="M19 13v6H5V5h6"/>'
};

function createIcon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.network}</svg>`;
}

document.querySelectorAll("[data-icon]").forEach((node) => {
  node.innerHTML = createIcon(node.dataset.icon);
});

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

async function loadProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  try {
    const response = await fetch("data/projects.json");
    const projects = await response.json();
    grid.innerHTML = projects.map(renderProject).join("");
    grid.querySelectorAll("[data-icon]").forEach((node) => {
      node.innerHTML = createIcon(node.dataset.icon);
    });
  } catch (error) {
    grid.innerHTML = '<p class="note">Project cards could not be loaded. Please check data/projects.json.</p>';
  }
}

function renderProject(project) {
  const isLive = project.status.toLowerCase().includes("live");
  const hasLiveUrl = project.url && project.url !== "#";
  const href = hasLiveUrl ? project.url : "#contact";
  const target = hasLiveUrl ? ' target="_blank" rel="noopener"' : "";
  const actionText = isLive ? "Visit Website" : "Discuss Project";
  const futureUrl = project.futureUrl ? `<p class="future-url">Future subdomain: ${project.futureUrl}</p>` : "";

  return `
    <article class="project-card">
      <div class="project-top">
        <span class="icon" data-icon="${project.icon}"></span>
        <span class="status ${isLive ? "" : "planned"}">${project.status}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="category">${project.category}</p>
      <p>${project.description}</p>
      ${futureUrl}
      <a class="btn btn-gold project-action" href="${href}"${target} aria-label="${actionText}: ${project.title}">
        ${actionText}
        <span class="icon" data-icon="external"></span>
      </a>
    </article>
  `;
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
loadProjects();
