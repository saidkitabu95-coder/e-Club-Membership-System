async function loadDashboard() {

    try {

        const response = await fetch("http://127.0.0.1:8000/api/dashboard/");

        const data = await response.json();

        document.getElementById("statsContainer").innerHTML = `

            <div class="stats-grid">

                <div class="card">
                    <h2>${data.students}</h2>
                    <p>Students</p>
                </div>

                <div class="card">
                    <h2>${data.clubs}</h2>
                    <p>Clubs</p>
                </div>

                <div class="card">
                    <h2>${data.applications}</h2>
                    <p>Applications</p>
                </div>

                <div class="card">
                    <h2>${data.events}</h2>
                    <p>Events</p>
                </div>

                <div class="card">
                    <h2>${data.announcements}</h2>
                    <p>Announcements</p>
                </div>

            </div>

        `;

    } catch (error) {

        console.log(error);

        document.getElementById("statsContainer").innerHTML =
            "<h3>Failed to load dashboard.</h3>";

    }

}

function logout() {

    localStorage.removeItem("admin");

    window.location.href = "admin-login.html";

}

loadDashboard();