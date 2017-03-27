import axios from 'axios';

export default class MarvelApi {

  constructor() {
    console.log('marvel api')
    this.uri = 'http://localhost:3000';
  }


  fetchCharacters(text) {
    return axios.get(`${this.uri}/api/characters/?text=${text}`).then((resp) => resp.data);
  }

  fetchComics(comicId) {
    return axios.get(`${this.uri}/api/comics/${comicId}`).then((resp) => resp.data);
  }

}