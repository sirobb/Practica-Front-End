import pubSub from '../services/Pubsub.js'



export default class BaseController{

    constructor(element){
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            START_LOADING: 'startLoading',
            FINISH_LOADING: 'finishLoading',
            ERROR: 'error'
        }
    }

    subscribe(eventName, eventHandler){
        this.pubSub.subscribe(eventName, eventHandler);
    }
    publish(eventName, eventData){
        this.pubSub.publish(eventName, eventData)
    }


}