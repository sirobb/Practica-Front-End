import BaseController from './BaseController.js'
import dataService from '../services/DataService.js'
import { anuncioView } from '../view.js'


export default class DetailAnuncioController extends BaseController {

    render(anuncios) {
        this.element.innerHTML = ''; // borramos cualquier anuncio que pueda verse en pantalla
        for (const anuncio of anuncios) {
            const article = document.createElement('article');
            article.innerHTML = anuncioView(anuncio);
            const deleteButton = article.querySelector('button');
            if (deleteButton) {
                deleteButton.addEventListener('click', async ev => {
                    const deleteConfirmed = confirm('¿Seguro que quieres borrarlo?');
                    if (deleteConfirmed) {   
                        console.log('Borra el Anuncio', anuncio);
                        await dataService.deleteAnuncio(anuncio);
                        article.remove(); // borramos inmediatamente el anuncio
                        alert('Anuncio Eliminado')
                        await this.loadAnuncio(); // recargamos la lista de anuncios tras borrar                     
                    }
                });
            }
            this.element.appendChild(article);
        }
    }

    async loadAnuncio() {
        // this.loader.showLoading();
        this.publish(this.events.START_LOADING, {});
        try {
            const anuncios = await dataService.getAnuncios()
            this.render(anuncios);
        } catch (error) {
            console.log(error);
            this.publish(this.events.ERROR, error);
        } finally {
            //esto se ejecuta siempre
            this.publish(this.events.FINISH_LOADING, {});
        }
    }


}