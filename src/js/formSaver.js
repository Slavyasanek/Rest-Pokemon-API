import throttle from "lodash.throttle";

const searchBox = document.querySelector('.header__search');
const KEY_SEARCH_VALUE = "query";

const updateStorage = () => {
    localStorage.setItem(KEY_SEARCH_VALUE, searchBox.string.value);
} 

searchBox.addEventListener("input", throttle(updateStorage, 3000));

const fillSearch = () => {
    if (localStorage.getItem(KEY_SEARCH_VALUE)) {
        searchBox.string.value = localStorage.getItem(KEY_SEARCH_VALUE);
    }
}

window.addEventListener("load", fillSearch)