import { TimerSettings } from "./TimerSettings.js";
import { Events } from "./Events.js";
import { showScenario, showEvents, showGameScreen } from "./UIManager.js";
import { SoundManager } from "./SoundManager.js";
import { sound_effects } from "./sound_effects.js";
import { markCompleted } from "./ProgressTracker.js";

import { stopGlobalAudio } from "./UIManager.js";

export let userScenario = null;
export let currentChallenge;
export let scenarioChallenges;
export let currentScenario;
export let currentGameInstance= null;

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

        showGameScreen();

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
        markCompleted(this.scenarioKey, this.country?.country, this.country?.level);

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        this.timer.stop();

        this.sound.resetSiren();

        this.noise.play('victory');

        stopGlobalAudio("win");

        document.getElementById("app").innerHTML = `

        <h1 class="victory_screen"> You Survived! </h1>
        <h2 class="victory_screen" id="victory-line">${this.scenario.victory}</h2>
        

        <button id="backScenario">
            New Clockpocalypse
        </button>

        `;

        document
            .getElementById("backScenario")
            .onclick = () => {
                this.cleanrestart();
                showScenario();
            };
        return;
    };


    loseGame(failedEvent = null) {

        if (this.gameOver) {
            return;
        }
        console.log("LOSE GAME CALLED")
        this.gameOver = true;

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        this.timer.stop();
        this.sound.resetSiren();
        this.noise.play('fail');

        const event = failedEvent ?? this.events.active[0];

        document.getElementById("app").innerHTML = `

        <div class="loseScreen">

            <h1 class="lose_screen">${event?.title ?? "Game Over"}</h1>
            <h2 class="lose_screen">${event?.defeat} </h2>
        
            <button id="restart"> 
                Restart
            </button>

            <button id="backScenario">
                New Clockpocalypse
            </button>
        </div>
            `;

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
    }



    completeEvent(event) {

        this.events.complete(event);

        this.timer.add(
            this.difficulty.reward
        );

        this.showTimeChange(
            this.difficulty.reward
        );
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

    pauseGame(){
        if (this.gameOver) {
            return;
        }
        this.timer.pause();
    }
    
    resumeGame(){
        if (this.gameOver){
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
