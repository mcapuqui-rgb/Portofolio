// EDITA SÓ ESTE FICHEIRO para mudar o conteúdo do portfólio.

const PROFILE = {
  name: "Mendes Capuqui",
  title: "Desenvolvedor web",
  intro: "Construo sites e aplicações web, do front-end ao back-end.",
  about: "Full-Stack Web Developer. Trabalho no front-end com React e TypeScript e no back-end com Node.js, Express e MongoDB, incluindo APIs REST, autenticação, integração de APIs e deploy.",
  photo: "assets/Avatar.jpg",   // ex.: "assets/avatar.jpg". Vazio = mostra as iniciais
  email: "mcapuqui@gmail.com",
  github: "https://github.com/mcapuqui-rgb",
  linkedin: "https://www.linkedin.com/in/mendes-capuqui-584b80385",
  whatsapp: "https://wa.me/922849769", // ex.: "https://wa.me/351912345678". Vazio = o botão não aparece
  cv: ""       // ex.: "assets/cv/cv.pdf". Vazio = o botão não aparece
};

// Agrupadas por área. Só o que realmente dominas.
const SKILLS = {
  "Front-end": ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  "Back-end": ["Node.js", "Express.js", "APIs REST"],
  "Base de dados": ["MongoDB", "Mongoose"],
  "Ferramentas": ["Git", "GitHub", "Docker", "Postman"],
  "Outros": ["Autenticação", "Integração de APIs", "Design responsivo", "Deploy"]
};

// featured: true = aparece em "Destaques". Campos vazios ("") não aparecem.
// Para adicionar um projeto, copia um bloco e preenche.
const PROJECTS = [
  {
    title: "Ease Drip",
    featured: true,
    date: "",
    image: "",   // ex.: "assets/projects/easedrip.jpg"
    summary: "Catálogo online de uma boutique de moda, com 81 produtos, 32 marcas e pedidos por WhatsApp.",
    note: "",    // ex.: "Projeto de demonstração. Dados fictícios."
    stack: ["HTML", "CSS", "JavaScript"],
    decisions: [
      "Sem framework nem backend: um negócio pequeno não precisa de servidor.",
      "Loja montada em JavaScript a partir de ficheiros de dados, com pesquisa, filtros e modal.",
      "Interface em português e inglês, com tema claro e escuro."
    ],
    limitation: "Não tem carrinho, pagamentos nem painel de administração.",
    demo: "",
    code: ""
  }
];
