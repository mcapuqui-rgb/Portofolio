// Ponto de entrada: desenha a página e liga menu, tema e janela.

function initMenu() {
  const btn = $("menu-btn"), nav = $("nav");
  const setMenu = (open) => { nav.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", () => setMenu(nav.hidden));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
}

function initTheme() {
  const root = document.documentElement, sw = $("theme");
  const isDark = () =>
    (root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
  const sync = () => sw.setAttribute("aria-checked", String(isDark()));

  try { const saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
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
initTheme();
initModal();
