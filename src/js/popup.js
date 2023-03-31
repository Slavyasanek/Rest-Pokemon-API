import { fetchOnePokemon } from "./fetch";
import { pokemonsGallery } from "./getPokys"

const popupCloseBtn = document.querySelector('.close-popup');
const modal = document.querySelector('.popup')

const nameHandler = document.querySelector('.pokemon-name')
const imagesHandler = document.querySelector('.modal__images');
const shortPokieDescription = document.querySelector('.js-short-descr');
const pokieAbilities = document.querySelector('.js-abilities');


function popupOpen() {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    renderInfo();
    document.body.classList.add('lock');
    modal.classList.add('open')
    popupCloseBtn.addEventListener("click", popupClose);
}

function popupClose() {
    document.body.classList.remove('lock');
    modal.classList.remove('open')
    popupCloseBtn.removeEventListener("click", popupClose)
    setTimeout(cleanCard, 800);
    // cleanCard();
}

pokemonsGallery.addEventListener("click", popupOpen)

const renderInfo = async () => {
    const pokieID = event.target.closest('li').dataset.pokemon;
    const pok = await fetchOnePokemon(pokieID);
    console.log(pok)
    renderCard(pok);
}

const renderImages = (data) => {
    console.log(data)
    const images = Object.entries(data);
    const updatedImages = images.map(image => {
        if (image[1] !== null) {
            if (typeof image[1] === 'string') {
                return `<li class="modal__images-item"><img src="${image[1]}" alt="${image[0]}"><p>${image[0]}</p></li>`
            }
        }
    }).join("")
    const otherImages = renderObjImages(data.other);
    const versionImages = renderObjImages(data.versions);
     const allimgs = updatedImages.concat(otherImages, versionImages);
     return allimgs;
}

const renderObjImages = (arrayType) => {
    const reimage = [];
    const otherImgs = Object.entries(arrayType);
    otherImgs.flatMap(item => {
        for (const key in item[1]) {
            if (typeof item[1][key] === 'object') {
                let curDepartName = item[0];
                let curName = key;
                let curObj = item[1][key];
                for (const key in curObj) {
                    if (curObj[key] !== null && typeof curObj[key] !== `object`) {
                        reimage.push(`<li class="modal__images-item"><img src="${curObj[key]}" width="100" alt="${key}"><p>${curDepartName} -> ${curName} -> ${key}</p></li>`)
                    }
                }
            } else {
                if (item[1][key] !== null) {
                    reimage.push(`<li class="modal__images-item"><img src="${item[1][key]}" width="100" alt="${key}"><p>${item[0]}:${key}</p></li>`)
                }
            }
        }
    });
    return reimage.join("");
}

const renderCard = (data) => {
    const { abilities, base_experience, game_indices,
        height, held_items, id, sprites, moves, name, order, stats, types, weight
    } = data;
    nameHandler.textContent = name;
    const sprity = Object.keys(sprites);
    imagesHandler.innerHTML = renderImages(sprites)

}

const cleanCard = () => {
    nameHandler.textContent = "";
}