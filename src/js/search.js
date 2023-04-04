import { fetchOnePokemon, fetchPokemons, fetchAbility, fetchAbilities, fetchType } from "./fetch";
import { pokemonsGallery } from "./getPokys";
import { tooMuchPokemonsFound, noSuccess, successFind, errorNotify, infoAbility } from "./alerts";
import { renderGallery } from "./renderGallery";
import Notiflix from "notiflix";
import throttle from "lodash.throttle";

const searchForm = document.querySelector('.header__search');

let shouldLoad = true;
let totalFounds;
let firstElFound = 0;
let lastElFound = 19;
let throttled;

const searchByName = () => {
    fetchPokemons(1280, 1)
        .then(({ results }) => {
            let similiarFounds = [];
            results.forEach(({ name }) => {
                if (name.includes(searchForm.string.value.toLowerCase())) {
                    similiarFounds.push(name)
                }
            })
            if (similiarFounds.length > 20) {
                tooMuchPokemonsFound();
                return;
            } else if (similiarFounds.length === 0) {
                noSuccess();
                return;
            } else {
                pokemonsGallery.innerHTML = "";
                successFind(similiarFounds.length);
                let promises = [];
                similiarFounds.forEach(found => {
                    promises.push(fetchOnePokemon(found)
                        .then(data => data))
                })
                Promise.all(promises).then(r => {
                    r.map(result => {
                        const post = renderGallery(result);
                        pokemonsGallery.insertAdjacentHTML("beforeend", post);
                    })
                }).catch(e => errorNotify())
            }
        }
        );
}

const searchByAbility = () => {
    fetchAbilities()
        .then(({ results }) => {
            let similiarFounds = [];
            results.forEach(({ name }) => {
                if (name.includes(searchForm.string.value)) {
                    similiarFounds.push(name);
                }
            })
            if (similiarFounds.length > 5) {
                tooMuchPokemonsFound();
                return;
            } else if (similiarFounds.length === 0) {
                noSuccess();
                return;
            } else {
                let promises = [];
                similiarFounds.map(request => {
                    promises.push(fetchAbility(request).then(data => data))
                })
                Promise.all(promises).then(data => {
                    const pokemonsFound = [];
                    data.flatMap(data => (data.pokemon.forEach(pokie => pokemonsFound.push(pokie))))
                    if (pokemonsFound.length > 40) {
                        tooMuchPokemonsFound();
                        return;
                    } else {
                        infoAbility(pokemonsFound.length, similiarFounds.join(", "));
                        pokemonsGallery.innerHTML = "";
                        const pokieNames = pokemonsFound.map(pokie => pokie.pokemon.name);
                        pokieNames.forEach(pokie => {
                            fetchOnePokemon(pokie)
                                .then(d => {
                                    const post = renderGallery(d);
                                    pokemonsGallery.insertAdjacentHTML("beforeend", post);
                                })
                        })
                    }
                })

            }
        })
}


const loadMore = (array) => {
    const heightOfBody = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.pageYOffset;

    const thershold = scrolled + screenHeight;
    if (thershold >= heightOfBody && shouldLoad) {
        totalFounds -= 1;
        firstElFound += 20;
        lastElFound += 20;

        if (totalFounds === 0) {
            shouldLoad = false;
            firstElFound = 0;
            lastElFound = 19;

            endOfLoad();
            return;
        } else {
            array.slice(firstElFound, lastElFound).map(async poke => {
                const getPok = await fetchOnePokemon(poke.pokemon.name);
                pokemonsGallery.insertAdjacentHTML("beforeend", renderGallery(getPok))
            })
        }
    }
}

const endOfLoad = () => {
    window.removeEventListener("scroll", throttled);
    return Notiflix.Notify.info(
        `That's all we were able to found. Hope we helped you!`,
        {
            cssAnimationStyle: 'zoom',
            timeout: 2000,
        });
}

const searchByType = async () => {
    window.removeEventListener("scroll", throttled);
    const typefetching = await fetchType(searchForm.string.value.toLowerCase());
    const curPokemons = typefetching.pokemon;
    successFind(curPokemons.length);
    console.log(curPokemons)
    if (curPokemons.length > 20) {
        shouldLoad = true;
        totalFounds = Math.ceil(curPokemons.length / 20);
        throttled = throttle(() => loadMore(curPokemons), 300);
        window.addEventListener("scroll", throttled);
    }
    pokemonsGallery.innerHTML = "";
    curPokemons.slice(firstElFound, lastElFound).map(async poke => {
        const getPok = await fetchOnePokemon(poke.pokemon.name);
        return pokemonsGallery.insertAdjacentHTML("beforeend", renderGallery(getPok));
    })
}

const searchPokys = (event) => {
    event.preventDefault();
    const curOption = searchForm.search.value;
    if (curOption === 'pokemon') {
        searchByName();
    } else if (curOption === 'ability') {
        searchByAbility();
    } else if (curOption === 'type') {
        searchByType().catch(e => noSuccess());
    }
}

searchForm.addEventListener("submit", searchPokys)