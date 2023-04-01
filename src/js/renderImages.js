export const renderImages = (data) => {
    const images = Object.entries(data);
    const updatedImages = images.map(image => {
        if (image[1] !== null) {
            if (typeof image[1] === 'string') {
                return `<li class="modal__images-item"><img src="${image[1]}" alt="${image[0]}"><div class="modal__images-descr"><p>${image[0].replaceAll("_", " ")}</p></div></li>`
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
                        reimage.push(`<li class="modal__images-item"><img src="${curObj[key]}" alt="${key}"><div class="modal__images-descr">
                        <p>${curDepartName} &#9790; ${curName} &#9790; ${key.replaceAll("_", " ")}</p></div></li>`)
                    }
                }
            } else {
                if (item[1][key] !== null) {
                    reimage.push(`<li class="modal__images-item"><img src="${item[1][key]}" alt="${key}"><div class="modal__images-descr">
                    <p>${item[0]} &#9790; ${key.replaceAll("_", " ")}</p></div></li>`)
                }
            }
        }
    });
    return reimage.join("");
}