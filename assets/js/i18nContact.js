const resources = {
  en: {
    translation: {
      contactEyebrow: "Let's talk",
      contactTitle: 'Open to new connections and challenges',
      contactDescription:
        'Choose the channel that works best for you or send a message with the form.',
      channelsTitle: 'Professional channels',
      channelsDescription:
        'I am available to exchange ideas, discuss opportunities, and collaborate on new projects.',
      formLegend: 'Send a message',
      formDescription: 'Submitting opens your email client with the message already prepared.',
      firstNameLabel: 'First name',
      firstNamePlaceholder: 'Your name',
      lastNameLabel: 'Last name',
      lastNamePlaceholder: 'Your last name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can I help?',
      submitLabel: 'Open email to send',
    },
  },
  pt: {
    translation: {
      contactEyebrow: 'Vamos conversar',
      contactTitle: 'Aberto a novas conexões e desafios',
      contactDescription: 'Escolha o canal que preferir ou envie uma mensagem pelo formulário.',
      channelsTitle: 'Canais profissionais',
      channelsDescription:
        'Estou disponível para trocar ideias, conversar sobre oportunidades e colaborar em novos projetos.',
      formLegend: 'Envie uma mensagem',
      formDescription: 'O envio abre o seu cliente de e-mail com a mensagem já preenchida.',
      firstNameLabel: 'Nome',
      firstNamePlaceholder: 'Seu nome',
      lastNameLabel: 'Sobrenome',
      lastNamePlaceholder: 'Seu sobrenome',
      emailLabel: 'E-mail',
      emailPlaceholder: 'voce@exemplo.com',
      messageLabel: 'Mensagem',
      messagePlaceholder: 'Como posso ajudar?',
      submitLabel: 'Abrir e-mail para enviar',
    },
  },
};

function updateContent() {
  Object.keys(resources.pt.translation).forEach((key) => {
    const element = document.getElementById(key);

    if (element) {
      element.textContent = i18next.t(key);
    }
  });

  const placeholders = {
    firstName: 'firstNamePlaceholder',
    lastName: 'lastNamePlaceholder',
    email: 'emailPlaceholder',
    message: 'messagePlaceholder',
  };

  Object.entries(placeholders).forEach(([id, key]) => {
    document.getElementById(id).placeholder = i18next.t(key);
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
