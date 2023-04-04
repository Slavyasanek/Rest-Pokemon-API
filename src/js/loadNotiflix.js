import Notiflix from "notiflix";

export const loadItems = () => {
    Notiflix.Loading.pulse({
        backgroundColor: 'rgba(18, 56, 96, 0.64)',
        svgColor: 'rgba(245, 255, 124, 1)',
    });
}

export const finishLoad = () => {
    Notiflix.Loading.remove();
}