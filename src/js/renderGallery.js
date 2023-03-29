import { fetchOnePokemon, fetchPokemons } from "./fetch";
import { getRandomNum } from "./randomNum";
const pokemonsGallery = document.querySelector('.pokemons');

const renderGallery = ({ name, sprites }) => {
    const poky = `<li><p>${name}</p><img src="${sprites.front_default}" width=100></li>`
    return poky;
}

const getPokys = async (offsetNum) => {
    fetchPokemons(10, offsetNum)
        .then(r => {
            console.log(r.results)
            r.results.map(({ name }) => {
                fetchOnePokemon(name).then(d => {
                    const posts = renderGallery(d);
                    pokemonsGallery.insertAdjacentHTML("beforeend", posts)
                })
            })
        });
}

window.addEventListener("load", () => {
    const page  = getRandomNum(1000, 1)
    getPokys(page)
})

