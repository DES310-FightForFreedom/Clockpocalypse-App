const app = document.getElementById("app");

export function showMenu(){

    app.innerHTML = `
        
        <div>
            <h1>Clockpocalypse</h1>

            <button id="start">Start</button>

            <button id="settings">Settings</button>

        </div>
    `;

document
    .getElementById("start")
    .onclick = () => {
        showScenario();
    };


document
    .getElementById("settings")
    .onclick = ()=>{
        console.log("Settings clicked");
    };
}

// to implement scenarios

export function showScenario(){
    app.innerHTML =`

    <div>

        <h1>Select Scenario</h1>


            <button onclick="chooseScenario('darkAges')">

                Dark Ages

            </button>

            // ADD BUTTONS HERE FOR ALL SCENARIOS 

        </div>

    `;
}

// to implement difficulty
// to be updated later by PNG and Audio files. 

export function showDifficulty(){

    app.innerHTML = `

        <div>

            <h1>Select Difficulty</h1>


            <button onclick="chooseDifficulty('easy')">

                Easy

            </button>


            <button onclick="chooseDifficulty('medium')">

                Medium

            </button>


            <button onclick="chooseDifficulty('hard')">

                Hard

            </button>


        </div>

    `;

}