getCategory()
.then( category => {

    const categoryElement = document.querySelector('#navMenu');
    category.forEach(category => {
        categoryElement.innerHTML += `
        <p class="navShop__list__item" role="listitem" onclick="getProdByCat(${category.id})">${category.name}</p>
        `
    })
}).catch(e => {
    console.log(e);
})
