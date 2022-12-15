getCategory()
.then( category => {

    const categoryElement = document.querySelector('#navMenu');
    category.forEach(category => {
        categoryElement.innerHTML += `
    <p  class="navShop__list__item" role="listitem" onclick="addParam(${category.id})">${category.name}</p>
        `
    })
}).catch(e => {
    console.log(e);
})

function addParam(id){

    const url = window.location.search;
    const params = new URLSearchParams(url);
    params.delete('productId')
    params.set('productCategory', id);
   
    window.location.search = params;
   
    window.location.href="/shop.html?"+params;
}