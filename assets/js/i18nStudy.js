const resources = {
  en: {
    translation: {
      faculty: "Education",
      descriptionFaculty: "Systems Analysis and Development.",
      courses: "Courses",
      typeLogic: "Programming Logic",
    },
  },
  pt: {
    translation: {
      faculty: "Faculdade",
      descriptionFaculty: "Análise e Desenvolvimento de Sistemas.",
      courses: "Cursos",
      typeLogic: "Lógica de Programação",
    },
  },
};

function updateContent() {
  document.getElementById("faculty").textContent = i18next.t("faculty");
  document.getElementById("descriptionFaculty").textContent =
    i18next.t("descriptionFaculty");
  document.getElementById("courses").textContent = i18next.t("courses");
  document.getElementById("typeLogic").textContent = i18next.t("typeLogic");
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
