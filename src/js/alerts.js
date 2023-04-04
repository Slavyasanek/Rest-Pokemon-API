import throttle from 'lodash.throttle';
import Notiflix, { Notify } from 'notiflix';

const noSuccess = () => {
    return Notify.failure(
        'Sorry, there are no pokemons matching your search query. Please try again.',
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

const successFind = (amount) => {
    return Notify.success(
        `Hooray! We found ${amount} pokemons`,
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

const tooMuchPokemonsFound = () => {
    return Notify.warning(
        `Sorry, we have found too much pokemons. Write more specific query`,
        {
            timeout: 3000,
            cssAnimationStyle: 'zoom',
        });
}

const errorNotify = () => {
    return Notify.failure(
        'Something went wrong',
        {
            timeout: 2000,
            cssAnimationStyle: 'zoom',
        });
}

Notiflix.Notify.init({
    info: {
        background: '#f8ed62',
        textColor: '#a98600',
    },
})

const infoAbility = (sum, abilities) => {
    return Notiflix.Notify.info(
        `We found ${sum} pokemons with ${abilities} abilities`,
        {
            cssAnimationStyle: 'zoom',
            timeout: 4000,
            closeButton: true,
        });
}


export { noSuccess, successFind, tooMuchPokemonsFound, errorNotify, infoAbility };