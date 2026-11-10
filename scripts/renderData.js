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
    ["Email", PROFILE.email && `mailto:${PROFILE.email}`, PROFILE.email],
    ["GitHub", PROFILE.github, (PROFILE.github || "").replace("https://", "")],
    ["LinkedIn", PROFILE.linkedin, (PROFILE.linkedin || "").replace("https://www.", "")],
    ["Whatsapp", PROFILE.whatsapp, (PROFILE.whatsapp || "").replace("https://wa.me/", "")]
  ];
  items.forEach(([label, href, text]) => {
    if (!href) return;
    const li = mk("li");
    li.appendChild(mk("strong", label));
    const a = mk("a", text, { href });
    if (!href.startsWith("mailto:")) ext(a);
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
