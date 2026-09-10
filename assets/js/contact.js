const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const firstName = formData.get("firstName")?.toString().trim() || "";
    const lastName = formData.get("lastName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const subject = `Contato pelo portfólio: ${fullName}`;
    const body = `Nome: ${fullName}\nE-mail: ${email}\n\nMensagem:\n${message}`;

    window.location.href = `mailto:theush933@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
