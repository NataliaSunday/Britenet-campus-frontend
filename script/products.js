
const url = window.location.search;
const params = new URLSearchParams(url);

if(params.has('productCategory')){
    const categortId = params.get('productCategory');
    getProdByCat(categortId);
}
if(params.has('productId')){
   
    const prodId = params.get('productId');
    getProdById(prodId);
}

function seeProduct(productId){
    const url = window.location.search;
    const params = new URLSearchParams(url);
    params.delete('productCategory')
    params.set('productId', productId);
    window.location.search = params;
}


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
                    <a href="#" class="btn" role="button" onclick=seeProduct(${product.id})>Buy</a>
                </div>
            </div>
        </article>
            `
        })
    }).catch(e => {
        console.log(e);
    })
} 

function getProdById(prodId) {  
    getProductById(prodId)

    .then( product => {

        const productsElement = document.querySelector('#products');
       productsElement.innerHTML = " ";
            console.log(product)
            productsElement.innerHTML += `
            <article class="productPage">
            <img src="${product.imagePath}" alt="bean" class="productPage__img">
            <div class="productPage__info">
                    <p class="productBox__info__heading">${product.name}</p>
                    <p class="productBox__info__desc">${product.desc}</p>
                <div class="productPage__info__buy">
                    <p class="productBox__info__bou__price">${product.price}$</p> 
                    <a href="#" class="btn" role="button" onclick="addToCart()">Buy</a>
                </div>
            </div>
        </article>
            `
        
    }).catch(e => {
        console.log(e);
    })
} 

const addToCart = async() => {
    
     if(localStorage.getItem('token')){
        const url = window.location.search;
        const params = new URLSearchParams(url);
       
        let prodId = params.get('productId');
       
            let data = new FormData();
            data.append("idProduct", prodId);
            data.append("idCart",  64);
            data.append("howMany",9);
            data.append("price", 99.0)
            
         
            let dataJSON = Object.fromEntries(data.entries()); 
           
                 try{
                     const response = await fetch(`http://localhost:8081/api/v1/cartProduct`, {
                         headers: {
                             'Content-type' : 'application/json',
                             'Authorization' : localStorage.getItem('token')
                         },
                         method : 'POST',
                         body : JSON.stringify(dataJSON)
                     });
                     const json = await response.json();
                     alert("Thank you for your order");
                     return Promise.resolve(json);
                 }catch (e) {
                     return Promise.reject(e);
                 }
         }else{
            alert("You need login");
         }
         
     }
   
