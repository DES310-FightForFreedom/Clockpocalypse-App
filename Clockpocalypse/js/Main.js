import {showMenu, showDifficulty, showScenario} from "./UIManager.js";
import {GameManager} from "./GameManager.js";
import { scenarios } from "./scenario.js";
import { difficulty } from "./DifficultySettings.js";

showMenu();

let selectedScenario= null; 
let selectedDifficulty= null;

window.chooseScenario = function(name){
    selectedScenario= scenarios[name];
    
    showDifficulty();

};

window.chooseDifficulty= function(level){
    selectedDifficulty = difficulty[level];

    startGame();
};

function startGame(){
    let game = new GameManager(
        selectedScenario,
        selectedDifficulty
    );

    game.start();
}

