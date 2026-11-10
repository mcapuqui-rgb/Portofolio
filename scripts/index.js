// Ponto de entrada: desenha a página e liga menu, tema e janela.

function initMenu() {
  const btn = $("menu-btn"), nav = $("nav");
  const setMenu = (open) => {
    nav.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  };
  btn.addEventListener("click", () => setMenu(nav.hidden));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  nav.addEventListener("click", (e) => { if (e.target === nav) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
}

function initScrollAnimations() {
  const targets = document.querySelectorAll("main>section, #skills>.skill-group, .cards>.card, #contacts>li");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

  [$("skills"), ...document.querySelectorAll(".cards, #contacts")].forEach((container) => {
    Array.from(container.children).forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach((target) => {
    target.classList.add("reveal-on-scroll");
    observer.observe(target);
  });
}

function initTheme() {
  const root = document.documentElement, sw = $("theme");
  const isDark = () =>
    (root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
  const sync = () => sw.setAttribute("aria-checked", String(isDark()));

  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  sync();
  sw.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
}

function initModal() {
  const modal = $("modal");
  $("close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
}

renderProfile();
renderSkills();
renderContacts();
renderProjects();
initMenu();
initScrollAnimations();
initTheme();
initModal();
