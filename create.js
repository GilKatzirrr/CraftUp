document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearErrors();
  
      let hasError = false;
  
      const fields = [
        {
          id: "title",
          validator: val => val.length >= 3,
          message: "Title must be at least 3 characters."
        },
        {
          id: "description",
          validator: val => val.length >= 10,
          message: "Description must be at least 10 characters."
        },
        {
          id: "date",
          validator: val => {
            const inputDate = new Date(val);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return inputDate > today;
          },
          message: "Date must be in the future."
        },
        {
          id: "time",
          validator: val => val !== "",
          message: "Time is required."
        },
        {
          id: "participants",
          validator: val => parseInt(val) >= 1,
          message: "Participants must be 1 or more."
        },
        {
          id: "instructor",
          validator: val => /^[A-Za-z\u0590-\u05FF\s]+$/.test(val),
          message: "Instructor name must contain only letters."
        }
      ];
  
      fields.forEach(({ id, validator, message }) => {
        const input = document.getElementById(id);
        const value = input.value.trim();
  
        if (!validator(value)) {
          showError(input, message);
          hasError = true;
        }
      });
  
      const confirm = document.getElementById("confirm");
      if (!confirm.checked) {
        const checkboxLabel = confirm.parentElement;
        showError(checkboxLabel, "You must confirm the workshop details.");
        hasError = true;
      }
  
      if (!hasError) {
        showSuccess("Workshop submitted successfully!");
        form.submit();
      }
    });
  
    function showError(input, message) {
      input.classList.add("error");
  
      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = message;
      error.style.color = "red";
      error.style.marginTop = "4px";
  
      if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error-message")) {
        input.parentElement.appendChild(error);
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
    }
  
    function showSuccess(message) {
      const msg = document.createElement("div");
      msg.textContent = message;
      msg.style.color = "green";
      msg.style.marginTop = "15px";
      form.appendChild(msg);
    }
  });
  