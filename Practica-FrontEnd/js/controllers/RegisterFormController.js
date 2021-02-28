import DataService from "../services/DataService.js";
import BaseController from "./BaseController.js";


export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    async makePost (user){
        await DataService.registerUser(user);
        alert("Usuario creado con exito!!")
        window.location.href = '/login.html'; //envia al usuario a la pag de login
    }

    attachEventListener(){

        this.element.addEventListener('submit', async (event) => {
            event.preventDefault(); // evita que se envie el formulario 
            const user = {
                username: this.element.elements.email.value,
                password: this.element.elements.password.value
            };
            this.publish(this.events.START_LOADING);
            try {
                await this.makePost(user);                
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const button = this.element.querySelector('button');
            input.addEventListener('keyup', (event) => {
                //si el input es ok, se marca verde, if not, rojo
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger')
                } else {
                    input.classList.remove('is-success')
                    input.classList.add('is-danger')
                }


                //valido si todo el formulario es OK para habilitar o deshanilitar el boton 
                if (this.element.checkValidity()) {
                    button.removeAttribute('disabled');
                }else{
                    button.setAttribute('disavled', true);
                }
            });
        })
    }



}