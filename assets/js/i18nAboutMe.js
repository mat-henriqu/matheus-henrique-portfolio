const resources = {
  en: {
    translation: {
      aboutMeEyebrow: "Professional portfolio",
      aboutMeTitle: "Front-end developer focused on useful products",
      aboutMeDescription:
        "I build web applications that combine quality, performance, and a clear experience for the people who use them. I bring together front-end development, API integration, and database knowledge to turn business needs into consistent solutions.",
      workAction: "Explore my experience",
      contactAction: "Get in touch",
      skillsEyebrow: "Technologies",
      skillsTitle: "Technical foundations for building and evolving products",
      skillsDescription:
        "A skill set focused on responsive interfaces, reliable integrations, and collaboration across front-end, back-end, and data.",
    },
  },
  pt: {
    translation: {
      aboutMeEyebrow: "Portfólio profissional",
      aboutMeTitle: "Desenvolvedor Front-End focado em produtos úteis",
      aboutMeDescription:
        "Crio aplicações web que combinam qualidade, desempenho e uma experiência clara para quem usa. Uno desenvolvimento front-end, integração com APIs e conhecimento em banco de dados para transformar necessidades de negócio em soluções consistentes.",
      workAction: "Conhecer minha experiência",
      contactAction: "Entrar em contato",
      skillsEyebrow: "Tecnologias",
      skillsTitle: "Base técnica para construir e evoluir produtos",
      skillsDescription:
        "Um repertório voltado para interfaces responsivas, integrações confiáveis e colaboração entre front-end, back-end e dados.",
    },
  },
};

function updateContent() {
  Object.keys(resources.pt.translation).forEach((key) => {
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
