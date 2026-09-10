const resources = {
  en: {
    translation: {
      studyEyebrow: 'Continuous learning',
      faculty: 'Education and certifications',
      descriptionFaculty:
        'A learning path focused on software development, strong fundamentals, and technologies applied to web products.',
      coursesEyebrow: 'Knowledge in practice',
      courses: 'Courses and certificates',
      coursesDescription:
        'Certificates organized by topic to make technical growth easy to explore.',
      typeLogic: 'Programming logic',
      frontendCourses: 'Front-end',
      aiCourses: 'Artificial intelligence',
      linuxCourses: 'Linux',
    },
  },
  pt: {
    translation: {
      studyEyebrow: 'Formação contínua',
      faculty: 'Formação e certificações',
      descriptionFaculty:
        'Uma trilha de estudos focada em desenvolvimento de software, fundamentos sólidos e tecnologias aplicadas a produtos web.',
      coursesEyebrow: 'Conhecimento em prática',
      courses: 'Cursos e certificados',
      coursesDescription:
        'Certificados organizados por área para tornar a evolução técnica fácil de consultar.',
      typeLogic: 'Lógica de programação',
      frontendCourses: 'Front-end',
      aiCourses: 'Inteligência artificial',
      linuxCourses: 'Linux',
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
    lng: localStorage.getItem('portfolio-language') || 'pt',
    fallbackLng: 'pt',
    resources,
  },
  updateContent,
);

document.addEventListener('portfolio:languagechange', updateContent);
