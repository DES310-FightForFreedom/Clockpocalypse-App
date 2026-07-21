import { difficultyFlags } from "./DifficultySettings.js";
import { scenarios } from "./scenario.js";
import { isCompleted } from "./ProgressTracker.js";

const app = document.getElementById("app");

//Changes to the add flags and adjust difficulty settings.


export function showMenu() {

    app.innerHTML = `
        
        <div class="menu-screen">
            <h1>Clockpocalypse</h1>

            <div class="menu-buttons">
            <button id="start">Start</button>
            <button id="settings">Settings</button>
            </div>
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

            <h1>Select Clockpocalypse</h1>

            ${scenarioHTML}

            <div>
                <button id= "backMenu">Back</button>
            </div>

        </div>
    `;
    document
        .getElementById("backMenu")
        .onclick = () => {
            showMenu();
        }
}

// to implement difficulty
// to be updated later by PNG and Audio files
// Edited as Const 

//export function showDifficulty() {

    // let FlagsHTML = "";

    // difficultyFlags.forEach((item) => {
    //     FlagsHTML += `

    //     <button
    //     class="flag"
    //     onclick="chooseDifficulty('${item.country}')">

    //     <style>
    //         .flag img {
    //             width: 200px;
    //             height: auto;
    //             object-fit: cover;
    //         }
    //         .flag { 
    //         cursor: pointer;
    //         margin: 10px;
    //         font-size: 30px;
    //         }
    //     </style>

    //     <img src="${item.image}">
    //     <p>${item.country}</p>

    //     </button>
    //     `;
    // });

    // app.innerHTML = `

    //     <div>

    //         <h1>Select Difficulty</h1>

    //         <div id="flags">

    //             ${FlagsHTML}
    //         </div>
    //     </div>
    // `;

    
//============================================================================================================
//EDITS FOR FLAG SCREEN BEGIN HERE 
//==============================================================================================================


const tierMeta = {
    easy: { label: "Easy", flames: "🔥" },
    medium: { label: "Medium", flames: "🔥🔥" },
    hard: { label: "Hard", flames: "🔥🔥🔥" },
    ultraHard: { label: "Ultra Hard", flames: "🔥🔥🔥🔥" }
};

let flagViewMode = "row";
let openTier = "easy";
let currentScenarioKey = null;



export function showDifficulty(scenarioKey) {

   currentScenarioKey= scenarioKey;
   openTier = "easy";

    app.innerHTML = `
        <div>
            <h1>Select Difficulty</h1>

            <div id="view-toggle">
                <button id="toggle-folder">Folder View</button>
                <button id="toggle-row">Row View</button>
            </div>

            <div id="flags"></div>

            <div>
                <button id="backScenarioSelect">Back</button>
            </div>
        </div>
    `;

    document.getElementById("toggle-folder").onclick = () => {
        flagViewMode = "folder";
        renderFlagView();
    };

    document.getElementById("toggle-row").onclick = () => {
        flagViewMode = "row";
        renderFlagView();
    };

    document
        .getElementById("backScenarioSelect")
        .onclick = () => {
            showScenario();
        };

    renderFlagView();
}

function renderFlagView() {
    if (flagViewMode === "folder") {
        renderFolderFlagView();
    } else {
        renderRowFlagView();
    }
}

function flagButtonHTML(item) {
    const completed = isCompleted(currentScenarioKey, item.country);

    return `
        <button class="flag${completed ? " completed" : ""}" onclick="chooseDifficulty('${item.country}')">
            ${completed ? '<span class="flag-check">✔</span>' : ""}
            <img src="${item.image}">
            <p class="flag-name">${item.country}</p>
        </button>
    `;
}

function renderFolderFlagView() {

    const container = document.getElementById("flags");

    let foldersHTML = "";

    for (const tierKey in tierMeta) {
        foldersHTML += `
            <button class="tier-folder" onclick="window.toggleFlagTier('${tierKey}')">
                📁 ${tierMeta[tierKey].label}
            </button>
        `;
    }

    let contentsHTML = "";

    if (openTier) {
        const matches = difficultyFlags.filter(
            flag => flag.level === openTier
        );

        contentsHTML = `<div id="folder-contents">`;
        matches.forEach(item => {
            contentsHTML += flagButtonHTML(item);
        });
        contentsHTML += `</div>`;
    }

    container.innerHTML = `
        <div id="scenario-folders">${foldersHTML}</div>
        ${contentsHTML}
    `;
}

function renderRowFlagView() {

    const container = document.getElementById("flags");
    const tierOrder = ["easy", "medium", "hard", "ultraHard"];
    let html = "";

    tierOrder.forEach(tierKey => {
        const matches = difficultyFlags.filter(
            flag => flag.level === tierKey
        );

        if (matches.length === 0) {
            return;
        }

        let cardsHTML = "";
        matches.forEach(item => {
            const completed = isCompleted(currentScenarioKey, item.country);
            cardsHTML += `
                <button class="flag scenario-card${completed ? " completed" : ""}" onclick="chooseDifficulty('${item.country}')">
                ${completed ? '<span class="flag-check">✔</span>' : ""}    
                <span class="flag-name">${item.country}</span>
                    <img src="${item.image}">
                    <span class="tier-flames">${tierMeta[tierKey]?.flames ?? ""}</span>
                </button>
            `;
        });

        html += `
            <div class="tier-row">
                <h3 class="tier-row-label">${tierMeta[tierKey].label}</h3>
                <div class="tier-row-cards">${cardsHTML}</div>
            </div>
        `;
    });

    container.innerHTML = html;
}

window.toggleFlagTier = function (tierKey) {
    openTier = openTier === tierKey ? null : tierKey;
    renderFolderFlagView();
};


//============================================================================================================
//EDITS FOR FLAG SCREEN END HERE 
//==============================================================================================================


export function goToScenarioSelection() {

    showScenario();
}

export function showGameScreen() {

    app.innerHTML = `
    <div id="game-screen">

    <div id="timer-container">

        <div id="timer">
            Time: 60
        </div>

        <div id="time-change"></div>
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

