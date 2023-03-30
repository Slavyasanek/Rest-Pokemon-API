import { fetchOnePokemon, fetchPokemons, fetchAbility, fetchAbilities } from "./fetch";
import { pokemonsGallery } from "./getPokys";
import { tooMuchPokemonsFound, noSuccess, successFind, errorNotify, infoAbility } from "./alerts";
import { renderGallery } from "./renderGallery";

const searchForm = document.querySelector('.header__search');

const searchByName = () => {
    fetchPokemons(1280, 1)
        .then(({ results }) => {
            let similiarFounds = [];
            results.forEach(({ name }) => {
                if (name.includes(searchForm.string.value)) {
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
    .then(({results}) => {
        let similiarFounds = [];
        results.forEach(({name}) => {
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
                    infoAbility(similiarFounds.join(", "));
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

    // fetchAbility(searchForm.string.value)
    // .then(({pokemon}) => console.log(pokemon))
    // .catch( e => noSuccess())
}

const searchPokys = (event) => {
    event.preventDefault();
    const curOption = searchForm.search.value;
    if ( curOption === 'pokemon') {
        searchByName();
    } else if (curOption === 'ability') {
        searchByAbility();
    }
}

// searchPokys()

searchForm.addEventListener("submit", searchPokys)