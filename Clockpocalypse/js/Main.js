import {showMenu, showDifficulty, showScenario} from "./UIManager.js";
import {GameManager} from "./GameManager.js";
import { scenarios } from "./scenario.js";
import { difficulty } from "./DifficultySettings.js";
import {difficultyFlags} from "./DifficultySettings.js";

showMenu();

let selectedScenario= null; 
let selectedDifficulty= null;
let selectedFlag= null;

window.chooseScenario = function(name){
    selectedScenario= scenarios[name];
    
    if(!selectedScenario){
        console.error("Scenario not found:", name);
        return;
    }
    showDifficulty();
};


window.chooseDifficulty= function(country){

    selectedFlag = difficultyFlags.find(flag => flag.country === country);

    if(!selectedFlag){
        console.error("Flag not found:", country);
        return;
    }

    selectedDifficulty = difficulty[selectedFlag.level];
    
    if(!selectedDifficulty){
        console.error("Difficulty not found:", selectedFlag.level);
        return;
    }
    startGame();
};


function startGame(){
    let game = new GameManager(
        selectedScenario,
        selectedDifficulty,
        selectedFlag
    );

    game.start();
}




