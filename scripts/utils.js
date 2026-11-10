// Funções auxiliares usadas pelos outros ficheiros.
const $ = (id) => document.getElementById(id);

const mk = (tag, text, attrs = {}) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
};

const ext = (a) => { a.target = "_blank"; a.rel = "noopener"; return a; };
