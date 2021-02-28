import DetailAnuncioController from './controllers/DetailAnuncioController.js'
import LoaderController from './controllers/LoaderController.js'
import ErrorController from './controllers/ErrorController.js'


window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loader);
    
    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
    
    const element = document.querySelector('.anuncio')
    const controller = new DetailAnuncioController(element);
    // controller.loader = loaderController;
    controller.loadAnuncio();
    

});