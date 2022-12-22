
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

   if(params.has('productwhere')){
        getProductWhere();
    }
     if(params.has('addUser')){ //register window display

        let main = document.getElementById('mainUser');

        main.innerHTML += `
        
        <section class="register" id="register">

        <form class="cart__form formDouble" onsubmit="registerUser(event)">
            <h2 class="formDouble__heading">Put your date and click submit</h2>
            <label for="register_name" class="form__label">Name:</label>
            <input type="text" class="form__input" placeholder="Jhonn" id="register_name"  required pattern="[A-Za-z]*">
    
            <label for="register_surname" class="form__label">Surname:</label>
            <input type="text" class="form__input" placeholder="Doe" id="register_surname" required pattern="[A-Za-z]*">
    
            <label for="register_user_password" class="form__label">Password:</label>
            <input type="password" class="form__input" placeholder="passsword" id="register_user_password" required>
    
            <label for="register_nickname" class="form__label">Nickname:</label>
            <input type="text" class="form__input" placeholder="Nickname" id="register_nickname" required >
    
            <label for="register_country" class="form__label">Country:</label>
            <input type="text" class="form__input" placeholder="Poland" id="register_country" required pattern="[A-Za-z]*">
    
            <label for="register_city" class="form__label">City:</label>
            <input type="text" class="form__input" placeholder="Lublin" id="register_city" required pattern="[A-Za-z]*">
    
            <label for="register_homeNumber" class="form__label">Home number:</label>
            <input type="text" class="form__input" placeholder="79F" id="register_homeNumber" maxlength="5" required>
    
            <label for="register_zipCode" class="form__label">zip code:</label>
            <input type="text" class="form__input" placeholder="20-123" id="register_zipCode" maxlength="6" required pattern="[0-9]{2}-[0-9]{3}">
    
            <label for="register_phoneNumber" class="form__label">Phone number:</label>
            <input type="text" class="form__input" placeholder="000000000" id="register_phoneNumber" required maxlength="9" pattern="[0-9]{9}">
    
            <label for="register_eMail" class="form__label">E-mail:</label>
            <input type="email" class="form__input" placeholder="your@email.com" id="register_eMail" required >
    
            <input type="submit" class="btn btn--submit btn--back" >
          </form>
         
    </section>
    
    `
     }
    
     function searchBar(){
        let input = document.getElementById("serachInput");
        if(!input.classList.contains("displayNone")){

            const url = window.location.search;
            const params = new URLSearchParams(url);
           
            params.set('productWhere', "name");
           
            window.location.search = params;
           
            window.location.href="/shop.html?"+params;
            

       
        }else{
            input.classList.remove("displayNone");
        }
        
       
       
     }




     function getProductWhere() {  
        getProductWhereReq()
        .then( products => {
           
            console.log(products);
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
    
const getProductWhereReq= async () => {
   let inputContent =  document.getElementById("serachInput").value;
   console.log(inputContent);
    try{
        const response = await fetch(`http://localhost:8081/api/v1/product/productWhere=${inputContent}`, {
            
            method : 'GET',
           
        });
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
