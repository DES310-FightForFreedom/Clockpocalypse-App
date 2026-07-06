export class TimerSettings{

    constructor (time){
        this.time=time;
    }

    start(callback, toEnd){
        this.interval=setInterval(()=>{

            this.time--;

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
        this.time+=seconds;
    }

    remove(seconds){
        this.time-=seconds;

        if(this.time < 0){
            this.time = 0;
        }
    }

    stop(){
        clearInterval(this.interval);
    }

}