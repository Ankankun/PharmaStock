document.addEventListener("DOMContentLoaded", function () {
  // Password Toggle Logic
  const toggleButtons = document.querySelectorAll(".toggle-password");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const wrapper = this.closest(".password-wrapper");
      const passwordInput = wrapper.querySelector("input");

      if (passwordInput) {
        // toggle the type attribute
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        // toggle the eye icon
        if (this.src.includes("close-eye.png")) {
          this.src = "../public/assets/open-eye.png";
        } else {
          this.src = "../public/assets/close-eye.png";
        }
      }
    });
  });

  // Password Match Validation (Sign Up Page)
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitButton = document.querySelector(".btn-login");

  if (passwordInput && confirmPasswordInput && submitButton) {
    function validatePasswords() {
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      // Check if passwords match and are not empty
      if (password && confirmPassword && password === confirmPassword) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.cursor = "pointer";
        confirmPasswordInput.style.border = "none"; // Reset border
      } else {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.6";
        submitButton.style.cursor = "not-allowed";

        // Visual feedback for mismatch
        if (password && confirmPassword && password !== confirmPassword) {
          confirmPasswordInput.style.border = "2px solid #ee6c4d"; // Orange border for error
        } else {
          confirmPasswordInput.style.border = "none";
        }
      }
    }

    // Initial validation
    validatePasswords();

    // Add event listeners
    passwordInput.addEventListener("input", validatePasswords);
    confirmPasswordInput.addEventListener("input", validatePasswords);
  }
});
