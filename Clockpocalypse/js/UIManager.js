import { difficultyFlags } from "./DifficultySettings.js";
import { scenarios } from "./scenario.js";

const app = document.getElementById("app");

//Changes to the add flags and adjust difficulty settings.


export function showMenu() {

    app.innerHTML = `
        
        <div>
            <h1>Clockpocalypse</h1>

            <button id="start">Start</button>

            <button id="settings">Settings</button>

        </div>
    `;

    document
        .getElementById("start")
        .onclick = () => {
            showScenario();
        };


    document
        .getElementById("settings")
        .onclick = () => {
            console.log("Settings clicked");
        };
}

// to implement scenarios

export function showScenario() {

    let scenarioHTML = "";

    for (const key in scenarios) {

        scenarioHTML += `

            <button onclick="chooseScenario('${key}')">

                ${scenarios[key].name}

            </button>

        `;
    }

    app.innerHTML = `

        <div>

            <h1>Select Scenario</h1>

            ${scenarioHTML}

        </div>

    `;
}

// to implement difficulty
// to be updated later by PNG and Audio files
// Edited as Const 

export function showDifficulty() {

    let FlagsHTML = "";

    difficultyFlags.forEach((item) => {
        FlagsHTML += `

        <button
        class="flag"
        onclick="chooseDifficulty('${item.country}')">

        <style>
            .flag img {
                width: 200px;
                height: auto;
                object-fit: cover;
            }
            .flag { 
            cursor: pointer;
            margin: 10px;
            font-size: 30px;
            }
        </style>

        <img src="${item.image}">
        <p>${item.country}</p>

        </button>
        `;
    });

    app.innerHTML = `

        <div>

            <h1>Select Difficulty</h1>

            <div id="flags">

                ${FlagsHTML}
            </div>
        </div>
    `;
}

export function goToScenarioSelection() {

    showScenario();
}

export function showGameScreen() {

    app.innerHTML = `
    <div id="game-screen">

        <div id="timer">
            Time: 60
        </div>

        <div id="event-bubble">
        </div>

    </div>
    `
}


export function showEvents(events) {

    const container =
        document.getElementById("event-bubble");

    const existingIds = new Set(
        [...container.children].map(el => el.dataset.eventId)
    );
    const activeIds = new Set(events.map(e => String(e.id)));

    [...container.children].forEach(el => {
        if (!activeIds.has(el.dataset.eventId)){
            el.remove();
        }
    });


    events.forEach(event => {
        if(existingIds.has(String(event.id))){
            return; //if the notification is already on screen this leaves it alone. 
        }

        const notification = document.createElement("div");
        notification.className = "notification";
        notification.dataset.eventId = event.id;

        notification.innerHTML = `

            <div class="profile-circle">
                ${event.emoji ?? "⚠️"}
            </div>


            <div class="bubble">

                <h2>
                    ${event.title}
                </h2>


                <div class="details">

                    <p>
                        ${event.challenge}
                    </p>


                    <button class="complete">
                        Complete
                    </button>


                    <button class="skip">
                        Skip
                    </button>


                </div>

            </div>

        `;

        container.appendChild(notification);

        const bubble =
            notification.querySelector(".bubble");

        bubble.onclick = (e) => {

            if (e.target.tagName === "BUTTON") {
                return;
            }

            document
                .querySelectorAll(".bubble")
                .forEach(other => {

                    if (other !== bubble) {
                        other.classList.remove("expanded");
                    }
                });

            bubble.classList.toggle("expanded");
        };
    });
}

