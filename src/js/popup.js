import { fetchOnePokemon } from "./fetch";
import { pokemonsGallery } from "./getPokys"
import { finishLoad, loadItems } from "./loadNotiflix";
import { renderCard, cleanCard } from "./renderInfo";

const popupCloseBtn = document.querySelector('[data-popup-close]');
const modal = document.querySelector('.popup')

const renderInfo = async () => {
    const pokieID = event.target.closest('li').dataset.pokemon;
    const pok = await fetchOnePokemon(pokieID);
    renderCard(pok);
}

function popupOpen() {
    loadItems()
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    renderInfo();
    document.body.classList.add('lock');
    modal.classList.add('open')
    finishLoad();
}

function popupClose() {
    document.body.classList.remove('lock');
    modal.classList.remove('open')
    setTimeout(cleanCard, 200);
}

function escClose (event) {
    if (event.code !== "Escape") {
        return;
    } else {
        popupClose();
    }
}

window.addEventListener("keydown", escClose)

popupCloseBtn.addEventListener("click", popupClose);

pokemonsGallery.addEventListener("click", popupOpen)

