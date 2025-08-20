
// Configurable Backend URL

let BASE_URL = "";

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
  BASE_URL = "http://127.0.0.1:8000";
} else {
  BASE_URL = "https://user-registration-authentication.lakshp.live";
}


// Switch Tabs (Login/Register)

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const container = document.querySelector(".container"); // ✅ fixed

// Show Login
if (loginBtn) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.remove("active");
  });
}

// Show Register
if (registerBtn) {
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.add("active");
  });
}


// Handle Login

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${BASE_URL}/api/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.access) localStorage.setItem("access", data.access);
      if (data.refresh) localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "./templates/dashboard.html";
    } else {
      alert(data.detail || "Invalid credentials!");
    }
  } catch (error) {
    alert("Error: " + error);
  }
});


// Handle Register

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${BASE_URL}/api/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please login.");
      container.classList.remove("active"); 
    } else {
      alert(JSON.stringify(data));
    }
  } catch (error) {
    alert("Error: " + error);
  }
});
