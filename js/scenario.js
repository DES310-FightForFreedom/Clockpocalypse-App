export const scenarios = {

    darkAges: {

        name: "Dark Ages",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "What was once a typical world engulfed in shadows is now filled with brightness. The sight around you was a sight to behold.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Solar Flare",
                emoji: "🕶️",
                challenge: "Cover your eyes, or wear Sunglasses",
                defeat: "You can't see anymore!",
                sound: "Nothing"
            },

            //Challenge 2
            {
                title: "Blackout",
                emoji: "🕯️",
                challenge: "Lights Off! Phone Torches On",
                defeat: "You bump into something sharp…",
                sound: "/Sound_Effects/Light_switch.wav"

            },

            //Challenge 3
            {
                title: "Scavenging Run",
                emoji: "🏃‍➡️",
                challenge: "Find Snacks for the Group",
                defeat: "You never come back from your trip…",
                sound: "Nothing"
            },

            //Challenge 4 
            {
                title: "Banking Collapse",
                emoji: "💵🤑",
                challenge: "Everyone Put Collect a Coin",
                defeat: "Your debt catches up to you…",
                sound: "Nothing"
            },

            //Challenge 5 
            {
                title: "Out of Supplies",
                emoji: "🥫",
                challenge: "Find a tin of Food",
                defeat: "Your hunger and thirst gets the best of you…",
                sound: "Nothing"
            },

            //Challenge 6
            {
                title: "Cash in the Trash",
                emoji: "🪙",
                challenge: "Does Anyone Own Crypto?!?!", //This one feels off?
                defeat: "You fall into the bottomless trashcan…",
                sound: "Nothing"
            },

            //Challenge 7
            {
                title: "The Internet is Down",
                emoji: "☘️🍵",
                challenge: "Everyone Go Touch Grass",
                defeat: "You Lose - The Internet is Down",
                sound: "Nothing"
            },

            //Challenge 8
            {
                title: "Sewage in the Streets",
                emoji: "☢️",
                challenge: "Pinch Your Nose", // Till the end of Game?? -> Power Restored?
                defeat: "You fall into a deep and rotting abyss…",
                sound: "Nothing"
            },

            //Challenge 9
            {
                title: "Crypto Shimpto",
                emoji: "💲💎",
                challenge: "Pick a New Currency, Everyone go get one!",
                defeat: "Currency not recognized, try again.",
                sound: "Nothing"
            },

            //Challenge 10 
            {
                title: "Power Restored",
                emoji: "💡",
                challenge: "Lights on, unpinch your nose, type Google into Google",
                defeat: "Everything goes white around you…",
                sound: "/Sound_Effects/Light_switch.wav"
            }

        ]
    },

    Armageddon: {

        name: "Armegeddon",

        // IMAGES NEEDED HERE
        image: "☄️🌋",

        // EDIT FOR VICTORY STYLING HERE
        victory: "Once the dust settled, you looked around to see scorched land all around you. You survived, but the wildlife around you sure didn’t.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Meteor",
                emoji: "☄️💥",
                challenge: "Players can't look up!",
                defeat: "The last thing you saw was a fiery red rock consuming everything around your vision.",
                sound: "/Sound_Effects/MeteorFall.wav"
            },

            //Challenge 2
            {
                title: "Earthquake",
                emoji: "🫨",
                challenge: "Everyone hide under the furniture!",
                defeat: "The ground beneath you cracked, then opened up. Your foot falls in, then the rest of your body.",
                sound: "/Sound_Effects/Earthquake.wav"
            },

            //Challenge 3
            {
                title: "Volcanic Activity",
                emoji: "🌋",
                challenge: "Everyone Name a Volcano",
                defeat: "A mixture of mud and lava swept underneath you--causing you to fall face forward.",
                sound: "/Sound_Effects/Volcano_eruption.wav"
            },

            //Challenge 4 
            {
                title: "Ash Cloud",
                emoji: "☁️",
                challenge: "Everyone Hold your breath!", //How Long
                defeat: "Dust as high as a skyscraper ran towards you. Once it consumed you, your vision faded.",
                sound: "/Sound_Effects/Smoke.wav"
            },

            //Challenge 5 
            {
                title: "Aftershock",
                emoji: "🏚️",
                challenge: "Everyone Back under the Furniture",
                defeat: "The ground beneath you cracked, then opened up. Your foot falls in, then the rest of your body.",
                sound: "/Sound_Effects/Earthquake.wav"
            },

            //Challenge 6
            {
                title: "The Floor is Lava",
                emoji: "♨️",
                challenge: "THE FLOOR IS LAVA!??!",
                defeat: "Your left foot slipped--hurtling you down to the source of the unbearable heat.",
                sound: "/Sound_Effects/Lava.wav"
            },

            //Challenge 7
            {
                title: "Global Warming",
                emoji: "👕",
                challenge: "Everyone remove one item of clothing!",
                defeat: "Your vision blurred and you swore that you could see two, no--THREE suns in the sky. The last thing you could think of was 'water' before your vision faded to black.",
                sound: "None"
            },

            //Challenge 8
            {
                title: "Geo-Magnetic Storm",
                emoji: "🧭",
                challenge: "Everyone point North",
                defeat: "Physically, you felt fine. However, you would probably not feel as fine with the airplane flying downwards where you stood.",
                sound: "/Sound_Effects/MRI.wav"
            },

            //Challenge 9
            {
                title: "Weather Warning",
                emoji: "🌦️⚠️",
                challenge: "Move away from the Windows (Floor is still Lava)",
                defeat: "The window began to crack, then it exploded in several thousand pieces of glass shards. If it wasn't enough that you were getting hailed by glass, the lava underneath finished the job.",
                sound: "/Sound_Effects/Heavy_wind.wav"
            },

            //Challenge 10 
            {
                title: "Tornado",
                emoji: "🌪️",
                challenge: "Everyone spin around 5 times",
                defeat: "You tried to hold onto the ground, but found yourself flying into the sky.",
                sound: "/Sound_Effects/Tornado.wav"
            }

        ]
    },

    TheDeepState: {

        name: "The Deep State",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "The unassuming baby was a beacon of hope, casting light into the once darkened and decayed world.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "The Bees are dying",
                emoji: "🐝",
                challenge: "Everyone Smell a flower!",
                defeat: "You catch a fatal whiff of foxglove…",
                sound: "/Sound_Effects/Fairy_dust.wav"
            },

            //Challenge 2
            {
                title: "Chemtrails",
                emoji: "✈️🛸",
                challenge: "Everyone say a conspiracy theory",
                defeat: "The shadow people close in on you…",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 3
            {
                title: "They're Listening",
                emoji: "🔇🧏‍♀️",
                challenge: "Everyone Stay quiet for the rest of the game",
                defeat: "The shadow king overhears you…",
                sound: "None"
            },

            //Challenge 4 
            {
                title: "Doomsday Cult",
                emoji: "☣️🪖",
                challenge: "Pick the member most likely to join a cult!",
                defeat: "If you can't win, might as well as join the shadows.",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 5 
            {
                title: "Tinfoil Hat",
                emoji: "🧢🤖",
                challenge: "Your Leader needs a new Anti-Radiation Hat",
                defeat: "The previous you was gone, replaced by a ghoul…",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 6
            {
                title: "Prepper",
                emoji: "🧟🗺️",
                challenge: "Agree on an Apocolyptic Meeting Point",
                defeat: "Everything devolves into anarchy, with you becoming surrounded by a warlord…",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 7
            {
                title: "Fertility Crisis",
                emoji: "🤰",
                challenge: "Pick one player to be heavily pregnant",
                defeat: "You get sent away to somewhere far, far away…",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 8
            {
                title: "Get to the Bottom of this",
                emoji: "👑🗡️",
                challenge: "Find out whos really pulling the Strings",
                defeat: "The shadow king remains unfound…",
                sound: "/Sound_Effects/Dream_of_a_witch_intro.wav"
            },

            //Challenge 9
            {
                title: "The Last Generation",
                emoji: "👶🏻🐣",
                challenge: "Your pregnant team member gives birth",
                defeat: "Darkness engulfs the world…",
                sound: "/Sound_Effects/Night_on_bald_mountain_intro.wav"
            },

            //Challenge 10 
            {
                title: "With Us or Against Us",
                emoji: "👀🧸",
                challenge: "Your Cult member sacrifices the baby",
                defeat: "The baby is stolen by the shadow king…",
                sound: "/Sound_Effects/Night_on_bald_mountain_intro.wav"
            }

        ]
    },

    OverLordSupremacy: {

        name: "Overlord Supremacy",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "You've saved the world and are rewarded with 53 new countries…",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Clankers",
                emoji: "🤖",
                challenge: "Everyone Insult an AI",
                defeat: "Roko will remember this…",
                sound: "/Sound_Effects/Binary_code.wav"
            },

            //Challenge 2
            {
                title: "Robot Invasion",
                emoji: "🧠",
                challenge: "Act like Robots to Avoid detection",
                defeat: "You fail the'which image is a bus' test…",
                sound: "/Sound_Effects/Binary_code.wav"
            },

            //Challenge 3
            {
                title: "Human Uprising",
                emoji: "🤖💻",
                challenge: "Prove you're not a Robot Complete the Captcha",
                defeat: "Recaptcha verification failed, please try again.",
                sound: "/Sound_Effects/Lock_turning.wav"
            },

            //Challenge 4 
            {
                title: "Alien Invasion",
                emoji: "👽🛸",
                challenge: "Elect one of you as the leader of the new planet",
                defeat: "Disorganized, the aliens take this opportunity to fire a gigantic laser at Earth…",
                sound: "None"
            },

            //Challenge 5 
            {
                title: "Board the Mothership",
                emoji: "🛸🖖🏻",
                challenge: "Your leader needs to leave to board the Mothership",
                defeat: "The leader slips down the stairs…",
                sound: "None"
            },

            //Challenge 6
            {
                title: "World War III",
                emoji: "我喜",
                challenge: "Everyone needs to say a sentence in Mandarin",
                defeat: "You accidentally speak fluent vietnamese…",
                sound: "None"
            },

            //Challenge 7
            {
                title: "Radiation Mutation",
                emoji: "☣️",
                challenge: "Everyone pair up into Siamese twins or triplets",
                defeat: "You never did find your clone…",
                sound: "Nothing"
            },

            //Challenge 8
            {
                title: "Robot Overlords",
                emoji: "🤖👑",
                challenge: "Everyone Complement the Computers",
                defeat: "You realize that Roko's Basilisk was real all along…",
                sound: "None"
            },

            //Challenge 9
            {
                title: "World Peace",
                emoji: "✌",
                challenge: "Everyone Hold hands in a circle",
                defeat: "You send a nuke, someone sends a nuke, repeat…",
                sound: "None"
            },

            //Challenge 10 
            {
                title: "World War IIII",
                emoji: "⚔️🪖",
                challenge: "Everyone finds Sticks and Stones",
                defeat: "An empire 500 years extinct rises up from the grave and flanks you…",
                sound: "Nothing"
            }

        ]
    },

    HellAndHighWater: {

        name: "Hell and High Water",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "With that act of positive karma, the Gods of the Old decide to spare you. They, however, have left behind unfathomable destruction.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Rising Tides",
                emoji: "💧🫗",
                challenge: "Players need to drink a combined liter of Water",
                defeat: "You drowned when you could drink it?",
                sound: "Nothing"
            },

            //Challenge 2
            {
                title: "Water World",
                emoji: "🍋🥝",
                challenge: "Eat a piece of fruit to prevent scurvy",
                defeat: " Too Bad ",
                sound: "Nothing"
            },

            //Challenge 3
            {
                title: "Rescue Morale",
                emoji: "🏴‍☠️🦜",
                challenge: "Sing a Sea Shanty to raise your spirits",
                defeat: "Singing takes time I get it",
                sound: "Nothing"
            },

            //Challenge 4 
            {
                title: "Deadweight",
                emoji: "⛵",
                challenge: "Choose Someone to Toss Overboard",
                defeat: "The Door would not have supported Jack",
                sound: "Nothing"
            },

            //Challenge 5 
            {
                title: "Blasphomy",
                emoji: "👺👹",
                challenge: "Does everyone know a bad word?",
                defeat: "Your Mom is going to wash your mouth out with Soap",
                sound: "Nothing"
            },

            //Challenge 6
            {
                title: "The End is Nigh",
                emoji: "😡",
                challenge: "Every Repent of a sin",
                defeat: "YOU DID NOT REPENT",
                sound: "Nothing"
            },

            //Challenge 7
            {
                title: "Judgement Day",
                emoji: "📖📜",
                challenge: "Quote the Bible!",
                defeat: "Did you not pay attention in Sunday School?",
                sound: "Nothing"
            },

            //Challenge 8
            {
                title: "Return to the Old Gods",
                emoji: "💪",
                challenge: "Make a sacrifice",
                defeat: "The Old Gods Didnt want you anyway",
                sound: "Nothing"
            },

            //Challenge 9
            {
                title: "Leper Colony",
                emoji: "🧑‍🦽🩼",
                challenge: "Everyone lose a limb!",
                defeat: "Piece by piece, you fall apart…",
                sound: "Nothing"
            },

            //Challenge 10 
            {
                title: "Reincarnate",
                emoji: "☯️🧘",
                challenge: "Everyone improve your karma!",
                defeat: "All the sins you've committed culminate in your demise…",
                sound: "Nothing"
            }

        ]
    },

    Castaway: {

        name: "Castaway",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "The pilot saw you and descended downwards. Looking out the window, you see now how widespread the destruction was.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Get Out of Dodge",
                emoji: "🚗🚓",
                challenge: "Spot a car!",
                defeat: "Never Learned to Dodge did you",
                sound: "Nothing"
            },

            //Challenge 2
            {
                title: "Fuel Shortage",
                emoji: "🚲",
                challenge: "Spot a bicycle",
                defeat: "How would you get around in the apocalypse",
                sound: "Nothing"
            },

            //Challenge 3
            {
                title: "Last Flight to Safety",
                emoji: "✈️🛬",
                challenge: "Everyone put your phones in airplane mode",
                defeat: "There never was a safe place",
            },

            //Challenge 4 
            {
                title: "Crash Landing",
                emoji: "💥",
                challenge: "BRACE FOR IMPACT! BRACE BRACE",
                defeat: "You did not survive the crash",
            },

            //Challenge 5 
            {
                title: "Island Survival",
                emoji: "🏝️",
                challenge: "Decide who would get eaten first",
                defeat: "You all got eaten",
            },

            //Challenge 6
            {
                title: "Make a New Friend",
                emoji: "🤝🏐",
                challenge: "Choose an object to replace the eaten survivor",
                defeat: "NOT FRIENDLY",
                sound: "Nothing"
            },

            //Challenge 7
            {
                title: "Meet the Neighbors",
                emoji: "👋",
                challenge: "The eaten survivor is now a tribal native, make peace in their native tongue",
                defeat: "Peace is Overrated anyways",
            },

            //Challenge 8
            {
                title: "Look the Part",
                emoji: "💄",
                challenge: "Find some tribal markings for your native friend",
                defeat: "Cultural Appropriation? Really?",
            },

            //Challenge 9
            {
                title: "Dying of Thirst",
                emoji: "🌧️",
                challenge: "Everyone do a rain dance",
                defeat: "The Rain Gods were not impressed",
            },

            //Challenge 10 
            {
                title: "Passing Plane",
                emoji: "✈️🛬",
                challenge: "Make a giant SOS",
                defeat: "It wasnt ready in time",
                sound: "Nothing"
            }

        ]
    },

    PatientZero: {

        name: "Patient Zero",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "Miraculously, you didn't turn into a zombie. You restored the few zombies back into humans who survived it all.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Patient Zero",
                emoji: "🧟",
                challenge: "Someone develops a sickness",
                defeat: " You were all infected. It was fatal.",
            },

            //Challenge 2
            {
                title: "Infection",
                emoji: "🦠",
                challenge: "The virus spread to half the players",
                defeat: "An even worse virus spreads, not sparing the alive this time…",
            },

            //Challenge 3
            {
                title: "Pandemic",
                emoji: "😷",
                challenge: "Everyone stand 2 meters apart",
                defeat: "2 meters is 6 feet in American units",
            },

            //Challenge 4 
            {
                title: "Panic Buying",
                emoji: "🧻",
                challenge: "Find a roll of toilet paper, just in case",
                defeat: "What are we gonna do without toilet paper!",
            },

            //Challenge 5 
            {
                title: "All Sold Out",
                emoji: "🧻🍃",
                challenge: "Find an alternative toilet paper",
                defeat: "Ewwww Too bad",
            },

            //Challenge 6
            {
                title: "Mans Best Friend",
                emoji: "🐶🦴",
                challenge: "Spot a dog",
                defeat: "Thats a wolf",
            },

            //Challenge 7
            {
                title: "The Living Dead",
                emoji: "🧟‍♂️ / 🧟‍♀️",
                challenge: "Infected Players turn into slow zombies",
                defeat: "The only thing worse than being a slow zombie is being a faceless soldier of the Hivemind…",
            },

            //Challenge 8
            {
                title: "Dont get infected",
                emoji: "🧟‍♂️ / 🧟‍♀️",
                challenge: "DONT LET THE ZOMBIES TOUCH YOU", // move this higher?  
                defeat: "The last thing you remember is a thirst for meat…",
            },

            //Challenge 9
            {
                title: "Abandoned Pharmacy",
                emoji: "🏥",
                challenge: "Get on the other side of the door!",
                defeat: "Long story short, you never found the cure.",
            },

            //Challenge 10 
            {
                title: "Find the Cure",
                emoji: "🧪",
                challenge: "Find the Cure and drink it.",
                defeat: "That was poison",
            }

        ]
    },

    TimeTravel: {

        name: "Time Travel",

        // IMAGES NEEDED HERE
        image: "PNG here",

        // EDIT FOR VICTORY STYLING HERE
        victory: "With the world being colder and thrown into anarchy, now is the time for the Ape to rule.",

        // EDIT FOR LOSS WORDING HERE (Specific to scenario?) Changed to be specific to challenges, not scenario.
        // defeat: "You Lose!",

        //Ensure 10 events
        events: [

            // Challenge 1
            {
                title: "Cold War",
                emoji: "❄️🔴",
                challenge: "Touch a glowing object!",
                defeat: "You realize living in here and now is better.",
                sound: "Nothing"
            },

            //Challenge 2
            {
                title: "Lab Breach",
                emoji: "👺",
                challenge: "Press a red button!",
                defeat: "You never did release the Yeti, starting global warming…",
                sound: "Nothing"
            },

            //Challenge 3
            {
                title: "Global Cooling",
                emoji: "🥶",
                challenge: "Find another item of clothing to wear",
                defeat: "You can't feel your hands anymore as the rest of your body freezes.",
                sound: "Nothing"
            },

            //Challenge 4 
            {
                title: "Winter is Coming",
                emoji: "❄️❄️",
                challenge: "Find a lighter",
                defeat: "Who knew shivering would be so deadly?",
                sound: "Nothing"
            },

            //Challenge 5 
            {
                title: "Jurassic Planet",
                emoji: "🦖",
                challenge: "Everyone name a dinosaur",
                defeat: "Unlike a dinosaur, you perish due to being warm blooded…",
                sound: "Nothing"
            },

            //Challenge 6
            {
                title: "Dawn of the Planet of the Apes",
                emoji: "🦍 🌙",
                challenge: "Act like an ape to blend in",
                defeat: "King Simius sees through your disguise…",
                sound: "Nothing"
            },

            //Challenge 7
            {
                title: "Rise of the Planet of the Apes",
                emoji: "🦍 ☀️",
                challenge: "Groom each other",
                defeat: "Queen Simias is offended and decides your head would make a good tribute.",
                sound: "Nothing"
            },

            //Challenge 8
            {
                title: "War for the planet of the Apes",
                emoji: "🦍 ⭐️",
                challenge: "Split into two warring ape troops",
                defeat: "Death by Guerilla Warfare.",
                sound: "Nothing"
            },

            //Challenge 9
            {
                title: "Apes Strong Together",
                emoji: "🫂",
                challenge: "Make peace",
                defeat: "King Simius fires a fatal bullet from his pistol.",
                sound: "Nothing"
            },

            //Challenge 10 
            {
                title: "Red Missle Crisis",
                emoji: "🚀",
                challenge: "Press a blue button!",
                defeat: "Your restraint makes you like Arkhipov and saves the world...",
                sound: "Nothing"
            }

        ]
    },

}