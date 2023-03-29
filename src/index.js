import './js/fetch';
import './js/randomNum';
import './js/renderGallery';
import NiceSelect from 'nice-select2/src/js/nice-select2';



const renderSelect = () => {
    const selectItem = document.querySelector('.header__select')
    if (selectItem) {
        return NiceSelect.bind(selectItem, {
            searchable: true, // false
            placeholder: 'select',
            searchtext: '...',
            selectedtext: 'geselecteerd',
        });
    }
}

renderSelect();