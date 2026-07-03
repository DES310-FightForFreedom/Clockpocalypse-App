export  class Events{

    constructor(events){
        this.pool=[...events];
        this.active=[];
    }

    spawn(){

        if(
            this.active.length < 3 &&
            this.pool.length >0
        ){
        let index =
        Math.floor(
        Math.random()*this.pool.length
        );

        let event = 
        this.pool.splice(index,1)[0];

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


}