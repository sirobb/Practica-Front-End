import BaseController from './BaseController.js';
import dataService from '../services/DataService.js';

export default class NewAnuncioFormController extends BaseController{

    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInSelect();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/new-anuncio.html';
        }else{
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInSelect(){
        const select = this.element.querySelector('select');
        select.focus();
    }

    attachEventListeners(){
        //a medida que el usuario escribe,
        //comprobamos si el form es valido para habilitar el boton enviar

        const inputPrice = this.element.querySelector('input');               
        inputPrice.addEventListener('keyup', () => {
            const button = this.element.querySelector('button');
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled')
            } else {
                button.setAttribute('disabled', true);
            }
        });

        
        //controlamos cuando se envia el formulario
        this.element.addEventListener('submit', async event => {
            event.preventDefault();//cancelamos el envio del formulario
            const anuncio = {
                price: this.element.elements.price.value,
                name: this.element.elements.name.value,
                condition: this.element.elements.condition.value,
                image : null
            }
            if (this.element.elements.file.files.length > 0) {
                anuncio.image = this.element.elements.file.files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await dataService.saveAnuncio(anuncio);
                window.location.href = '/?mensaje=anuncioOK'
                alert('Anuncio Creado!')
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally{
                this.publish(this.events.FINISH_LOADING)
            }
        })

    }


}