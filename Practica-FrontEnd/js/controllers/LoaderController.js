import BaseController from './BaseController.js'

export default class LoaderController extends BaseController{

    constructor(element){
        super(element);
        this.subscribe(this.events.START_LOADING, () =>{
            this.showLoading();
        });
        this.subscribe(this.events.FINISH_LOADING, () =>{
            this.hideLoading();
        })
    }


    showLoading(){
        this.element.classList.remove('hidden')
    }

    hideLoading(){
        this.element.classList.add('hidden')
    }

}