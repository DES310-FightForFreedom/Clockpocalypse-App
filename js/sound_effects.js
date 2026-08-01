import { loadSoundSettings } from "./SoundManager.js";

let activeSirenAudio = null;

export function stopActiveSirenAudio(reason = "global") {
    if (!activeSirenAudio) {
        return;
    }

    try {
        activeSirenAudio.pause();
        activeSirenAudio.currentTime = 0;
    } catch (error) {
        console.warn("Unable to stop active siren audio:", error);
    }

    activeSirenAudio = null;
    console.log("Siren audio stopped by", reason);
}

export class sound_effects {
    constructor() {
        this.tracks = {
            complete: new Audio('./Sound_Effects/CompleteV2.wav?' + new Date().getTime()),
            fail: new Audio('./Sound_Effects/FailV2.wav?' + new Date().getTime()),
            skip: new Audio('./Sound_Effects/SkipV2.wav?' + new Date().getTime()),
            victory: new Audio('./Sound_Effects/VictoryV2.wav?' + new Date().getTime())
        };

        this.sirenTracks = {
            Japan: new Audio('./AirRaid_Sounds/Japan_Siren.wav?' + new Date().getTime()),
            Denmark: new Audio('./AirRaid_Sounds/Denmark_Siren.wav?' + new Date().getTime()),
            Finland: new Audio('./AirRaid_Sounds/Finland_Siren.wav?' + new Date().getTime()),
            Mexico: new Audio('./AirRaid_Sounds/Mexico_Siren.wav?' + new Date().getTime()),
            Germany: new Audio('./AirRaid_Sounds/Germany_Siren.wav?' + new Date().getTime()),
            Bulgaria: new Audio('./AirRaid_Sounds/Bulgaria_Siren.wav?' + new Date().getTime()),
            'United States': new Audio('./AirRaid_Sounds/USA_Siren.wav?' + new Date().getTime()),
            Russia: new Audio('./AirRaid_Sounds/Russia_Siren.wav?' + new Date().getTime()),
            'Saudi Arabia': new Audio('./AirRaid_Sounds/Saudi_Arabia_Siren.wav?' + new Date().getTime()),
            'United Kingdom': new Audio('./AirRaid_Sounds/United_Kingdom_Siren.wav?' + new Date().getTime()),
            Australia: new Audio('./AirRaid_Sounds/Australia_Siren.wav?' + new Date().getTime()),
            Canada: new Audio('./AirRaid_Sounds/Canada_Siren.wav?' + new Date().getTime()),
            China: new Audio('./AirRaid_Sounds/China_Siren.wav?' + new Date().getTime()),
            'New Zealand': new Audio('./AirRaid_Sounds/New_Zealand_Siren.wav?' + new Date().getTime()),
            Iran: new Audio('./AirRaid_Sounds/Iran_Siren.wav?' + new Date().getTime()),
        };


        //Temp
        this.currentActiveAudio = null;

        this.applyVolume(loadSoundSettings());
    }

    // combines master volume to sfx specific volume 
    applyVolume(settings) {
        const effective = Math.max(0, Math.min(1, settings.master * settings.sfx));
        Object.values(this.tracks).forEach(track => {
            track.volume = effective;
        });
    }

    play(name, loop = false) {
        console.log("playing ", name);

        const sound = this.tracks[name];

        if (!sound) {
            console.error(`Sound "${name}" not found.`);
            return;
        }

        sound.currentTime = 0;
        sound.loop = loop;
        sound.play().catch(e => console.log("Playback blocked:", e));
    }

    playTrivia(name, loop) {
        if (loop === false) {
            console.log("playing ", name);
        }
        else {
            console.log("looping ", name);
        }

        const sound = this.sirenTracks[name];
        if (!sound) {
            console.error(`Sound "${name}" not found.`);
            return;
        }

        stopActiveSirenAudio("play-trivia");
        sound.currentTime = 0;
        sound.loop = loop;
        sound.play().catch(e => console.log("Playback blocked:", e));
        activeSirenAudio = sound;
    }

    stopTrivia(name) {
        const sound = this.sirenTracks[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }

        if (activeSirenAudio === sound) {
            activeSirenAudio = null;
        }
    }



    stop(name) {
        const sound = this.tracks[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

}