import './js/fetch';
import './js/randomNum';
import './js/renderGallery';
import NiceSelect from 'nice-select2/src/js/nice-select2';

const selectItem = document.querySelector('.header__select')

const renderSelect = (select) => {
    if (select) {
        NiceSelect.bind(select, {
            searchable: true, // false
            placeholder: 'select',
            searchtext: '...',
            selectedtext: 'geselecteerd',
        });
    }
}

renderSelect(selectItem)