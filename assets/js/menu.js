const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.getElementById('menu-items');

const navigationTranslations = {
  en: {
    about: 'About me',
    work: 'Work',
    education: 'Study',
    contact: 'Contact',
    language: 'Switch language',
    resume: 'Download resume',
  },
  pt: {
    about: 'Sobre mim',
    work: 'Experiência',
    education: 'Formação',
    contact: 'Contato',
    language: 'Alternar idioma',
    resume: 'Baixar currículo',
  },
};

function getCurrentLanguage() {
  return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt';
}

function updateNavigation(language = getCurrentLanguage()) {
  const translations = navigationTranslations[language];
  const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'aboutme.html';

  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-navigation-key]').forEach((element) => {
    const translation = translations[element.dataset.navigationKey];

    if (translation) {
      element.textContent = translation;
    }
  });

  document.querySelectorAll('#menu-items a[data-navigation-key]').forEach((link) => {
    const targetPage = link.getAttribute('href').split('/').pop().toLowerCase();
    const isCurrentPage = targetPage === currentPage;

    link.classList.toggle('is-active', isCurrentPage);
    link.toggleAttribute('aria-current', isCurrentPage);
  });

  document.querySelectorAll('[data-language-toggle]').forEach((button) => {
    button.setAttribute('aria-label', translations.language);
    button.setAttribute('title', translations.language);
  });
}

function closeMenu() {
  if (!menuToggle || !menuItems) {
    return;
  }

  menuItems.classList.remove('show');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('i')?.classList.replace('fa-times', 'fa-bars');
}

function toggleLanguage() {
  const nextLanguage = getCurrentLanguage() === 'pt' ? 'en' : 'pt';

  localStorage.setItem('portfolio-language', nextLanguage);
  updateNavigation(nextLanguage);

  if (window.i18next?.changeLanguage) {
    window.i18next.changeLanguage(nextLanguage, () => {
      document.dispatchEvent(new CustomEvent('portfolio:languagechange'));
    });
    return;
  }

  document.dispatchEvent(new CustomEvent('portfolio:languagechange'));
}

if (menuToggle && menuItems) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuItems.classList.toggle('show');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('i')?.classList.toggle('fa-bars', !isOpen);
    menuToggle.querySelector('i')?.classList.toggle('fa-times', isOpen);
  });

  menuItems.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

window.toggleLanguage = toggleLanguage;
updateNavigation();
