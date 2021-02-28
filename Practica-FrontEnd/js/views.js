export const anuncioView = (anuncio) => {
  let imgHTML = '';
  if (anuncio.image) {
    imgHTML = `
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${anuncio.image}" alt="Placeholder image">
          </figure>
        </div>`;
  }

    return `
    <div class="card">
     ${imgHTML}
      <div class="card-content">
          <div class="media">
              <div class="media-content">
                <p class="title is-4">${anuncio.price}<strong>€</strong></p>
                <p class="title is-3">${anuncio.name}</p>
              </div>
          </div>
          <div class="content">
            <strong>Condicion :</strong> ${anuncio.condition}
            <br>        
          </div>
          <footer class="card-footer">
            <a class="button is-link" href="/detail-anuncio.html">Detalle Anuncio</a>            
          </footer>
    </div>    
  </div>`;
};

export const errorView = (errorMessage) =>{
    return `<article class="message is-danger">
    <div class="message-header">
      <p>Error</p> 
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
     ${errorMessage}
    </div>
</article>`
}