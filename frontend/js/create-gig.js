
// Configurable Backend URL

let BASE_URL = "";

if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") {
    BASE_URL = "http://127.0.0.1:8000";
} else {
    BASE_URL = "https://user-registration-authentication.lakshp.live";
}


// Handle Create Gig

document.getElementById("create-gig-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("gig-title").value;
    const description = document.getElementById("gig-description").value;
    const amount = document.getElementById("gig-amount").value;

    const token = localStorage.getItem("access");  // ✅ require JWT auth

    if (!token) {
        alert("You must be logged in to create a gig.");
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/gigs/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, description, amount })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Gig created successfully!");
            window.location.href = "dashboard.html"; // ✅ redirect to dashboard
        } else {
            alert("⚠️ " + JSON.stringify(data));
        }
    } catch (error) {
        alert("Error: " + error);
    }
});


// Go Back to Dashboard

function goBack() {
    window.location.href = "dashboard.html";
}
