const resources = {
  en: {
    translation: {
      aboutMe: "About me",
      description:
        "I am a front-end developer with experience in React, Next.js, TypeScript, Angular, Java and Spring Boot, focused on creating web applications that combine quality, performance and a great user experience. I have advanced knowledge of HTML, CSS and styling frameworks such as Bootstrap, Tailwind and Shadcn, always aiming to deliver efficient and scalable solutions. My goal is to evolve constantly by creating solutions that bring real business value and intuitive experiences to users, combining technology with good development practices.",
      skills: "Skills",
    },
  },
  pt: {
    translation: {
      aboutMe: "Sobre mim",
      description:
        "Sou Desenvolvedor Front-End com experiência em React, Next.js, TypeScript, Angular, Java e Spring Boot, focado em criar aplicações web que unem qualidade, performance e boa experiência de usuário. Tenho conhecimento avançado em HTML, CSS e frameworks de estilização como Bootstrap, Tailwind e Shadcn, sempre buscando entregar soluções eficientes e escaláveis. Meu objetivo é evoluir constantemente, criando soluções que tragam valor real para o negócio e experiências intuitivas para os usuários, sempre aliando tecnologia e boas práticas de desenvolvimento.",
      skills: "Habilidades",
    },
  },
};

function updateContent() {
  document.getElementById("aboutMeTitle").textContent = i18next.t("aboutMe");
  document.getElementById("aboutMeDescription").textContent =
    i18next.t("description");
  document.getElementById("skillsTitle").textContent = i18next.t("skills");
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
