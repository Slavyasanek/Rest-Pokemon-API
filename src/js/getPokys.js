import { fetchOnePokemon, fetchPokemons } from "./fetch";
import { finishLoad, loadItems } from "./loadNotiflix";
import { getRandomNum } from "./randomNum";
import { renderGallery } from "./renderGallery";

export const pokemonsGallery = document.querySelector('.gallery__pokemons');
const btnRandomPokemons = document.querySelector('.gallery__btn')

const getPokys = async (offsetNum) => {
    fetchPokemons(21, offsetNum)
        .then(r => {
            r.results.map(({ name }) => {
                fetchOnePokemon(name).then(d => {
                    const post = renderGallery(d);
                    pokemonsGallery.insertAdjacentHTML("beforeend", post)
                }).catch(e => console.log(e))
            })
        });
}

window.addEventListener("load", () => {
    loadItems()
    const page = getRandomNum(1200, 1)
    getPokys(page)
    finishLoad();
})

btnRandomPokemons.addEventListener("click", () => {
    loadItems();
    pokemonsGallery.innerHTML = "";
    const page = getRandomNum(1000, 1);
    getPokys(page)
    finishLoad();
})