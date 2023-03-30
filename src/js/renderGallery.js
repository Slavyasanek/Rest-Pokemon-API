import { fetchOnePokemon, fetchPokemons } from "./fetch";
import { getRandomNum } from "./randomNum";
const pokemonsGallery = document.querySelector('.gallery__pokemons');
const btnRandomPokemons = document.querySelector('.gallery__btn')

const renderGallery = ({ id, name, sprites, abilities, types }) => {
    const abilitiesList = abilities.map(({ ability }) => `<li class="card__item">&#9734;${ability.name}</li>`).join("");
    const typesList = types.map(({ type }) => `<li class="card__type" data-type="${type.name}">${type.name}</li>`).join("");
    let poky = `<li class="card" data-pokemon="${id}"><div class="card__thumb"><div class="card__images">`;
    if (sprites.front_default && sprites.back_default) {
        poky += `<img src="${sprites.front_default}" alt="front default" class="card__image">
        <img src="${sprites.back_default}" alt="back default" class="card__image">`;
    } else if (!sprites.back_default && sprites.front_default) {
        poky +=  `<img src="${sprites.front_default}" alt="front default" class="card__image">`;
    } else if (!sprites.front_default){
        poky += `<h2 class="card__warn">There are no images. We are sorry!</h2>`;
    }
    poky += `</div>
    <div class="card__description">
        <h2 class="card__name">${name}</h2>
        <p class="card__title">Abilities</p>
        <ul class="card__list">
            ${abilitiesList}
        </ul>
        <p class="card__title">Types</p>
        <ul class="card__list">
            ${typesList}
        </ul>
    </div> </div>
    <button class="blue--transparent card__btn">View more</button>
    </li>`;
    return poky;
}

const getPokys = async (offsetNum) => {
    fetchPokemons(20, offsetNum)
        .then(r => {
            console.log(r.results)
            r.results.map(({ name }) => {
                fetchOnePokemon(name).then(d => {
                    const post = renderGallery(d);
                    pokemonsGallery.insertAdjacentHTML("beforeend", post)
                }).catch(e => console.log(e))
            })
        });
}

window.addEventListener("load", () => {
    const page = getRandomNum(1000, 1)
    console.log(page);
    getPokys(page)
})

btnRandomPokemons.addEventListener("click", () => {
    pokemonsGallery.innerHTML = "";
    const page = getRandomNum(1000, 1);
    getPokys(page)
})