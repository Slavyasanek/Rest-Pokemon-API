const nameHandler = document.querySelector('.pokemon-name')
const imagesHandler = document.querySelector('.modal__images');
const longDescr = document.querySelector('.modal__long-descr');
import { renderImages } from "./renderImages";


const qualityItems = {
    id: document.querySelector('.js-id'),
    experience: document.querySelector('.js-exper'),
    height: document.querySelector('.js-height'),
    weight: document.querySelector('.js-weight'),
    order: document.querySelector('.js-order'),
    pokieAbilities: document.querySelector('.js-abilities'),
    types: document.querySelector('.js-types'),
    stats: document.querySelector('.js-stats'),
    moves: document.querySelector('.js-moves'),
}


const renderItems = (array) => {
    if (array.length !== 0) {
        const heldItems = array.map(item => {
            return `<li class="modal__item">${item.item.name}</li>`
        }).join("");
        longDescr.insertAdjacentHTML("beforeend", `<div class="modal__stuff js-held-items">
        <h2 class="modal__subtitle">Held items</h2><ul class="modal__list">${heldItems}</ul></div>`)
    }
}

export const renderCard = (data) => {
    const { abilities, base_experience,
        height, held_items, id, sprites, moves, name, order, stats, types, weight
    } = data;

    nameHandler.textContent = name;
    qualityItems.id.textContent = id;
    if (base_experience !== null) {
        qualityItems.experience.textContent = base_experience;
    } else {
        qualityItems.experience.textContent = `unevaluated yet`;
    }
    qualityItems.height.textContent = height;
    qualityItems.weight.textContent = weight;
    qualityItems.order.textContent = order;

    imagesHandler.innerHTML = renderImages(sprites)

    qualityItems.pokieAbilities.innerHTML = abilities.map(ability => {
        return `<li class="modal__item"> &#9734; ${ability.ability.name}</li>`
    }).join("")
    qualityItems.types.innerHTML = types.map(type => {
        return `<li class="modal__item"><p class="card__type" data-type="${type.type.name}">${type.type.name}</p></li>`
    }).join("")
    renderItems(held_items);
    const statTable = stats.map(stat => {
        return `<tr>
        <td>${stat.stat.name}</td>
        <td>${stat.effort}</td>
        <td>${stat.base_stat}</td>
    </tr>`
    }).join("");
    qualityItems.stats.innerHTML = statTable;
    const movesEdit = moves.map(({move}) => {
        return `<li class="modal__moves-item">${move.name}</li>`
    }).join("")
    qualityItems.moves.innerHTML = movesEdit;
}

export const cleanCard = () => {
    nameHandler.textContent = "";
    imagesHandler.innerHTML = "";
    for (const item in qualityItems) {
        item.innerHTML = "";
    }
    const heldItems = document.querySelector('.js-held-items');
    if (heldItems) {
        heldItems.remove();
    }
}