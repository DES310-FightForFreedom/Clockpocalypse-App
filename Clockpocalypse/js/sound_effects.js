export class sound_effects {

    constructor() {

        this.tracks = {
            complete: new Audio('/Sound_Effects/CompleteV2.wav?' + new Date().getTime()),
            fail: new Audio('/Sound_Effects/FailV2.wav?' + new Date().getTime()),
            skip: new Audio('/Sound_Effects/SkipV2.wav?' + new Date().getTime()),
            victory: new Audio('/Sound_Effects/VictoryV2.wav?' + new Date().getTime())
        };

        //Temporary 
        const chalSounds = [
            { title: "Solar flare", sound: "/Sound_Effects/CompleteV2.wav" }
        ]

    }

    enableLoop(part) {
        part.loop = true;
        part.load();
    }

    disableLoop(part) {
        part.loop = false;
        part.load();
    }

    findAudio(event) {
        let n = event.title;

        //rough code for searching until it finds a match
        for (let i = 0; i < chalSounds.length; i++) {
            if (n === chalSounds[i].title) {
                console.log("Found a match on title-challenge");
                return chalSounds[i].sound;
            }
        }
        return 0;
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