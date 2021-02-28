const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {

    getAnuncios: async function() {
        const currentUser = await this.getUser();
        const url = `${BASE_URL}/api/anuncios?_expand=user&_sort=id&_order=desc`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.map(anuncio => {
                return {
                    id: anuncio.id,
                    name: anuncio.name.replace(/(<([^>]+)>)/gi, ""),
                    price: anuncio.price.replace(/(<([^>]+)>)/gi, ""),
                    condition: anuncio.condition.replace(/(<([^>]+)>)/gi, ""),
                    author: anuncio.user.username || 'Desconocido',
                    image: anuncio.image || null,
                    canBeDeleted: currentUser ? currentUser.userId === anuncio.userId : false
                }
            }); // <- esto es un resolver data 
        } else {
            //devolver error
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, postData, json=true){
        return await this.request('POST', url, postData, json);
    },

    delete: async function(url){
        return await this.request('DELETE', url, {});
    },

    put: async function(url, putData, json=true){
        return await this.request('PUT', url, putData, json);
    },

    request: async function(method,url, postData, json=true) {
        const config = {
            method: method,
            headers: {},
            body: null
        };
        if (json) {
            config.headers['Content-Type'] = 'application/json';
            config.body = JSON.stringify(postData)// se convierte el objeto en un json
        }else{
            config.body = postData;
        }
        const token = await this.getToken();
        if (token) {
             config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, config);
        const data = await response.json(); //respuesta del servidor sea OK o sea ERROR.
        if (response.ok) {
            return data;
        } else {
            //si la respuesta es 401 no autorizado, debemos borrar el token(si es que esta).
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    registerUser: async function(user) {
        
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function(user) {
        
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    saveToken: async function(token){
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function(){
        const token = await this.getToken();
        return token !== null;
    },

    saveAnuncio: async function(anuncio){ // esto es un post (enviar informacion)
        const url = `${BASE_URL}/api/anuncios`;

        if (anuncio.image) {
            const imageURL = await this.uploadImage(anuncio.image);
            anuncio.image = imageURL
        }
        return await this.post(url, anuncio);
    },

    uploadImage: async function(image){
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false);
        console.log('uploadImage', response);
        return response.path || null;
    },

    getUser: async function(){
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; // tomamos el payload, codificado en base64
            const jsonStr = atob(payload); //decodificamos el base64
            const { userId, username } = JSON.parse(jsonStr) //parseamos el JSON del token descodificado
            return { userId, username };
        } catch (error) {
            return null;
        }
    },

    deleteAnuncio: async function(anuncio){
        const url = `${BASE_URL}/api/anuncios/${anuncio.id}`;
        return await this.delete(url);
    }

};