export class sound_effects {

    constructor() {
        this.tracks = {
            complete: new Audio('./Sound_Effects/Complete.wav'),
            fail: new Audio('./Sound_Effects/Fail.wav'),
            skip: new Audio('./Sound_Effects/Skip.wav'),
            victory: new Audio('./Sound_Effects/victory.wav')

        }
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