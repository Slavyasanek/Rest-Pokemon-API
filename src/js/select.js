import NiceSelect from 'nice-select2/dist/js/nice-select2';

const renderSelect = () => {
    const selectItem = document.querySelector('.js-select')

    if (selectItem) {
        new NiceSelect(selectItem, {
            searchable: true, // false
            placeholder: 'select',
            searchtext: 'Choose option',
            selectedtext: 'geselecteerd',
        });
    }
}
renderSelect();
