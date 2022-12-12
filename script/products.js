getProducts()
.then( products => {

    const productsElement = document.querySelector('#products');
    products.forEach(product => {
        productsElement.innerHTML += `
        <article class="productBox">
        <img src="src/img/products/WhiteBeans/2 - 640.jpg" alt="bean" class="productBox__img">
        <div class="productBox__info">
            <p class="productBox__info__heading"${product.name}</p>
            <p class="productBox__info__desc">${product.desc}</p>
            <div class="productBox__info__buy">
                <p class="productBox__info__bou__price">${product.price}</p>
                <a href="shop.html" class="btn btn--smaller" role="button">SHOP</a>
            </div>
        </div>
    </article>
        `
    })
}).catch(e => {
    console.log(e);
})