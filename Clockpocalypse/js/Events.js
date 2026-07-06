export  class Events{

    constructor(events){
        this.pool=[...events];
        this.active=[];
        this.currentIndex=0;
    }

    spawn(){

        if(
            this.active.length < 3 &&
            this.currentIndex < this.pool.length
        ){

            let event= this.pool[this.currentIndex];
            this.currentIndex++;

            this.active.push(event);
            return event;
        }

    }

    complete(event){

        this.active = 
        this.active.filter(
        e=>e !== event
        );
    }

    reset(){
        this.active =[];
        this.currentIndex = 0;
    }


}