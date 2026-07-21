export class sound_effects {
    constructor() {
        this.tracks = {
            complete: new Audio('/Sound_Effects/CompleteV2.wav?' + new Date().getTime()),
            fail: new Audio('/Sound_Effects/FailV2.wav?' + new Date().getTime()),
            skip: new Audio('/Sound_Effects/SkipV2.wav?' + new Date().getTime()),
            victory: new Audio('/Sound_Effects/VictoryV2.wav?' + new Date().getTime())
        };

        //Temp
        this.currentActiveAudio = null;
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