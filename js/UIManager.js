const mySounds = new sound_effects();
let modernChallenge;

let holdTimer = null;
const HOLD_DURATION = 1500; // Time in milliseconds (1.5 seconds)
let isHoldTrigger = false;
let triviaCountry;


// Track which event card is currently playing sound
let activePlayingEventId = null;

import { difficultyFlags } from "./DifficultySettings.js";
import { scenarios } from "./scenario.js";
import { isScenarioCompleted, isCountryCompleted, isScenarioTierCompleted } from "./ProgressTracker.js";
import { currentScenario, GameManager, scenarioChallenges } from "./GameManager.js";
import { sound_effects } from "./sound_effects.js";
import { userScenario } from "./GameManager.js";
import { Events, getActiveEvents } from "./Events.js";
import { loadSoundSettings, setSoundSetting } from "./SoundManager.js";
import { currentGameInstance } from "./GameManager.js";
import { selectCountry } from "./Main.js";
import { trivia } from "./Trivia.js";

const app = document.getElementById("app");

const tierOrder = ["easy", "medium", "hard", "ultraHard"];
const tierMeta = {
    easy: { label: "Easy", flames: "🔥" },
    medium: { label: "Medium", flames: "🔥🔥" },
    hard: { label: "Hard", flames: "🔥🔥🔥" },
    ultraHard: { label: "Ultra Hard", flames: "🔥🔥🔥🔥" }
};

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
            showSettings();
        };
}

export function showSettings() {
    const settings = loadSoundSettings();

    app.innerHTML = `
        <div class="settings-screen">
            <h1>Settings</h1>
            <div class="settings-list">${buildVolumeSlidersHTML("vol", settings)}</div>
            <div>
                <button id="backMenuFromSettings">Back</button>
            </div>
        </div>
    `;

    document.querySelectorAll('input[type="range"][data-channel]').forEach(slider => {
        slider.oninput = (e) => {
            const channel = e.target.dataset.channel;
            const value = Number(e.target.value) / 100;

            document.getElementById(`vol-val-${channel}`).innerText = `${e.target.value}%`;
            setSoundSetting(channel, value);
        };
    });

    document.getElementById("backMenuFromSettings").onclick = () => {
        showMenu();
    };
}

function buildVolumeSlidersHTML(idPrefix, settings) {
    const channels = [
        { key: "master", label: "Master Volume" },
        { key: "alarm", label: "Sirens / Alarms" },
        { key: "ui", label: "UI / Ticks" },
        { key: "music", label: "Music" },
        { key: "sfx", label: "SFX" }
    ];

    let html = "";
    channels.forEach(ch => {
        const percent = Math.round(settings[ch.key] * 100);
        html += `
            <div class="settings-row">
                <label for="${idPrefix}-${ch.key}">${ch.label}</label>
                <input type="range" id="${idPrefix}-${ch.key}" min="0" max="100" value="${percent}" data-channel="${ch.key}">
                <span class="settings-value" id="${idPrefix}-val-${ch.key}">${percent}%</span>
            </div>
        `;
    });
    return html;
}



// to implement scenarios

export function showScenario() {

    let scenarioHTML = "";

    for (const key in scenarios) {

        const completed = isScenarioCompleted(key);

        let badgesHTML = "";
        tierOrder.forEach(tier => {
            const isCompleted = isScenarioTierCompleted(key, tier);
            badgesHTML += `<span class="tier-badge ${tier}${isCompleted ? " completed" : ""}" title="${tierMeta[tier].label} complete"></span>`;

        });

        scenarioHTML += `

        <div class="scenario-tile">
            <button class="scenario-select${completed ? " completed" : ""}" onclick="chooseScenario('${key}')">
                ${completed ? '<span class="flag-check">✔</span>' : ""}
                ${scenarios[key].name}
            </button>
            <div class="tier-badges">${badgesHTML}</div>
        </div>
        `;
    }

    app.innerHTML = `
        <div>
            <h1>Select Clockpocalypse</h1>

            <div class= "scenario-grid">${scenarioHTML}</div>

            <div>
                <button id= "backMenu">Back</button>
            </div>
        </div>
    `;
    document
        .getElementById("backMenu")
        .onclick = () => {
            showMenu();
        };
}



//============================================================================================================
//EDITS FOR FLAG SCREEN BEGIN HERE 
//==============================================================================================================

let openTier = "easy";
let currentScenarioKey = null;

export function loadScenarioSounds() {
    const activeEvents = getActiveEvents();

    if (activeEvents.length > 0) {
        modernChallenge = activeEvents[0];
    }

}

export function showDifficulty(scenarioKey) {

    currentScenarioKey = scenarioKey;
    openTier = "easy";

    app.innerHTML = `
        <div>
            <h1>Select Difficulty</h1>

            <div id="flags"></div>

            <div>
                <button id="backScenarioSelect">Back</button>
            </div>
        </div>
    `;

    document
        .getElementById("backScenarioSelect")
        .onclick = () => {
            showScenario();
        };

    renderFolderFlagView();
}


function flagButtonHTML(item) {
    const completed = isCountryCompleted(item.country);

    return `
        <button class="flag${completed ? " completed" : ""}" completed" : ""}" data-country="${item.country}" onclick="chooseDifficulty('${item.country}')">
            ${completed ? '<span class="flag-check">✔</span>' : ""}
            <img src="${item.image}">
            <p class="flag-name">${item.country}</p>
        </button>
    `;
}

function renderFolderFlagView() {

    const container = document.getElementById("flags");

    let foldersHTML = "";

    //new
    for (const tierKey in tierMeta) {
        const isActive = tierKey === openTier;
        foldersHTML += `
        <button class="tier-folder${isActive ? " active" : ""}" data-tier="${tierKey}" onclick="handleFolderClick(event, '${tierKey}')">
         <span class="tier-badge ${tierKey} folder-icon"></span>
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

    const button = container.querySelectorAll(".flag");

    button.forEach((btn) => {
        const country = btn.dataset.country;

        // Mouse events
        btn.addEventListener('mousedown', (event) => triviaToggle(event, country));
        btn.addEventListener('mouseup', (event) => cancelToggle(event));
        btn.addEventListener('mouseleave', (event) => cancelToggle(event));

        // Touch events
        btn.addEventListener('touchstart', (event) => triviaToggle(event, country));
        btn.addEventListener('touchend', (event) => cancelToggle(event));
        btn.addEventListener('touchcancel', (event) => cancelToggle(event));
    });

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
    loadScenarioSounds();

    app.innerHTML = `
    <div id="game-screen">

    <button id="in-game-settings" aria-label="Settings">⚙️</button>

    <div id="timer-container">

        <div id="timer">
            Time: 60
        </div>

        <div id="time-change"></div>
    </div>
    
        <div id="event-bubble">
        </div>

        <div id="in-game-settings-overlay" class="hidden"></div>

    </div>
    `
    document.getElementById("in-game-settings").onclick = () => {
        openInGameSettings();
    };
}


export function showEvents(events) {

    const container =
        document.getElementById("event-bubble");

    const existingIds = new Set(
        [...container.children].map(el => el.dataset.eventId)
    );
    const activeIds = new Set(events.map(e => String(e.id)));

    [...container.children].forEach(el => {
        if (!activeIds.has(el.dataset.eventId)) {
            if (el.dataset.eventId === String(activePlayingEventId)) {
                // If the active playing card gets removed from DOM, stop its sound
                stopGlobalAudio("REMOVED");
            }
            el.remove();
        }
    });


    events.forEach(event => {
        if (existingIds.has(String(event.id))) {
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

                        <div class="button-row">
                        <button class="complete">
                            Complete
                        </button>

                        <button class="skip">
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(notification);

        // Attach event handlers to buttons so they stop audio
        const completeBtn = notification.querySelector(".complete");
        const skipBtn = notification.querySelector(".skip");

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

            // If the event object from Events.js has the sound path:
            const soundPath = event.sound || (scenarioChallenges[event.id] && scenarioChallenges[event.id].sound);
            toggleChallengeAudio(event.id, soundPath, event.title);

            bubble.classList.toggle("expanded");
        };
    });

    function toggleChallengeAudio(eventID, soundPath, soundTitle) {
        // CASE 1: Clicking the card that is ALREADY playing -> Stop it
        if (activePlayingEventId === eventID) {
            stopGlobalAudio("TOGGLE_OFF");
            return;
        }

        // CASE 2: Clicking a NEW card (or starting from zero)
        // 1. Halt whatever was playing previously
        stopGlobalAudio("SWITCH_CHALLENGE");

        if (soundPath === "Nothing") {
            console.log(`No audio plays for event: ${soundTitle}`);
            return;
        }
        else if (!soundPath) {
            console.error(`No sound path found for event: ${soundTitle}`);
            return;
        }

        // 2. Start new audio
        // FIX: Directly spawn from the path passed from the event object
        const newAudio = new Audio(soundPath);
        newAudio.loop = true;

        const settings = loadSoundSettings();
        newAudio.volume = Math.max(0, Math.min(1, settings.master * settings.music));

        mySounds.currentActiveAudio = newAudio;
        activePlayingEventId = eventID; // Mark this card as the active player

        newAudio.play().catch(e => console.log("Playback blocked:", e));
        console.log(`Now playing loop: ${soundTitle}`);
    }
}

//Global master stop function
export function stopGlobalAudio(name) {
    activePlayingEventId = null // Clear active card reference

    if (mySounds.currentActiveAudio) {
        mySounds.currentActiveAudio.pause();
        mySounds.currentActiveAudio.currentTime = 0;
        mySounds.currentActiveAudio = null; // Clear the slot completely
        console.log("Global audio halted by, ", name);
    }
}

function openInGameSettings() {
    if (currentGameInstance) {
        currentGameInstance.pauseGame();
    }

    const settings = loadSoundSettings();
    const overlay = document.getElementById("in-game-settings-overlay");

    overlay.innerHTML = `
        <div class="settings-modal">
            <h2>Paused</h2>
            <div class="settings-list">${buildVolumeSlidersHTML("ingame", settings)}</div>
            <button id="closeInGameSettings">Resume</button>
        </div>
    `;
    overlay.classList.remove("hidden");

    overlay.querySelectorAll('input[type="range"][data-channel]').forEach(slider => {
        slider.oninput = (e) => {
            const channel = e.target.dataset.channel;
            const value = Number(e.target.value) / 100;

            document.getElementById(`ingame-val-${channel}`).innerText = `${e.target.value}%`;
            const updated = setSoundSetting(channel, value);
            applyLiveVolume(channel, updated);
        };
    });

    document.getElementById("closeInGameSettings").onclick = () => {
        closeInGameSettings();
    };
}

function closeInGameSettings() {
    const overlay = document.getElementById("in-game-settings-overlay");
    overlay.classList.add("hidden");
    overlay.innerHTML = "";

    if (currentGameInstance) {
        currentGameInstance.resumeGame();
    }
}

function applyLiveVolume(channel, settings) {
    if (!currentGameInstance) {
        return;
    }

    //sets master automatically these three are direct not multiplied
    if (channel === "master" || channel === "alarm" || channel === "ui") {
        currentGameInstance.sound.setChannelVolume(channel, settings[channel]);
    }
    // this is multiplied
    if (channel === "master" || channel === "sfx") {
        currentGameInstance.noise.applyVolume(settings);
    }

    if (channel === "master" || channel === "music") {
        if (mySounds.currentActiveAudio) {
            mySounds.currentActiveAudio.volume =
                Math.max(0, Math.min(1, settings.master * settings.music));
        }
    }
}

export function triviaToggle(event, country) {
    isHoldTrigger = false; //reset

    //No ghost clicks
    if (event.type === "touchstart") event.preventDefault();

    cancelToggle();

    const button = event.currentTarget;
    button.classList.add("is-holding");

    holdTimer = setTimeout(() => {
        button.classList.remove("is-holding");
        console.log("Hold-to-toggle activated");
        triviaPage(country);
    }, HOLD_DURATION);

}

function cancelToggle(event) {
    clearTimeout(holdTimer);
    if (event && event.currentTarget) {
        event.currentTarget.classList.remove("is-holding");
    }

}

function triviaPage(country) {
    const flagObj = difficultyFlags.find(flag => flag.country === country);
    let triviaObj = trivia[country];

    const triviaText = triviaObj

        ? triviaObj.trivia
        : "No trivia available for this country yet.";

    app.innerHTML =
        `
        <div class="trivia-container">
            <header class="trivia-header">
                <h1>Trivia Mode: ${country}</h1>
            </header>

            <main class="trivia-content">
                <div class="trivia-content-inner"> ${triviaText} </div>
            </main>
            <button id="backToDifficulty" class="btn-back">Back</button>
        </div>
    `;
    document.getElementById("backToDifficulty").onclick = () => {
        showDifficulty(currentScenarioKey);
    };
}

window.handleFolderClick = function (event, tierKey) {
    if (isHoldTrigger) {
        isHoldTrigger = false;
        return;
    }

    window.toggleFlagTier(tierKey);
};

