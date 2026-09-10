const resources = {
  en: {
    translation: {
      workTitle: "📚 Work",
      workText:
        "I am a front-end developer focused on building dynamic and responsive interfaces with React. I continually improve my skills through modern tools and development practices. I work well in teams and believe collaboration is essential for innovative, scalable results.",
      skillsTitle: "🔧 Skills",
      lang: "Languages:",
      styles: "Styling:",
      database: "Databases:",
      tools: "Tools:",
      experience: "💼 Professional experience",
      kyrosTitle:
        "<strong>Kyros Tecnologia</strong> - Systems Analyst II (April 2025 - Present)",
      kyrosText:
        "I work as a Systems Analyst II, contributing to front-end development with Angular, Bootstrap, npm and GitLab. I started as a development intern, working with a broad range of web technologies.",
      kyrosTitleEstagiario:
        "<strong>Kyros Tecnologia</strong> - Development Intern (October 2023 - April 2025)",
      kyrosTextEstagiario:
        "I worked with Java, Spring Boot, databases, HTML, CSS, JavaScript, TypeScript, React, Next.js, Bootstrap, Tailwind and Shadcn in an agile environment, helping deliver solutions and meaningful improvements to web applications.",
      relotecTitle:
        "<strong>Relotec Sistemas de Ponto e Acesso</strong> - Systems Support (May 2023 - September 2023)",
      relotecText:
        "I provided technical support and solutions for time and access control systems, helping ensure stable and efficient operations.",
    },
  },
  pt: {
    translation: {
      workTitle: "📚 Experiência",
      workText:
        "Sou desenvolvedor front-end, com foco em criar interfaces dinâmicas e responsivas com React. Busco aprimorar continuamente minhas habilidades por meio de ferramentas modernas e boas práticas de desenvolvimento. Trabalho bem em equipe e acredito que a colaboração é essencial para resultados inovadores e escaláveis.",
      skillsTitle: "🔧 Habilidades",
      lang: "Linguagens:",
      styles: "Estilização:",
      database: "Banco de dados:",
      tools: "Ferramentas:",
      experience: "💼 Experiência profissional",
      kyrosTitle:
        "<strong>Kyros Tecnologia</strong> - Analista de Sistemas II (abril de 2025 - atual)",
      kyrosText:
        "Atuo como Analista de Sistemas II, contribuindo com o desenvolvimento front-end em Angular, Bootstrap, npm e GitLab. Iniciei como estagiário de desenvolvimento, trabalhando com uma ampla gama de tecnologias web.",
      kyrosTitleEstagiario:
        "<strong>Kyros Tecnologia</strong> - Estagiário de Desenvolvimento (outubro de 2023 - abril de 2025)",
      kyrosTextEstagiario:
        "Trabalhei com Java, Spring Boot, bancos de dados, HTML, CSS, JavaScript, TypeScript, React, Next.js, Bootstrap, Tailwind e Shadcn em ambiente ágil, contribuindo com soluções e melhorias relevantes para aplicações web.",
      relotecTitle:
        "<strong>Relotec Sistemas de Ponto e Acesso</strong> - Suporte de Sistemas (maio de 2023 - setembro de 2023)",
      relotecText:
        "Prestei suporte técnico e implementei soluções para sistemas de controle de ponto e acesso, ajudando a manter operações estáveis e eficientes.",
    },
  },
};

function updateContent() {
  const htmlElements = ["kyrosTitle", "kyrosTitleEstagiario", "relotecTitle"];
  const textElements = [
    "workTitle",
    "workText",
    "skillsTitle",
    "lang",
    "styles",
    "database",
    "tools",
    "experience",
    "kyrosText",
    "kyrosTextEstagiario",
    "relotecText",
  ];

  htmlElements.forEach((key) => {
    document.getElementById(key).innerHTML = i18next.t(key);
  });

  textElements.forEach((key) => {
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
