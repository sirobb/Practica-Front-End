import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'
import LoginFormController from './controllers/LoginFormController.js'

window.addEventListener('DOMContentLoaded', () => {
    //barra de cargando
    const loader = document.querySelector('.lds-dual-ring');
    new LoaderController(loader);
    //Manejo de Errores
    const errorsElement = document.querySelector('.global-errors');
    new ErrorController(errorsElement);
    
    const formElement = document.querySelector('form');
    new LoginFormController(formElement);
})