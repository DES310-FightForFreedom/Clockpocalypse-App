import { TimerSettings } from "./TimerSettings.js";
import { Events } from "./Events.js";
import { showScenario, showDifficulty, goToScenarioSelection } from "./UIManager.js";
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
    }

    start() {
        console.log(
            "Begin the Clockpocalypse",
            this.scenario.name
        );

        this.currentEvent = this.events.spawn();

        if (!this.currentEvent) {
            this.winGame();
            return;
        }

        this.displayEvent();
        this.loadCountrySound();

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

    displayEvent() {

        if (this.gameOver) {
            return;
        }

        let event = this.currentEvent;

        if (!event) {
            this.winGame();
            return;
        }


        document.getElementById("app").innerHTML = `

        <h1>${this.scenario.name}</h1>

        <h2>${event.title}</h2>
        <p>${event.challenge}</p>

        <button id="complete">
            Complete
        </button>

        <button id="skip">
            Pass
        </button>

        <h3 id="timer">
            Time: ${this.timer.time}
        </h3>
    `;
        // Complete event or Skip button framework

        document
            .getElementById("complete")
            .onclick = () => {

                if (this.gameOver) {
                    return;
                }

                this.completeEvent(
                    this.currentEvent
                );
                this.noise.play('complete');
                this.nextEvent();
            };

        document
            .getElementById("skip")
            .onclick = () => {

                if (this.gameOver) {
                    return;
                }

                this.skipEvent(
                    this.currentEvent
                );
                this.noise.play('skip');
                this.nextEvent();
            };
    }


    nextEvent() {

        if (this.gameOver) {
            return;
        }

        this.currentEvent =
            this.events.spawn();

        if (!this.currentEvent) {

            this.gameOver = true;

            this.timer.stop();

            this.sound.resetSiren();

            this.noise.play('victory');

            document.getElementById("app").innerHTML = `

        <h1 class="victory_screen" id="victory-line">${this.scenario.victory}</h1>
        <h2 class="victory_screen"> You Survived! </h2>
        

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
        }
        this.displayEvent();
    }

    loseGame() {

        this.gameOver = true;
        this.timer.stop();
        this.sound.resetSiren();
        this.noise.play('fail');

        document.getElementById("app").innerHTML = `

    <h1>${this.currentEvent.title ?? "Game Over"}</h1>
    <h2>You Lose!</h2>
    <h3>${this.currentEvent.defeat} </h3>
    <h4> The Clockpocalypse Wins </h4> 

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

        this.events.complete(event);

        this.timer.remove(
            this.difficulty.penalty
        );
        if (this.timer.time <= 0) {
            this.loseGame();
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

}
