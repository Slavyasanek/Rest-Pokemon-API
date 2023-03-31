import axios from 'axios';

const URL_FOR_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
const URL_FOR_ABILITY = 'https://pokeapi.co/api/v2/ability';
const URL_FOR_TYPE = 'https://pokeapi.co/api/v2/type';


const fetchPokemons = async (limitNum, offsetNum) => {
    const searchFilters = new URLSearchParams({
        limit: limitNum,
        offset: offsetNum
    })
    const response = await axios.get(`${URL_FOR_POKEMON}/?${searchFilters}`);
    return response.data
}

const fetchOnePokemon = async (name) => {
    const response = await axios.get(`${URL_FOR_POKEMON}/${name}`);
    return response.data
}

const fetchAbilities = async () => {
    const searchFilters = new URLSearchParams({
        limit: 357,
        offset: 1
    });
    const response = await axios.get(`${URL_FOR_ABILITY}/?${searchFilters}`)
    return response.data;
}

const fetchAbility = async (abilityName) => {
    const response = await axios.get(`${URL_FOR_ABILITY}/${abilityName}/`);
    return response.data
}

const fetchType = async (typeName) => {
    const response = await axios.get(`${URL_FOR_TYPE}/${typeName}`);
    return response.data;
}

export {fetchPokemons, fetchOnePokemon, fetchAbility, fetchAbilities, fetchType };