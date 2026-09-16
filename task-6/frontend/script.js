const API_URL = "http://localhost:5000/api";


// ===============================
// REGISTER
// ===============================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      document.getElementById("message").textContent =
        data.message;

      if (response.ok) {

        registerForm.reset();

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);

      }

    } catch (error) {

      document.getElementById("message").textContent =
        "Server connection failed.";

    }

  });

}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("loginEmail").value;

    const password =
      document.getElementById("loginPassword").value;

    try {

      const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });

      const data = await response.json();

      document.getElementById("loginMessage").textContent =
        data.message;

      if (response.ok) {

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        window.location.href = "dashboard.html";

      }

    } catch (error) {

      document.getElementById("loginMessage").textContent =
        "Server connection failed.";

    }

  });

}


// ===============================
// DASHBOARD
// ===============================

const dataForm = document.getElementById("dataForm");

if (dataForm) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    window.location.href = "login.html";
  }

  if (user) {
    document.getElementById("welcome").textContent =
      `Welcome, ${user.name}`;
  }

  loadData();


  // SAVE FORM DATA

  dataForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title =
      document.getElementById("title").value;

    const message =
      document.getElementById("formMessage").value;

    try {

      const response = await fetch(`${API_URL}/form`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          title,
          message
        })

      });

      const data = await response.json();

      document.getElementById("formStatus").textContent =
        data.message;

      if (response.ok) {

        dataForm.reset();

        loadData();

      }

    } catch (error) {

      document.getElementById("formStatus").textContent =
        "Failed to save data.";

    }

  });

}


// ===============================
// LOAD USER DATA
// ===============================

async function loadData() {

  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  try {

    const response = await fetch(`${API_URL}/form`, {

      headers: {
        Authorization: `Bearer ${token}`
      }

    });

    if (response.status === 401) {

      localStorage.clear();

      window.location.href = "login.html";

      return;

    }

    const data = await response.json();
    // console.log(data);

    const dataList =
      document.getElementById("dataList");

    if (!dataList) return;

    if (data.length === 0) {

      dataList.innerHTML =
        "<p>No data submitted yet.</p>";

      return;

    }

    dataList.innerHTML = data.data.map(item => `

      <div class="data-item">

        <h3>${item.title}</h3>

        <p>${item.message}</p>

        <small>
          ${new Date(item.createdAt).toLocaleString()}
        </small>

      </div>

    `).join("");

  } catch (error) {

    console.error(error);

  }

}


// ===============================
// LOGOUT
// ===============================

const logoutBtn =
  document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

  });

}