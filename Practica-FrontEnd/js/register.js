import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'
import RegisterFormController from './controllers/RegisterFormController.js'

window.addEventListener('DOMContentLoaded', () => {
    //barra de cargando
    const loader = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loader);
    //Manejo de Errores
    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
    //controla el formulario de html, element se conecta con el controlador
    const formElement = document.querySelector('form')
    const formController = new RegisterFormController(formElement);

})