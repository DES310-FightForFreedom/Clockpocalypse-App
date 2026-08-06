import { TimerSettings } from "./TimerSettings.js";
import { Events } from "./Events.js";
import {
    showScenario, showEvents, showGameScreen, addCompletedMiniChallenge,
    resetMiniChallenges
} from "./UIManager.js";
import { SoundManager } from "./SoundManager.js";
import { sound_effects } from "./sound_effects.js";
import { markCompleted } from "./ProgressTracker.js";

import { stopGlobalAudio } from "./UIManager.js";

export let userScenario = null;
export let currentChallenge;
export let scenarioChallenges;
export let currentScenario;
export let currentGameInstance = null;

//Helper functions for the animations
function explodeTimer(onFail) {
    const timerDisplay = document.getElementById("timer");

    if (!timerDisplay) {
        if (onFail) onFail();
        return;
    }


    const text = timerDisplay.textContent.trim();
    timerDisplay.innerHTML = "";

    console.log("Exploding timer text: ", text);

    //Wrap each character (including spaces) in a span
    const letterSpans = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add("char");
        timerDisplay.appendChild(span);
        return span;
    });

    //Assign random explosion physics vector variables to each letter
    letterSpans.forEach((span) => {
        const x = (Math.random() - 0.5) * 250 + "px"; // Blow out left/right
        const y = (Math.random() - 0.5) * 250 + "px"; // Blow out up/down
        const rotate = (Math.random() - 0.5) * 540 + "deg"; // Spin up to 1.5 rotations
        const scale = 1.2 + Math.random() * 0.8;

        span.style.setProperty("--x", x);
        span.style.setProperty("--y", y);
        span.style.setProperty("--rotate", rotate);
        span.style.setProperty("--scale", scale);

        // Trigger animation, force browser
        void span.offsetWidth; // Force CSS reflow
        span.classList.add("explode-letter");
    });

    //Delay long enough for the visual burst to play before wiping innerHTML
    setTimeout(() => {
        if (onFail) onFail();
    }, 450); // Matches ~0.5s CSS animation speed
}

function rainTimer(onComplete) {
    const timerDisplay = document.getElementById("timer");

    if (!timerDisplay) {
        if (onComplete) onComplete();
        return;
    }

    const text = timerDisplay.textContent.trim();
    timerDisplay.innerHTML = "";

    console.log("Rain timer text: ", text);

    //Wrap each character (including spaces) in a span
    const letterSpans = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add("char");
        timerDisplay.appendChild(span);
        return span;
    });

    //Assign random explosion physics vector variables to each letter
    letterSpans.forEach((span) => {
        const x = (Math.random() - 0.5) * 550 + "px"; // Blow out left/right
        const y = (Math.random() - 0.01) * 1900 + "px"; // Blow down far
        const rotate = (Math.random() - 0.5) * 340 + "deg"; // 
        const scale = 1.2 + Math.random() * 0.8;

        span.style.setProperty("--x", x);
        span.style.setProperty("--y", y);
        span.style.setProperty("--rotate", rotate);
        span.style.setProperty("--scale", scale);

        // Trigger animation, force browser
        void span.offsetWidth; // Force CSS reflow
        span.classList.add("rain-letter");
    });

    //Delay long enough for the visual burst to play before wiping innerHTML
    setTimeout(() => {
        if (onComplete) onComplete();
    }, 450); // Matches ~0.5s CSS animation speed
}

function typeWriterEffect(elementId, text, speed = 80) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = "";
    let index = 0;

    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, speed); // Speed in ms per character (80ms = consistent typing speed)
        }
    }

    typeNextChar();
}

export class GameManager {

    constructor(
        scenario,
        difficulty,
        country,
        scenarioKey
    ) {

        this.scenario = scenario
        this.difficulty = difficulty
        this.country = country
        this.sound = new SoundManager();
        this.noise = new sound_effects(); //sound effect = noise
        this.siren = null
        this.gameOver = false
        this.events = new Events(scenario.events);
        scenarioChallenges = this.events.pool;
        this.spawnTimer = null;
        this.scenarioKey = scenarioKey;

        currentChallenge = null;
        currentScenario = this.scenario;
        currentGameInstance = this;
        window.debugGame = this;  //Temporary 

        userScenario = this.scenario.name

        this.timer = new TimerSettings(
            difficulty.startTime,
            this.sound,
            (time) => {
                const timerDisplay = document.getElementById("timer");

                if (!timerDisplay) {
                    return;
                }
                timerDisplay.classList.remove(
                    "timer-tick",
                    "timer-warning",
                    "timer-critical"
                );
                void timerDisplay.offsetWidth;

                if (time <= 10) {
                    timerDisplay.classList.add(
                        "timer-critical"
                    );
                }
                else if (time <= 30) {
                    timerDisplay.classList.add(
                        "timer-warning"
                    );
                }
                else {
                    timerDisplay.classList.add(
                        "timer-tick"
                    );
                }
            });

    }

    start() {
        console.log(
            "Begin the Clockpocalypse",
            this.scenario.name
        );

        resetMiniChallenges(); // Clear previous game icons

        showGameScreen(() => {
            // Any initialization code that needs to run after the game screen is shown
        
        let firstEvent = this.events.spawn();

        if (!firstEvent) {
            this.winGame();
            return;
        }

        showEvents(this.events.active);

        this.setupEventButtons();
        this.loadCountrySound();
        this.startEventSpawner();

        this.timer.start(
            (time) => {

                console.log("Ui updated with time:", time);

                let timerDisplay =
                    document.getElementById("timer");

                if (timerDisplay) {
                    timerDisplay.innerText =
                        "Time: " + time;
                }
            },
            () => {
                this.loseGame();
            }
        );
        });
    }

    async loadCountrySound() {

        //Check sirens location call
        console.log("Loading country sound for", this.country);

        if (!this.country) {
            return;
        }

        await this.sound.load("siren", this.country.siren);

        this.siren = await this.sound.play("siren", true);
    }

    winGame() {

        if (this.gameOver) {
            return;
        }

        if (
            !(this.events.active.length === 0 &&
                this.events.currentIndex >= this.events.pool.length)
        ) {
            return;
        }

        this.gameOver = true;
        resetMiniChallenges(); // Reset state on game end
        markCompleted(this.scenarioKey, this.country?.country, this.country?.level);

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        this.timer.stop();

        this.sound.resetSiren();

        this.noise.play('victory');

        stopGlobalAudio("win");
        rainTimer(() => {
            const victoryMessage = this.scenario.victory;
            const charCount = victoryMessage.length;

            document.getElementById("app").innerHTML = `

        <h1 class="victory_screen"> You Survived! </h1>
        <h2 class="typewriter-container is-victory" id="victory-line">${victoryMessage}</h2>
        

        <button id="backScenario">
            New Clockpocalypse
        </button>

        `;
            typeWriterEffect("victory-line", victoryMessage, 80);

            document
                .getElementById("backScenario")
                .onclick = () => {
                    this.cleanrestart();
                    showScenario();
                };
            return;
        });
    };



    loseGame(failedEvent = null) {

        if (this.gameOver) {
            return;
        }
        console.log("LOSE GAME CALLED")
        this.gameOver = true;
        resetMiniChallenges(); // Reset state on game end

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        this.timer.stop();
        this.sound.resetSiren();
        this.noise.play('fail');

        const event = failedEvent ?? this.events.active[0];

        explodeTimer(() => {
            // This callback runs AFTER the 450ms explosion finishes:

            const defeatMessage = event?.defeat ?? "Game Over";
            const charCount = defeatMessage.length;

            document.getElementById("app").innerHTML = `

        <div class="loseScreen">

            <h1 class="lose_screen">${event?.title ?? "Game Over"}</h1>
            <h2 class="typewriter-container is-lose" id="lose-line">${defeatMessage}</h2>
        
            <button id="restart"> 
                Restart
            </button>

            <button id="backScenario">
                New Clockpocalypse
            </button>
        </div>
            `;

            typeWriterEffect("lose-line", defeatMessage, 80);

            document
                .getElementById("restart")
                .onclick = () => {

                    this.resetGame();
                    this.start();
                };

            document
                .getElementById("backScenario")
                .onclick = () => {
                    this.cleanrestart();
                    showScenario();
                };
            stopGlobalAudio("lose");
        });
    }

    displayEndMessage(elementId, messageText, isVictory) {
        const targetElement = document.getElementById(elementId);
        const charCount = messageText.length;

        targetElement.textContent = messageText;

        targetElement.style.width = `${charCount}ch`;

        targetElement.className = `cursor typewriter-animation ${isVictory ? 'is-victory' : 'is-lose'}`;

        targetElement.style.animationTimingFunction = `steps(${charCount}), step-end`;
    }

    completeEvent(event) {
        //work here
        this.events.complete(event);

        this.timer.add(
            this.difficulty.reward
        );

        this.showTimeChange(
            this.difficulty.reward
        );
        // Push mini challenge icon on successful completion
        addCompletedMiniChallenge(event.emoji);

        stopGlobalAudio("complete");
    }

    skipEvent(event) {
        const isLastEvent =
            this.events.active.length === 1 &&
            this.events.currentIndex >= this.events.pool.length;

        this.events.complete(event);
        this.timer.remove(
            this.difficulty.penalty
        );

        this.showTimeChange(
            -this.difficulty.penalty
        );

        if (this.timer.time <= 0) {
            this.loseGame(event);
            return;
        }
        stopGlobalAudio("skip");
    }

    pauseGame() {
        if (this.gameOver) {
            return;
        }
        this.timer.pause();
    }

    resumeGame() {
        if (this.gameOver) {
            return;
        }
        this.timer.resume();
    }

    resetGame() {

        this.gameOver = false;
        this.events = new Events(this.scenario.events);
        scenarioChallenges = this.events.pool;
        this.timer = new TimerSettings(
            this.difficulty.startTime,
            this.sound,
            () => {
                const timerDisplay = document.getElementById("timer");

                if (timerDisplay) {
                    timerDisplay.classList.remove("timer-tick");

                    void timerDisplay.offsetWidth;
                    timerDisplay.classList.add("timer-tick");
                }
            });
        this.currentEvent = null;

    }

    cleanrestart() {

        this.gameOver = true;

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        if (this.timer) {
            this.timer.stop();
        }

        if (this.sound) {
            this.sound.resetSiren();
        }

        const app = document.getElementById("app");
        if (app) {
            app.innerHTML = "";
        }

        this.currentEvent = null;
    }

    setupEventButtons() {

        const container =
            document.getElementById("event-bubble");
        if (!container) {
            return;
        }

        container.onclick = null;
        container.onclick = (click) => {

            if (click.target.classList.contains("complete")) {
                click.stopPropagation();

                const notification =
                    click.target.closest(".notification");

                const eventID =
                    Number(notification.dataset.eventId);

                const selectedEvent =
                    this.events.active.find(
                        event => event.id === eventID
                    );

                if (selectedEvent) {

                    this.completeEvent(selectedEvent);
                    this.noise.play('complete');
                    this.ensureActiveEvent(true);

                }
            }

            if (click.target.classList.contains("skip")) {
                click.stopPropagation();

                const notification =
                    click.target.closest(".notification");

                const eventID =
                    Number(notification.dataset.eventId)

                const selectedEvent =
                    this.events.active.find(
                        event => event.id === eventID
                    );

                if (selectedEvent) {

                    this.skipEvent(selectedEvent);
                    this.noise.play('skip');
                    this.ensureActiveEvent(true);
                }

            };
        }
    }
    startEventSpawner() {

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        const spawnDelay = () => {

            let time =
                Math.floor(
                    Math.random() * (20000 - 10000) + 10000
                );

            this.spawnTimer = setTimeout(() => {
                console.log("Spawn Timer Fired")
                if (this.gameOver) {
                    return;
                }


                if (this.events.active.length < 3) {

                    let event =
                        this.events.spawn();
                    if (event) {
                        console.log("Active Events", this.events.active);

                        showEvents(
                            this.events.active
                        );
                        this.setupEventButtons();
                    }
                }

                spawnDelay();
            }, time);
        };
        spawnDelay();
    };

    ensureActiveEvent(force = false) {
        if (this.gameOver) {
            return;
        }

        if (
            this.events.active.length === 0 &&
            this.events.currentIndex >= this.events.pool.length
        ) {
            this.winGame();
            return;
        }

        if (force && this.events.active.length === 0) {
            const newEvent = this.events.spawn();

            if (newEvent) {
                console.log("Replace Event:",
                    newEvent
                );

            }
        }
        showEvents(this.events.active);
        this.refreshEvents();
    }

    refreshEvents() {

        showEvents(this.events.active);

        this.setupEventButtons();

    }

    showTimeChange(amount) {

        const container =
            document.getElementById("time-change");

        if (!container) {
            return;
        }

        const change =
            document.createElement("div");
        if (amount > 0) {
            change.className = "time-positive";
            change.innerText = `+${amount} sec`;
        }
        else {
            change.className = "time-negative";
            change.innerText = `${amount} sec`;
        }

        container.appendChild(change);
        setTimeout(() => {
            change.remove();
        }, 1000);
    }
}


