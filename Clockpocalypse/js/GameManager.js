import {TimerSettings} from "./TimerSettings.js";
import {Events} from "./Events.js";

export class GameManager{

constructor(
    scenario,
    difficulty
    
){

this.scenario=scenario
this.difficulty=difficulty

this.gameOver=false

this.timer=new TimerSettings(difficulty.startTime);

this.events= new Events(scenario.events);
}

start(){
    console.log(
        "Begin the Clockpocalypse",
        this.scenario.name
    );

    this.currentEvent= this.events.spawn();

    this.displayEvent();

    this.timer.start(
        (time)=>{
            
            let timerDisplay = 
            document.getElementById("timer");

            if(timerDisplay){
                timerDisplay.innerText = 
                "Time: " + time;
            }
        },
        ()=>{
            this.loseGame();
        }
    );
}

displayEvent(){

    if(this.gameOver){
        return;
    }

    let event = this.currentEvent;

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
    .onclick = ()=>{

        if(this.gameOver){
            return;
        }

        this.completeEvent(
            this.currentEvent
        );
        this.nextEvent();
    };

    document
    .getElementById("skip")
    .onclick = ()=>{

        if(this.gameOver){
            return;
        }

        this.skipEvent(
            this.currentEvent
        );
        this.nextEvent();
    };
}


nextEvent(){

    if(this.gameOver){
        return;
    }

    this.currentEvent =
    this.events.spawn();

    if(!this.currentEvent){

        this.timer.stop();

        document.getElementById("app").innerHTML = `

        <h1>${this.scenario.victory}</h1>
        <h2> You Survived! </h2>
        `;

        return;
    }

        this.displayEvent();
}

loseGame(){

    this.gameOver = true;
    this.timer.stop();

    document.getElementById("app").innerHTML =`

    <h1>${this.scenario.defeat}</h1>
    <h2> The Clockpocalypse Wins </h2>

    <button onclick="location.reload()">
    Try Again
    </button>
    `;
}



completeEvent(event){
    
    this.events.complete(event);

    this.timer.add(
        this.difficulty.reward
    );
}

skipEvent(event){

    this.events.complete(event);

    this.timer.remove(
        this.difficulty.penalty
    );
    if(this.timer.time <=0){
        this.loseGame();
        return;
    }
}

}
