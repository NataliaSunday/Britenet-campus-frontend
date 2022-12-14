function getProd() {
    getProducts()
    .then( products => {

        const productsElement = document.querySelector('#products');
        products.forEach(product => {
            console.log(product)
            productsElement.innerHTML += `
            <article class="productBox">
            <img src="${product.imagePath}" alt="bean" class="productBox__img">
            <div class="productBox__info">
                    <p class="productBox__info__heading">${product.name}</p>
                    <p class="productBox__info__desc">${product.desc}</p>
                <div class="productBox__info__buy">
                    <p class="productBox__info__bou__price">${product.price}$</p>
                    <a href="shop.html" class="btn" role="button">Buy</a>
                </div>
            </div>
        </article>
            `
        })
    }).catch(e => {
        console.log(e);
    })
} 


function getProdByCat(cat) {
    getProductsByCategory(cat)
    .then( products => {

        const productsElement = document.querySelector('#products');
        products.forEach(product => {
            console.log(product)
            productsElement.innerHTML += `
            <article class="productBox">
            <img src="${product.imagePath}" alt="bean" class="productBox__img">
            <div class="productBox__info">
                    <p class="productBox__info__heading">${product.name}</p>
                    <p class="productBox__info__desc">${product.desc}</p>
                <div class="productBox__info__buy">
                    <p class="productBox__info__bou__price">${product.price}$</p> 
                    <a href="#" class="btn" role="button">Buy</a>
                </div>
            </div>
        </article>
            `
        })
    }).catch(e => {
        console.log(e);
    })
} 


const url = window.location.search;
const params = new URLSearchParams(url);

if(params.has('productCategory')){
    const categortId = params.get('productCategory');
    getProdByCat(categortId);
}


