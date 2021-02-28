import BaseController from './BaseController.js'
import dataService from '../services/DataService.js'
import { anuncioView } from '../views.js'


export default class AnuncioListController extends BaseController {

    render(anuncios) {
        for (const anuncio of anuncios) {
            const article = document.createElement('article');
            article.innerHTML = anuncioView(anuncio);
            this.element.appendChild(article);
        }
    }

    async loadAnuncios() {
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