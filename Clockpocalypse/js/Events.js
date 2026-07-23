let currentEventsInstance = null;

export function getActiveEvents(){
    return currentEventsInstance ? currentEventsInstance.active : [];
}
export function getEventsPool(){
    return currentEventsInstance ? currentEventsInstance.pool : [];
}

export class Events {

    constructor(events) {
        this.pool = events.map((event, index) => {
            return {
                ...event,
                id: index
            };
        });

        this.active = [];
        this.currentIndex = 0;
        currentEventsInstance = this;
    }

    spawn() {

        if (
            this.active.length < 3 &&
            this.currentIndex < this.pool.length
        ) {

            let event = this.pool[this.currentIndex];
            this.currentIndex++;

            this.active.push(event);
            return event;
        }

    }

    complete(event) {

        const index =
            this.active.indexOf(event);
        if (index !== -1) {
            this.active.splice(index, 1);
        }
    }

    reset() {
        this.active = [];
        this.currentIndex = 0;
    }
}