
const settings_storage = "clockpocalypse_settings";

const defaultSoundSettings = {
    master: 1,
    alarm: 1, 
    ui: 1, 
    music: 1,
    sfx: 1,  
};

export function loadSoundSettings() {
    try{
        const raw = localStorage.getItem(settings_storage);
        if (!raw) return { ...defaultSoundSettings };
        return { ...defaultSoundSettings, ...JSON.parse(raw) };
    } catch (e) {
        console.error("Failed to load sound settings", e);
        return { ...defaultSoundSettings };
    }
}

export function setSoundSetting(channel, value) {
    const settings = loadSoundSettings();
    settings[channel] = Math.max(0, Math.min(1, value));

    try {
        localStorage.setItem(settings_storage, JSON.stringify(settings));  
    } catch (e) {
        console.error("Failed to save Sound Settings", e);
    }
    return settings;
}

export class SoundManager {

    constructor() {

        this.context = new AudioContext();

        //Create one section to mix Audio in. 

        this.masterGain = this.context.createGain();
        this.masterGain.gain.value = 1;

        this.sfxGain = this.context.createGain();
        this.sfxGain.gain.value = 1;

        this.alarmGain = this.context.createGain();
        this.alarmGain.gain.value = 1;

        this.musicGain = this.context.createGain();
        this.musicGain.gain.value = 1;

        this.uiGain = this.context.createGain();
        this.uiGain.gain.value = 1;

        // connect as a mastergain
        this.sfxGain.connect(this.masterGain);
        this.alarmGain.connect(this.masterGain);
        this.musicGain.connect(this.masterGain);
        this.uiGain.connect(this.masterGain);

        this.masterGain.connect(this.context.destination);
        
        const settings = loadSoundSettings();
        this.masterGain.gain.value = settings.master;
        this.alarmGain.gain.value= settings.alarm;
        this.uiGain.gain.value = settings.ui;

        this.sounds = {};

        this.sirenSource = null;
        this.sirenGain = null;
        
    }

    setChannelVolume(channel, value){
        const gainNode = this[channel + "Gain"];
        if(gainNode) {
            gainNode.gain.value = value;
        }
    }

    

    async load(name, url) {

        //checking if the url is empty or null
        console.log("Loading sound", name, "from", url);

        let response = await fetch(url);

        if (!response.ok) {
            console.error("Failed to load sound", url);
            return;
        }

        //console.log("Fetch Status: ", response.status);

        let data = await response.arrayBuffer();

        this.sounds[name] = await this.context.decodeAudioData(data);

        //console.log("Sound loaded:", name); 
    }


    async play(name, loop = false) {

        console.log("Playing sound", name, loop);
        console.log("Buffer", this.sounds[name]);

        if (this.context.state === "suspended") {
            await this.context.resume();
        }

        let source = this.context.createBufferSource();
        let gain = this.context.createGain();


        console.log(this.sounds);
        source.buffer = this.sounds[name];
        source.loop = loop;

        source.connect(gain);
        gain.connect(this.alarmGain);

        source.start();

        if (loop) {
            this.sirenSource = source;
            this.sirenGain = gain;

            this.sirenGain.gain.setValueAtTime(0, this.context.currentTime);
        }

        return source;
    }

    stop(source) {

        if (source) {
            source.stop();
        }
    }


    //Tick on the Timer from Timer Settings
    tick() {

        let oscillator = this.context.createOscillator();
        let gain = this.context.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 900;
        gain.gain.value = 0.5;
        oscillator.connect(gain);
        gain.connect(this.uiGain);

        oscillator.start();
        oscillator.stop(this.context.currentTime + 0.05);

    }


    updateSirenVolume(time) {

        //console.log("Siren:", time, this.sirenGain.gain.value);

        if (!this.sirenGain) {
            return;
        }
        let gain = 0;

        //Siren off until time 
        if (time <= 30) {

            //Siren volume increases as time decreases
            let rampTime = 30 - time;

            // stepped increase every 5 seconds
            let step = Math.floor(rampTime / 5);
            gain = step / 6;


            gain = Math.pow(gain, 1.4);
            gain = Math.min(1, gain);

        }

        //turn off Sound
        if (time > 30) {
            this.sirenGain.gain.setTargetAtTime(
                0,
                this.context.currentTime,
                0.05
            );
            return;
        }


        //smooth control
        this.sirenGain.gain.setTargetAtTime(
            gain,
            this.context.currentTime,
            0.1
        );
    }

    resetSiren() {

        if (this.sirenGain) {
            try {
                this.sirenSource.stop();
            } catch (e) { }
        }

        this.sirenGain = null;
        this.sirenSource = null;
    }
}