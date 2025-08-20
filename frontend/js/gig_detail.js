
// Configurable Backend URL

let BASE_URL = "";

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    BASE_URL = "http://127.0.0.1:8000";
} else {
    BASE_URL = "https://user-registration-authentication.lakshp.live";
}


// Get gig ID from query string

const params = new URLSearchParams(window.location.search);
const gigId = params.get("id");

// DOM Elements
const editBtn = document.getElementById("editBtn");
const editForm = document.getElementById("edit-gig-form");
const titleInput = document.getElementById("edit-title");
const descInput = document.getElementById("edit-description");
const amountInput = document.getElementById("edit-amount");


// Fetch Gig Details

async function fetchGigDetail() {
    try {
        const response = await fetch(`${BASE_URL}/gigs/${gigId}/`);
        const gig = await response.json();

        document.getElementById("gig-title").innerText = gig.title;
        document.getElementById("gig-description").innerText = gig.description;
        document.getElementById("gig-amount").innerText = `$${gig.amount}`;
        document.getElementById("gig-creator").innerText = gig.created_by_name;
        document.getElementById("gig-date").innerText = new Date(gig.date_posted).toLocaleString();

        // Prefill edit form
        titleInput.value = gig.title;
        descInput.value = gig.description;
        amountInput.value = gig.amount;

        // Show edit button only if current user is the creator
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser && currentUser.username === gig.created_by_name) {
            editBtn.style.display = "inline-block";
        } else {
            editBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching gig detail:", error);
    }
}


// Toggle Edit Form

editBtn.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
});


// Handle Update Gig

editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
        alert("You must be logged in to edit gigs.");
        return;
    }

    const updatedGig = {
        title: titleInput.value,
        description: descInput.value,
        amount: amountInput.value
    };

    try {
        const response = await fetch(`${BASE_URL}/gigs/${gigId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedGig)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Gig updated successfully!");
            fetchGigDetail(); // Refresh details
            editForm.classList.add("hidden");
        } else {
            alert(JSON.stringify(data));
        }
    } catch (error) {
        alert("Error: " + error);
    }
});


// Go Back to Dashboard

function goBack() {
    window.location.href = "dashboard.html";
}

// Init
fetchGigDetail();
