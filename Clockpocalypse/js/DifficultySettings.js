export const difficulty = {

    //Do not change this name to themed name
    easy: {

        // change this one to the themed name
        name: "Easy",
        startTime: 60,
        reward: 20,
        penalty: 10,
    },

    medium: {

        name: "Medium",
        startTime: 60,
        reward: 15,
        penalty: 15,
    },

    hard: {

        name: "Hard",
        startTime: 60,
        reward: 10,
        penalty: 20,
    },

    ultraHard: {
        name: "Ultra Hard",
        startTime: 30,
        reward: 5,
        penalty: 25,
    }


};

export const difficultyFlags = [
    //Easy 
    { country: "Japan", level: "easy", image: "./assets/Japan_Flag.png", siren: "/AirRaid_Sounds/Japan_Siren.wav" },
    { country: "Denmark", level: "easy", image: "./assets/Denmark_Flag.png", siren: "/AirRaid_Sounds/Denmark_Siren.wav " },
    { country: "Finland", level: "easy", image: "./assets/Finland_Flag.png", siren: "/AirRaid_Sounds/Finland_Siren.wav" },

    //Medium
    { country: "Mexico", level: "medium", image: "./assets/Mexico_Flag.png", siren: "/AirRaid_Sounds/Mexico_Siren.wav" },
    { country: "Germany", level: "medium", image: "./assets/Germany_Flag.png", siren: "/AirRaid_Sounds/Germany_Siren.wav" },
    { country: "Bulgaria", level: "medium", image: "./assets/Bulgaria_Flag.png", siren: "/AirRaid_Sounds/Bulgaria_Siren.wav" },
    { country: "United States", level: "medium", image: "./assets/USA_Flag.png", siren: "/AirRaid_Sounds/USA_Siren.wav" },
    { country: "Russia", level: "medium", image: "./assets/Russia_Flag.png", siren: "/AirRaid_Sounds/Russia_Siren.wav" },
    { country: "Saudi Arabia", level: "medium", image: "./assets/Saudi_Arabia_Flag.png", siren: "/AirRaid_Sounds/Saudi_Arabia_Siren.wav" },

    //Hard
    { country: "United Kingdom", level: "hard", image: "./assets/United_Kingdom_Flag.png", siren: "/AirRaid_Sounds/United_Kingdom_Siren.wav" },
    { country: "Australia", level: "hard", image: "./assets/Australia_Flag.png", siren: "/AirRaid_Sounds/Australia_Siren.wav" },
    { country: "Canada", level: "hard", image: "./assets/Canada_Flag.png", siren: "/AirRaid_Sounds/Canada_Siren.wav" },
    { country: "China", level: "hard", image: "./assets/China_Flag.png", siren: "/AirRaid_Sounds/China_Siren.wav" },

    //Ultra Hard
    { country: "New Zealand", level: "ultraHard", image: "./assets/New_Zealand_Flag.png", siren: "/AirRaid_Sounds/New_Zealand_Siren.wav" },
    { country: "Iran", level: "ultraHard", image: "./assets/Iran_Flag.png", siren: "/AirRaid_Sounds/Iran_Siren.wav" },
]
