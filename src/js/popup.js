import { fetchOnePokemon } from "./fetch";
import { pokemonsGallery } from "./getPokys"
import { renderCard, cleanCard } from "./renderInfo";

const popupCloseBtn = document.querySelector('[data-popup-close]');
const modal = document.querySelector('.popup')

const renderInfo = async () => {
    const pokieID = event.target.closest('li').dataset.pokemon;
    const pok = await fetchOnePokemon(pokieID);
    console.log(pok)
    renderCard(pok);
}

function popupOpen() {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    renderInfo();
    document.body.classList.add('lock');
    modal.classList.add('open')
}

function popupClose() {
    document.body.classList.remove('lock');
    modal.classList.remove('open')
    setTimeout(cleanCard, 800);
    cleanCard();
}

popupCloseBtn.addEventListener("click", popupClose);

pokemonsGallery.addEventListener("click", popupOpen)

