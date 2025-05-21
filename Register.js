document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registration-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let hasError = false;

    // inputs
    const fullName = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const creditCard = document.getElementById("creditCard");
    const expDate = document.getElementById("expdate");
    const cvv = document.getElementById("cvv");
    const terms = document.getElementById("terms");

    // validation
    if (fullName.value.trim() === "") {
      showError(fullName, "Full name is required.");
      hasError = true;
    }

    if (!/^0\d{9}$/.test(phone.value.trim())) {
      showError(phone, "Phone must be 10 digits and start with 0.");
      hasError = true;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
      showError(email, "Enter a valid email address.");
      hasError = true;
    }

    if (!/^\d{12,19}$/.test(creditCard.value.trim())) {
      showError(creditCard, "Enter a valid credit card number (12-19 digits).");
      hasError = true;
    }

    if (expDate.value === "") {
      showError(expDate, "Expiry date is required.");
      hasError = true;
    }

    if (!/^\d{3,4}$/.test(cvv.value.trim())) {
      showError(cvv, "CVV must be 3 or 4 digits.");
      hasError = true;
    }

    if (!terms.checked) {
      showError(terms.parentElement, "You must agree to the Terms and Conditions.");
      hasError = true;
    }

    
    if (!hasError) {
      showMessage("Registration completed successfully!", "success");
      form.reset();
    }
  });

  
  function showError(input, message) {
    input.classList.add("error");

    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.marginTop = "4px";
    error.textContent = message;

    if (input.tagName === "INPUT" || input.tagName === "TEXTAREA") {
      input.parentElement.appendChild(error);
    } else {
      input.appendChild(error);
    }

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
    const box = document.getElementById("messageBox");
    if (box) {
      box.style.display = "none";
      box.textContent = "";
    }
  }

  function showMessage(message, type = "error") {
    const box = document.getElementById("messageBox");
    box.textContent = message;
    box.className = `message-box ${type}`;
    box.style.display = "block";
  }
});
