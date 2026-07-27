import { loadSoundSettings } from "./SoundManager.js";

export class sound_effects {
    constructor() {
        this.tracks = {
            complete: new Audio('./Sound_Effects/CompleteV2.wav?' + new Date().getTime()),
            fail: new Audio('./Sound_Effects/FailV2.wav?' + new Date().getTime()),
            skip: new Audio('./Sound_Effects/SkipV2.wav?' + new Date().getTime()),
            victory: new Audio('./Sound_Effects/VictoryV2.wav?' + new Date().getTime())
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

    stop(name) {
        const sound = this.tracks[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}