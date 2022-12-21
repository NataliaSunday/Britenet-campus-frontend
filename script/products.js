
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
                   <div>
                        <p class="productBox__info__heading">${product.name}</p>
                        <p class="productBox__info__desc">${product.desc}</p>
                   </div>
            
                    <div class="productPage__info__buy">
                   
                        <label for="howMany" class="form__label"> <p class="productBox__info__bou__price">${product.price}$</p> </label>
                        <input type="number" class="form__input" id="howMany" value="1"> 
                        <a href="#" class="btn btn--productBuy" role="button" onclick="addToCart(${product.price})">Buy</a>
                    </div> 
                  
            </div>
        </article>
            `
    }).catch(e => {
        console.log(e);
    })
} 

const addToCart = async(prodPrice) => {
     if(localStorage.getItem('token')){
        const url = window.location.search;
        const params = new URLSearchParams(url);
       
        let prodId = params.get('productId');
        let cartId = localStorage.getItem('cartId');
   
        let data = new FormData();
        data.append("idProduct", prodId);
        data.append("idCart",  cartId);
        data.append("howMany", document.getElementById("howMany").value);
        data.append("price", prodPrice)
            

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
                     errorService("Product added to cart", true);
                     return Promise.resolve(json);
                 }catch (e) {
                     return Promise.reject(e);
                 }
         }else{
            errorService("You need to login", false);
         }
         
     }
   

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
   
     