document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const contactFullName = document.getElementById("contactFullName");
  const contactEmail = document.getElementById("contactEmail");
  const contactPhone = document.getElementById("contactPhone");
  const contactSubject = document.getElementById("contactSubject");
  const contactMessage = document.getElementById("message");
  const messageBox = document.getElementById("messageBox");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    if (contactFullName.value.trim() === "") {
      showError(contactFullName, "Full name is required.");
      hasError = true;
    }

    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(contactEmail.value.trim())) {
      showError(contactEmail, "Invalid email address.");
      hasError = true;
    }

    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(contactPhone.value.trim())) {
      showError(contactPhone, "Phone number must be 10 digits and start with 0.");
      hasError = true;
    }

    if (contactSubject.value.trim() === "") {
      showError(contactSubject, "Subject is required.");
      hasError = true;
    }

    if (contactMessage.value.trim().length < 10) {
      showError(contactMessage, "Message must be at least 10 characters.");
      hasError = true;
    }

   
    if (!hasError) {
      showMessage("Message sent successfully!", "success");
      form.reset();
    }
  });

  function showError(input, message) {
    input.classList.add("error");

    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.9em";
    error.textContent = message;

    input.parentElement.appendChild(error);

    input.addEventListener("input", () => {
      input.classList.remove("error");
      const next = input.nextElementSibling;
      if (next && next.classList.contains("error-message")) {
        next.remove();
      }
    }, { once: true });
  }

  
  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
    document.querySelectorAll(".error").forEach(e => e.classList.remove("error"));
    messageBox.textContent = "";
    messageBox.style.display = "none";
  }


  function showMessage(message, type = "success") {
    messageBox.textContent = message;
    messageBox.style.color = type === "success" ? "green" : "red";
    messageBox.style.fontWeight = "bold";
    messageBox.style.display = "block";
  }
});
