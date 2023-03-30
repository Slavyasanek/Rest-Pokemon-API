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

const tooMuchFound = () => {
    return Notify.warning(
        `Sorry, we have found too much pokemons. Write more specific query`,
        {
            timeout: 3000,
            cssAnimationStyle: 'zoom',
        });
}


export {noSucces, successFind, tooMuchFound};