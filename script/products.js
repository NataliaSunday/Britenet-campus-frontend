function getProd() {
    getProducts()
.then( products => {

    const productsElement = document.querySelector('#main');
    products.forEach(product => {
        console.log(product)
        productsElement.innerHTML += `
        <article class="productBox">
        <img src="src/img/products/WhiteBeans/2 - 640.jpg" alt="bean" class="productBox__img">
        <div class="productBox__info">
                <p class="productBox__info__heading">${product.name}</p>
                <p class="productBox__info__desc">${product.desc}</p>
            <div class="productBox__info__buy">
                <p class="productBox__info__bou__price">${product.price}$</p>
                <a href="shop.html" class="btn btn--smaller" role="button">SHOP</a>
            </div>
        </div>
    </article>
        `
    })
}).catch(e => {
    console.log(e);
})
} 
function getProdByCat(id) {
    getProductsByCategoryId(id)
.then( products => {

    const productsElement = document.querySelector('#main');
    productsElement.innerHTML = '';
    products.forEach(product => {
        console.log(product)
        productsElement.innerHTML += `
        <article class="productBox">
            <img src="${product.imagePath}" alt="bean" class="productBox__img">
            <div class="productBox__info">
                <div class="productBox__info__desc>
                    <p class="productBox__info__desc__heading">${product.name}</p>
                    <p class="productBox__info__desc__desc">${product.desc}</p>
                </div>
                <div class="productBox__info__buy">
                    <p class="productBox__info__bou__price">${product.price}$</p>
                    <a href="shop.html" class="btn btn--smaller " role="button">SHOP</a>
                </div>
            </div>
        </article>
        `
    })
}).catch(e => {
    console.log(e);
})
} 