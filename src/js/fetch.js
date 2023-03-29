import axios from 'axios';

const URL_FOR_RANDOM = 'https://pokeapi.co/api/v2/pokemon/';
const URL_FOR_POKEMON = 'https://pokeapi.co/api/v2/pokemon';

const fetchPokemons = async (limitNum, offsetNum) => {
    const searchFilters = new URLSearchParams({
        limit: limitNum,
        offset: offsetNum
    })
    const response = await axios.get(`${URL_FOR_RANDOM}?${searchFilters}`);
    return response.data
}

const fetchOnePokemon = async (name) => {
    const response = await axios.get(`${URL_FOR_POKEMON}/${name}`);
    return response.data
}

// fetchPokemons(20, 20).then(r => console.log(r.results))

// fetchOnePokemon('ditto').then(r => console.log(r))

export {fetchPokemons, fetchOnePokemon};