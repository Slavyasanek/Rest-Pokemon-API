import throttle from "lodash.throttle";

const iconTop = document.querySelector('.icon-top');
const header = document.querySelector('.header');

const scrollShow = () => {
    if (window.scrollY > header.offsetHeight) {
        iconTop.classList.add('shown');
    } else {
        iconTop.classList.remove('shown');
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.addEventListener("scroll", throttle(scrollShow, 1000));
iconTop.addEventListener("click", scrollToTop);

