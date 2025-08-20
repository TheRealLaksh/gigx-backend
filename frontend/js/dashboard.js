
// Configurable Backend URL

let BASE_URL = "";

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
  BASE_URL = "http://127.0.0.1:8000";
} else {
  BASE_URL = "https://user-registration-authentication.lakshp.live";
}


// DOM Elements

const gigList = document.getElementById("gig-list");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// Logged-in user
const user = JSON.parse(localStorage.getItem("user")) || null;

// Edit Modal Elements
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const editForm = document.getElementById("edit-gig-form");
const editTitle = document.getElementById("edit-title");
const editDesc = document.getElementById("edit-description");
const editAmount = document.getElementById("edit-amount");

let editingGigId = null;


// Fetch Gigs

async function fetchGigs(query = "") {
  try {
    const url = query ? `${BASE_URL}/gigs/?search=${query}` : `${BASE_URL}/gigs/`;
    const response = await fetch(url);
    const gigs = await response.json();

    gigList.innerHTML = "";

    if (!gigs.length) {
      gigList.innerHTML = "<p>No gigs found.</p>";
      return;
    }

    gigs.forEach(gig => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <h3><a href="gig_detail.html?id=${gig.id}">${gig.title}</a></h3>
        <p>${gig.description.substring(0, 80)}...</p>
        <p><strong>Amount:</strong> $${gig.amount}</p>
        <p class="muted">Posted by: ${gig.created_by_name}</p>
        <p class="muted">Date: ${new Date(gig.date_posted).toLocaleDateString()}</p>
      `;

      // Only show edit/delete if this user's gig
      if (user && user.id === gig.created_by) {
        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => openEditModal(gig));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteGig(gig.id));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        div.appendChild(actions);
      }

      gigList.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching gigs:", error);
    gigList.innerHTML = "<p>Error loading gigs.</p>";
  }
}


// Open Edit Modal

function openEditModal(gig) {
  editingGigId = gig.id;
  editTitle.value = gig.title;
  editDesc.value = gig.description;
  editAmount.value = gig.amount;

  editModal.classList.remove("hidden");
}


// Close Modal

closeModal.addEventListener("click", () => {
  editModal.classList.add("hidden");
  editingGigId = null;
});


// Save Changes

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("access");
  if (!token) {
    alert("You must be logged in.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/gigs/${editingGigId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title: editTitle.value,
        description: editDesc.value,
        amount: editAmount.value
      })
    });

    if (response.ok) {
      alert("Gig updated successfully!");
      editModal.classList.add("hidden");
      fetchGigs();
    } else {
      const data = await response.json();
      alert("Error updating gig: " + JSON.stringify(data));
    }
  } catch (err) {
    alert("Error: " + err);
  }
});


// Delete Gig

async function deleteGig(id) {
  if (!confirm("Are you sure you want to delete this gig?")) return;

  const token = localStorage.getItem("access");
  if (!token) {
    alert("You must be logged in.");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/gigs/${id}/`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (response.ok) {
      alert("Gig deleted successfully!");
      fetchGigs();
    } else {
      alert("Error deleting gig.");
    }
  } catch (err) {
    alert("Error: " + err);
  }
}


// Search

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  fetchGigs(query);
});


// Logout

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  window.location.href = "../index.html"; // back to login
});


// Init

fetchGigs();

// Populate user info
if (user) {
  document.getElementById("user-name").textContent = user.name || user.username;
  document.getElementById("user-email").textContent = user.email;
  document.querySelectorAll("#user-role").forEach(el => el.textContent = user.role);
}
