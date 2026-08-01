import { showMenu, showDifficulty, showScenario, stopGlobalAudio } from "./UIManager.js";
import { GameManager } from "./GameManager.js";
import { scenarios } from "./scenario.js";
import { difficulty } from "./DifficultySettings.js";
import { difficultyFlags } from "./DifficultySettings.js";
import { trivia } from "./Trivia.js";
import { sound_effects } from "./sound_effects.js";

export let selectCountry;

showMenu();

let selectedScenario = null;
let selectedDifficulty = null;
let selectedFlag = null;
let selectedScenarioKey = null;
let activeDifficultyCountry = null;
const difficultyAudioPlayer = new sound_effects();

window.chooseScenario = function (name) {
    stopGlobalAudio("SCENARIO_CHANGED");
    selectedScenario = scenarios[name];
    selectedScenarioKey = name;

    if (!selectedScenario) {
        console.error("Scenario not found:", name);
        return;
    }
    showDifficulty(name);
};


window.chooseDifficulty = function (country) {
    selectedFlag = difficultyFlags.find(flag => flag.country === country);

    if (!selectedFlag) {
        console.error("Flag not found:", country);
        return;
    }

    selectCountry = selectedFlag;
    const myCountry = selectCountry.country;

    selectedDifficulty = difficulty[selectedFlag.level];

    if (!selectedDifficulty) {
        console.error("Difficulty not found:", selectedFlag.level);
        return;
    }

    const triviaTarget = document.getElementById("trivia-target");
    const triviaContainer = triviaTarget?.closest(".trivia-container");

    if (activeDifficultyCountry === country && triviaContainer?.classList.contains("active")) {
        stopGlobalAudio("TOGGLE_OFF");
        if (triviaTarget) {
            triviaTarget.innerHTML = "";
        }
        triviaContainer.classList.remove("active");
        activeDifficultyCountry = null;
        return;
    }

    stopGlobalAudio("SWITCH_FLAG");

    if (triviaTarget) {
        const triviaText = trivia[myCountry]?.trivia || "No trivia available for this country.";
        triviaTarget.innerHTML = `
<div class="trivia-overlay">
<p>${triviaText}</p>
</div>

<button id="trivia-button" onclick="startGame()">Start Game</button>
`;

        difficultyAudioPlayer.playTrivia(country, false);

        if (triviaContainer) {
            triviaContainer.classList.add("active");
        }
    }

    activeDifficultyCountry = country;
}


function startGame() {
    stopGlobalAudio("START_GAME");

    let game = new GameManager(
        selectedScenario,
        selectedDifficulty,
        selectedFlag,
        selectedScenarioKey
    );

    game.start();
}

window.startGame = startGame;

