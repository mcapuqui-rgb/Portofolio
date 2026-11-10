// Constrói a página a partir de data.js. Usa textContent, nunca innerHTML.

function renderProfile() {
  document.title = `${PROFILE.name} | ${PROFILE.title}`;
  $("name").textContent = PROFILE.name;
  $("title").textContent = PROFILE.title;
  $("intro").textContent = PROFILE.intro;
  $("about").textContent = PROFILE.about;
  $("footer").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;

  const avatar = $("avatar");
  const initials = PROFILE.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  if (PROFILE.photo) {
    let img = avatar.querySelector("img");
    if (!img) {
      img = mk("img", "", { src: PROFILE.photo, alt: "Foto de perfil" });
      avatar.appendChild(img);
    } else {
      img.src = PROFILE.photo;
      img.alt = "Foto de perfil";
    }
    avatar.querySelectorAll("*")?.forEach((el) => el.remove());
    if (!avatar.querySelector("img")) avatar.appendChild(img);
  } else {
    avatar.textContent = initials;
  }

  const actions = $("hero-actions");
  if (PROFILE.cv) actions.appendChild(mk("a", "Descarregar CV", { class: "btn primary", href: PROFILE.cv, download: "" }));
  actions.appendChild(mk("a", "Entrar em contacto", { class: PROFILE.cv ? "btn" : "btn primary", href: "#contacto" }));
}

function renderSkills() {
  Object.entries(SKILLS).forEach(([group, items]) => {
    const wrap = mk("div", "", { class: "skill-group" });
    wrap.appendChild(mk("h3", group, { class: "skill-title" }));
    const ul = mk("ul", "", { class: "skills" });
    items.forEach((s) => ul.appendChild(mk("li", s)));
    wrap.appendChild(ul);
    $("skills").appendChild(wrap);
  });
}

function renderContacts() {
  const items = [
    ["Email", PROFILE.email && `mailto:${PROFILE.email}`, "email"],
    ["GitHub", PROFILE.github, "github"],
    ["LinkedIn", PROFILE.linkedin, "linkedin"],
    ["WhatsApp 942942347", PROFILE.whatsapp, "whatsapp"],
    ["Telefone 942942347", PROFILE.phone, "phone"],
    ["Telefone 2 958578860", PROFILE.phone2, "phone"]
  ];
  const iconPaths = {
    email: ["M3 5h18v14H3z", "m3 6 9 7 9-7"],
    github: ["M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.99c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.59c0 .27.18.58.69.48A10 10 0 0 0 12 2z"],
    linkedin: ["M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3 9h3v12H3zM9 9h3v1.64c.42-.8 1.47-1.89 3.53-1.89 3.78 0 4.47 2.49 4.47 5.73V21h-3v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V21H9z"],
    whatsapp: ["M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.7a12 12 0 0 0 5.8 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.3-6.1-3.7-8.3zM12.1 21.8h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10 2.7 0 5.2 1.1 7.1 2.9a10 10 0 0 1 2.9 7.1c0 5.4-4.5 9.8-10 9.8z", "M17.8 14.8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.3 8.3 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 .3.5 2.2 3.3c1.9 2.7 4.6 3.6 5.1 3.8s2.1.9 2.6.7 1.7-.7 1.9-1.4.2-1.3.1-1.4-.3-.2-.6-.4z"],
    phone: ["M6.6 2h3l1.5 5.2-2 1.7a15.7 15.7 0 0 0 6 6l1.7-2 5.2 1.5v3c0 1.1-.9 2-2 2C10.6 19.4 4.6 13.4 4.6 6c0-1.1.9-2 2-2z"]
  };
  items.forEach(([label, href, icon]) => {
    if (!href) return;
    const li = mk("li");
    const a = mk("a", "", { class: "contact-btn", href, "aria-label": label, title: label });
    if (href.startsWith("https://")) ext(a);
    const svg = mk("svg", "", { class: "contact-icon", viewBox: "0 0 24 24", fill: icon === "email" ? "none" : "currentColor", stroke: icon === "email" ? "currentColor" : "none", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", focusable: "false" });
    iconPaths[icon].forEach((d) => svg.appendChild(mk("path", "", { d })));
    a.appendChild(svg);
    li.appendChild(a);
    $("contacts").appendChild(li);
  });
}

function openProject(p) {
  $("m-title").textContent = p.title;
  const date = $("m-date"); date.textContent = p.date; date.hidden = !p.date;
  $("m-stack").replaceChildren(...(p.stack || []).map((s) => mk("li", s)));
  $("m-summary").textContent = p.summary;
  const note = $("m-note"); note.hidden = !p.note; note.firstChild.textContent = p.note || "";
  $("m-dec").hidden = !(p.decisions && p.decisions.length);
  $("m-dec-list").replaceChildren(...(p.decisions || []).map((d) => mk("li", d)));
  $("m-lim").hidden = !p.limitation; $("m-lim-text").textContent = p.limitation || "";
  const links = $("m-links"); links.replaceChildren();
  if (p.demo) links.appendChild(ext(mk("a", "Ver demo", { class: "btn primary", href: p.demo })));
  if (p.code) links.appendChild(ext(mk("a", "Ver código", { class: "btn", href: p.code })));
  $("modal").showModal();
}

function projectCard(p) {
  const btn = mk("button", "", { class: "card", type: "button", "aria-label": `Abrir detalhes de ${p.title}` });
  const cover = mk("div", p.image ? "" : p.title.slice(0, 2).toUpperCase(), { class: "cover" });
  if (p.image) cover.style.backgroundImage = `url("${p.image}")`;
  const body = mk("div", "", { class: "body" });
  body.appendChild(mk("h4", p.title));
  body.appendChild(mk("p", p.summary));
  const tags = mk("ul", "", { class: "tags" });
  (p.stack || []).forEach((s) => tags.appendChild(mk("li", s)));
  body.appendChild(tags);
  btn.append(cover, body);
  btn.addEventListener("click", () => openProject(p));
  return btn;
}

function renderGroup(list, groupId, containerId) {
  $(groupId).hidden = list.length === 0;
  $(containerId).replaceChildren(...list.map(projectCard));
}

function renderProjects() {
  renderGroup(PROJECTS.filter((p) => p.featured), "g-featured", "featured");
  renderGroup(PROJECTS.filter((p) => !p.featured), "g-all", "all");
}
