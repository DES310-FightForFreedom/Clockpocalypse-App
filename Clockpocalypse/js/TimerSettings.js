export class TimerSettings{

    constructor (time, sound){
        this.time=time;
        this.sound=sound; 
    }

    start(callback, toEnd){

        this.stop(); 

        this.interval=setInterval(()=>{

            this.time--;
            

            if(this.sound && this.sound.tick){
                this.sound.tick();
            }

            if(this.sound && this.sound.updateSirenVolume){
                this.sound.updateSirenVolume(this.time);
            }

        
            if(this.time <=0){
                
                this.time = 0;

                clearInterval(this.interval);

                callback(this.time);
            
                //calls end at 0 seconds 
                toEnd();

                return;
            }

            callback(this.time);

        },1000);
    }

    add(seconds){
        this.time += seconds;

        if(this.sound?.updateSirenVolume){
            this.sound.updateSirenVolume(this.time);
        }
    }

    remove(seconds){
        this.time-=seconds;

        if(this.time < 0){
            this.time = 0;
        }

        if(this.sound?.updateSirenVolume){
            this.sound.updateSirenVolume(this.time);
        }
    }

    setVolume(amount){
        this.sound?.setVolume?.(amount);
    }

    stop(){
        if(this.interval){
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}