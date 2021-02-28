import BaseController from './BaseController.js'
import DataService from '../services/DataService.js'

export default class NewAnuncioOrLoginController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const usesIsLogged = await  DataService.isUserLogged();
        if (usesIsLogged) {
            //mostrar boton de nuevo tweet
            const newAnuncioButton = this.element.querySelector('.new-anuncio-button');
            newAnuncioButton.classList.remove('is-hidden');
        } else {
            //mostrar boton de login o de registro
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden');
        }
    }

}