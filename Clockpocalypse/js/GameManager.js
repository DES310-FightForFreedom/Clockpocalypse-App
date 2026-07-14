import { TimerSettings } from "./TimerSettings.js";
import { Events } from "./Events.js";
import { showScenario, showDifficulty, goToScenarioSelection, showEvents, showGameScreen } from "./UIManager.js";
import { SoundManager } from "./SoundManager.js";
import { sound_effects } from "./sound_effects.js";

export class GameManager {

    constructor(
        scenario,
        difficulty,
        country

    ) {

        this.scenario = scenario
        this.difficulty = difficulty
        this.country = country
        this.sound = new SoundManager();
        this.noise = new sound_effects(); //sound effect = noise

        this.siren = null

        this.gameOver = false

        this.timer = new TimerSettings(difficulty.startTime, this.sound);

        this.events = new Events(scenario.events);
        this.spawnTimer = null;
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

    // OLD_displayEvent() {

    //     if (this.gameOver) {
    //         return;
    //     }

    //     let event = this.currentEvent;

    //     if (!event) {
    //         this.winGame();
    //         return;
    //     }


    //     document.getElementById("app").innerHTML = `

    //     <h1>${this.scenario.name}</h1>

    //     <h2>${event.title}</h2>
    //     <p>${event.challenge}</p>

    //     <button id="complete">
    //         Complete
    //     </button>

    //     <button id="skip">
    //         Pass
    //     </button>

    //     <h3 id="timer">
    //         Time: ${this.timer.time}
    //     </h3>
    // `;
    //     // Complete event or Skip button framework

    //     document
    //         .getElementById("complete")
    //         .onclick = () => {

    //             if (this.gameOver) {
    //                 return;
    //             }

    //             this.completeEvent(
    //                 this.currentEvent
    //             );
    //             this.noise.play('complete');
    //             this.nextEvent();
    //         };

    //     document
    //         .getElementById("skip")
    //         .onclick = () => {

    //             if (this.gameOver) {
    //                 return;
    //             }

    //             this.skipEvent(
    //                 this.currentEvent
    //             );
    //             this.noise.play('skip');
    //             this.nextEvent();
    //         };
    // }


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

        this.timer.stop();

        this.sound.resetSiren();

        this.noise.play('victory');

        document.getElementById("app").innerHTML = `

        <h1 class="victory_screen"> You Survived! </h1>
        <h2 class="victory_screen" id="victory-line">${this.scenario.victory}</h2>
        

        <button id="backScenario">
            New Scenario
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
        }

        this.timer.stop();
        this.sound.resetSiren();
        this.noise.play('fail');

        const event = failedEvent ?? this.events.active[0];

        document.getElementById("app").innerHTML = `

    <h1 class="lose_screen">${event?.title ?? "Game Over"}</h1>
    <h2 class="lose_screen">${event?.defeat} </h2>
    <h2 class="lose_screen">You Lose!</h2>
    <h3 class="lose_screen"> The Clockpocalypse Wins </h3> 

    <button id="restart"> 
        Restart
    </button>

    <button id="backScenario">
        New Scenario
    </button>
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
    }



    completeEvent(event) {

        this.events.complete(event);

        this.timer.add(
            this.difficulty.reward
        );
    }

    skipEvent(event) {
        const isLastEvent =
            this.events.active.length === 1 &&
            this.events.currentIndex >= this.events.pool.length;

        this.events.complete(event);
        this.timer.remove(
            this.difficulty.penalty
        );

        if (this.timer.time <= 0) {
            this.loseGame(event);
            return;
        }
    }

    resetGame() {

        this.gameOver = false;

        this.events = new Events(this.scenario.events);

        this.timer = new TimerSettings(
            this.difficulty.startTime,
            this.sound
        );
        this.currentEvent = null;

    }

    cleanrestart() {

        this.gameOver = true;

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


}
