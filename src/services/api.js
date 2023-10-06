import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=1728816a402a07893f04b1af16b895cdlanguage=pt-BR

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
});

export default api;