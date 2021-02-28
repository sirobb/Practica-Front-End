import AnuncioListController from './controllers/AnuncioListController.js'
import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'
import NewAnuncioOrLoginController from './controllers/NewAnuncioOrLoginController.js';

window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loader);

    const element = document.querySelector('.anuncios-list')
    const controller = new AnuncioListController(element);
    // controller.loader = loaderController;
    controller.loadAnuncios();
    
    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);

    const newAnuncioButtons = document.querySelector('.new-anuncio');
    new NewAnuncioOrLoginController(newAnuncioButtons);
});