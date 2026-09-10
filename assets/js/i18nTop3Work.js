const resources = {
  en: {
    translation: {
      top3Title: "Top 3 Areas",
      top3Text: "Here are the three main areas where I focus my work:",
      frontendTitle: "Front-End Development",
      frontendText:
        "I build dynamic and responsive user interfaces with React, JavaScript, TypeScript, HTML and CSS. From intuitive layouts to advanced front-end logic, I focus on seamless user experiences and modern web standards.",
      stylingTitle: "Styling Frameworks",
      stylingText:
        "Using Tailwind, Bootstrap and Shadcn, I create clean and responsive designs that improve both the look and usability of web applications. I focus on fluid, accessible interfaces that remain consistent across devices.",
      backendTitle: "Back-End and Databases",
      backendText:
        "Although front-end development is my main focus, I also have experience with Java, Spring Boot and SQL databases. This knowledge helps me collaborate effectively with back-end teams and deliver smoother integrations.",
    },
  },
  pt: {
    translation: {
      top3Title: "3 principais áreas",
      top3Text:
        "Estas são as três principais áreas em que concentro meu trabalho:",
      frontendTitle: "Desenvolvimento Front-End",
      frontendText:
        "Construo interfaces de usuário dinâmicas e responsivas com React, JavaScript, TypeScript, HTML e CSS. De layouts intuitivos a lógicas avançadas de front-end, foco em experiências fluidas e padrões modernos da web.",
      stylingTitle: "Frameworks de Estilização",
      stylingText:
        "Com Tailwind, Bootstrap e Shadcn, crio designs limpos e responsivos que melhoram a estética e a usabilidade das aplicações web. O foco é entregar interfaces fluidas, acessíveis e consistentes em diferentes dispositivos.",
      backendTitle: "Back-End e Banco de Dados",
      backendText:
        "Embora o desenvolvimento front-end seja meu foco principal, também tenho experiência com Java, Spring Boot e bancos de dados SQL. Esse conhecimento facilita a colaboração com equipes de back-end e integrações mais fluidas.",
    },
  },
};

function updateContent() {
  const elements = [
    "top3Title",
    "top3Text",
    "frontendTitle",
    "frontendText",
    "stylingTitle",
    "stylingText",
    "backendTitle",
    "backendText",
  ];

  elements.forEach((key) => {
    document.getElementById(key).textContent = i18next.t(key);
  });
}

i18next.init(
  {
    lng: localStorage.getItem("portfolio-language") || "pt",
    fallbackLng: "pt",
    resources,
  },
  updateContent,
);

document.addEventListener("portfolio:languagechange", updateContent);
