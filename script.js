const accounts = [
    { email: "internalaudit@gmail.com", password: "InternalAudit_29" },
    { email: "accounting@gmail.com", password: "Accounting_30" },
    { email: "pso@gmail.com", password: "PropertyandSupply_31" },
    { email: "procurement@gmail.com", password: "Procurement_32" },
    { email: "vcaf@gmail.com", password: "ViceChanAdminFinance_33" },
  ];

  const redirectURL =
    "https://drive.google.com/drive/folders/19wRPRgyvfPMjE-hLxNe-ezAVzOnlA8_x?usp=sharing";

  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeClosed = document.getElementById("eyeClosed");
  
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  
    // Toggle icons
    if (type === "text") {
      eyeOpen.style.display = "none";
      eyeClosed.style.display = "block";
    } else {
      eyeOpen.style.display = "block";
      eyeClosed.style.display = "none";
    }
  });

  // Auto-redirect if already logged in
  if (sessionStorage.getItem("loggedIn")) {
    window.location.href = redirectURL;
  }

  // Email validation regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Password validation regex
  function validatePassword(password) {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Check if fields are empty
    if (!enteredEmail || !enteredPassword) {
      showMessage("Please fill in all fields!", "red");
      return;
    }

    // Validate email format
    if (!validateEmail(enteredEmail)) {
      showMessage("Invalid email format!", "red");
      return;
    }

    // Check if account exists
    const accountFound = accounts.find(
      (acc) =>
        acc.email.toLowerCase() === enteredEmail.toLowerCase() &&
        acc.password === enteredPassword
    );

    if (accountFound) {
      // Successful login
      showMessage("Login Successful! Redirecting...", "green");
      sessionStorage.setItem("loggedIn", "true");

      setTimeout(() => {
        window.location.href = redirectURL;
      }, 1000);
    } else {
      // Invalid credentials
      showMessage("Invalid email or password!", "red");
    }
  });

  // Message display function
  function showMessage(msg, color) {
    message.style.color = color;
    message.style.fontSize = "12px"; // Make message smaller
    message.textContent = msg;
  }

  // Function to display message
  function showMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
  }