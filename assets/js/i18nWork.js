const resources = {
  en: {
    translation: {
      workEyebrow: "Professional journey",
      workTitle: "Technology focused on quality and continuity",
      workText:
        "I work on the development and maintenance of web applications, contributing from flow analysis to responsive interfaces, integrations, and the evolution of production systems.",
      resumeActionText: "Download resume",
      skillsEyebrow: "Skills",
      skillsTitle: "An approach that connects interface, data, and process",
      skillsDescription:
        "Technologies and practices used to deliver clear interfaces, sustainable integrations, and a consistent experience.",
      frontendTitle: "Front-end",
      frontendText:
        "React, Next.js, Angular, JavaScript, TypeScript, HTML, and CSS.",
      backendTitle: "Integrations and back-end",
      backendText:
        "Java, Spring Boot, Node.js, REST APIs, and support for services consumed by the front-end.",
      dataTitle: "Data",
      dataText:
        "SQL, PostgreSQL, data modeling, and collaboration on DDL definitions.",
      qualityTitle: "Quality and delivery",
      qualityText:
        "Git, flow analysis, technical documentation, incident investigation, and continuous improvement.",
      experienceEyebrow: "Experience",
      experienceTitle: "Building a career in technology",
      experienceDescription:
        "Experiences organized by the evolution of responsibilities, with a focus on web products and systems operations.",
      currentPeriod: "Since August 2026 · Remote",
      currentRole:
        "Systems Analyst VI · Full Stack Development and Production Support",
      currentDescription:
        "Production support, incident analysis and resolution, application evolution, APIs, and databases, with root-cause investigation and solution validation.",
      analystSixPeriod: "Since November 2025 · Hybrid",
      analystSixRole: "Systems Analyst VI",
      analystSixDescription:
        "Front-end development, documentation, and solution implementation, supporting technical design, processes, DDLs, and integrations between services and interfaces.",
      analystTwoPeriod: "April 2025 — November 2025 · Remote",
      analystTwoRole: "Systems Analyst II",
      analystTwoDescription:
        "Design and development of responsive screens, page analysis, documentation, and flow definition for internal and external projects.",
      internPeriod: "October 2023 — April 2025 · Remote",
      internRole: "Development Intern",
      internDescription:
        "Participation in web applications in an agile environment, using Java, Spring Boot, databases, and modern front-end technologies.",
      supportPeriod: "May 2023 — September 2023 · On-site",
      supportRole: "Systems Support",
      supportDescription:
        "Technical support for time and access control systems, helping keep operations stable and solve issues.",
    },
  },
  pt: {
    translation: {
      workEyebrow: "Trajetória profissional",
      workTitle: "Tecnologia com foco em qualidade e continuidade",
      workText:
        "Atuo no desenvolvimento e na sustentação de aplicações web, contribuindo desde a análise de fluxos até interfaces responsivas, integrações e evolução de sistemas em produção.",
      resumeActionText: "Baixar currículo",
      skillsEyebrow: "Competências",
      skillsTitle: "Uma atuação que conecta interface, dados e processos",
      skillsDescription:
        "Tecnologias e práticas usadas para entregar interfaces claras, integrações sustentáveis e uma experiência consistente.",
      frontendTitle: "Front-end",
      frontendText:
        "React, Next.js, Angular, JavaScript, TypeScript, HTML e CSS.",
      backendTitle: "Integrações e back-end",
      backendText:
        "Java, Spring Boot, Node.js, APIs REST e suporte a serviços consumidos pelo front-end.",
      dataTitle: "Dados",
      dataText:
        "SQL, PostgreSQL, modelagem de dados e colaboração na definição de DDLs.",
      qualityTitle: "Qualidade e entrega",
      qualityText:
        "Git, análise de fluxos, documentação técnica, investigação de falhas e melhoria contínua.",
      experienceEyebrow: "Experiência",
      experienceTitle: "Construindo uma trajetória em tecnologia",
      experienceDescription:
        "Experiências organizadas pela evolução de responsabilidades, com foco em produtos web e operação de sistemas.",
      currentPeriod: "Desde agosto de 2026 · Remoto",
      currentRole:
        "Analista de Sistemas VI · Desenvolvimento Full Stack e Sustentação",
      currentDescription:
        "Atuação em sustentação de produção, análise e resolução de incidentes, evolução de aplicações, APIs e bancos de dados, com investigação de causa raiz e validação de soluções.",
      analystSixPeriod: "Desde novembro de 2025 · Híbrido",
      analystSixRole: "Analista de Sistemas VI",
      analystSixDescription:
        "Desenvolvimento front-end, documentação e implementação de soluções, apoiando desenho técnico, processos, DDLs e integrações entre serviços e interfaces.",
      analystTwoPeriod: "Abril de 2025 — novembro de 2025 · Remoto",
      analystTwoRole: "Analista de Sistemas II",
      analystTwoDescription:
        "Concepção e desenvolvimento de telas responsivas, análise de páginas, documentação e definição de fluxos para projetos internos e externos.",
      internPeriod: "Outubro de 2023 — abril de 2025 · Remoto",
      internRole: "Estagiário de Desenvolvimento",
      internDescription:
        "Participação em aplicações web em ambiente ágil, com Java, Spring Boot, bancos de dados e tecnologias modernas de front-end.",
      supportPeriod: "Maio de 2023 — setembro de 2023 · Presencial",
      supportRole: "Suporte de Sistemas",
      supportDescription:
        "Suporte técnico a sistemas de controle de ponto e acesso, contribuindo para a estabilidade das operações e a resolução de problemas.",
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
