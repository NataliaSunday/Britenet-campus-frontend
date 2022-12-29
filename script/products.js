
function seeProduct(productId){
    const url = window.location.search;
    const params = new URLSearchParams(url);
    params.delete('productCategory')
    params.set('productId', productId);
    window.location.search = params;
}

getProd();
function getProd() {
    getProducts()
    .then( products => {

      for(let i = 0; i< products.length; i= i +4){
        const productsElement = document.querySelector('#theBestProducts');

        productsElement.innerHTML += `
            <article class="mainProductBox">
                <img src="${products[i].imagePath}" alt="bean" class="mainProductBox__img">
                <div class="mainProductBox__info">
                    <p class="mainProductBox__info__heading">${products[i].name}</p>
                  
                <div class="mainProductBox__info__buy">
                    <p class="mainProductBox__info__buy__price">${products[i].price}$</p> 
                    <a href="#" class="btn" role="button" onclick=seeProduct(${products[i].id})>Buy</a>
                </div>
                </div>
            </article>
        `
      }

      for(let z = products.length-1; z < products.length; z= z-4){
   
        const productsElement = document.querySelector('#newProducts');

        productsElement.innerHTML += `
        <article class="mainProductBox">
                <img src="${products[z].imagePath}" alt="bean" class="mainProductBox__img">
                <div class="mainProductBox__info">
                    <p class="mainProductBox__info__heading">${products[z].name}</p>
                  
                <div class="mainProductBox__info__buy">
                    <p class="mainProductBox__info__buy__price">${products[z].price}$</p> 
                    <a href="#" class="btn" role="button" onclick=seeProduct(${products[z].id})>Buy</a>
                </div>
                </div>
            </article>
        `
      }
    }).catch(e => {
        console.log(e);
    })
} 


function getProdByCat(cat) {
    getProductsByCategory(cat)
    .then( products => {

        const productsElement = document.querySelector('#products');
        const mainProducts = document.querySelector('#mainProducts');
        mainProducts.innerHTML = ' ';
     
        productsElement.innerHTML = "";
      
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

function getProdOpinion(prodId){

    getProductOpinion(prodId)
    .then( opinions => {
      
        const productsOpinions = document.querySelector('#opinions');
        productsOpinions.innerHTML = "";   
        productsOpinions.innerHTML = 
        `
        <article id="addOpinion" class="opinions__addOpinion">
            <div class="addOpinion__heading" id="addOpinionHeading">
            <p class="form__desc">Do you want share your opinion?</p>
            <a href="#" class="btn" onclick="addOpinion(event, ${prodId})">Add</a>
            </div>
       </article>
        `
        opinions.forEach( opinion => {
            productsOpinions.innerHTML += 
            `
            <article class="opinion">
                <div>
                    <div class="opinion__headingBox"> 
                        <p class="opinion__headingBox__heading">${opinion.user.nickname}</p>
                        <p class="opinion__headingBox__date">${opinion.opinionDate}</p>
                    </div>
                    <p class="opinion__rating" id="opinionRating"></p>
                </div>
                <p class="opinion__content">${opinion.opinionContent}</p>
            </article>
    
           `             
            });
                const rating = document.querySelectorAll("#opinionRating");
               for(let z = 0; z <= opinions.length; z++){
                     for(let i = 0; i <= opinions[z].rating; i++){
                         rating[z].innerHTML += '<svg version="1.1" class="opinionsSection__opinions__article__svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path style="fill:#FFE880;" d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon style="fill:#FFE880;" points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
                     }
                     
                    
                 }
    
  
  

    }).catch(e => {
        console.log(e);
    })
}

function addOpinion(e,prodId){
    e.preventDefault();
  
    const addOpinions = document.querySelector('#addOpinion');
    let rating = 0;
  

   addOpinions.innerHTML+= `

    <form class="form addOpinion__form displayNone" id="opinionForm" lang="en">
            <label for="opinion__content" class="form__label">Opinion</label>
            <textarea name="opinion__content"  id="opinion_content"  cols="30" rows="10"></textarea>

            <label for="opinion__rating" class="form__label">Rating</label>
            <div class="opinionRating" id="opinion__rating">
                <svg version="1.1" class="opinionsSection__opinions__article__svg addOpinion__star" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg version="1.1" class="opinionsSection__opinions__article__svg addOpinion__star" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg version="1.1" class="opinionsSection__opinions__article__svg addOpinion__star" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg version="1.1" class="opinionsSection__opinions__article__svg addOpinion__star" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                <svg version="1.1" class="opinionsSection__opinions__article__svg addOpinion__star" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 280.124 280.124" style="enable-background:new 0 0 280.124 280.124;" xml:space="preserve"><g><path d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"/><polygon points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 140.057,4.441 140.057,232.068 	"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>           
            </div>
           <input type="submit" class="btn btn--submit" value="Send opinion" >
           </form>
         ` ; 
         const form = document.getElementById("opinionForm");
         form.classList.toggle("displayNone");
        
        
         const stars = document.querySelectorAll(".addOpinion__star");
       

        stars.forEach( (star , index)=> {
            star.addEventListener("click", () => {
            stars.forEach( star  => {
                star.style.fill ="#FFE880";
            })
                for(let i = 0; i <= index; i++){
                    stars[i].style.fill = "#40798C"; 
                    rating = index +1; 
                }
            }) 
        });
        form.onsubmit = function(e){
            if(prodId != null && rating >0 ){
                e.preventDefault();
                insertOpinion( event, prodId, rating);
                form.classList.add("displayNone");
                stars.forEach( star  => {
                    star.style.fill ="#FFE880";
                })
                
            }else{
                e.preventDefault();
                errorService("Missing data.", false);
            }
        }
}
const insertOpinion = async(e, prodId,rating) => {
    e.preventDefault();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = yyyy +  '-' + mm + '-' + dd;
   

    let data = new FormData();
    data.append("idProduct", prodId);
    data.append("opinionDate", today);
    data.append("opinionContent", document.getElementById("opinion_content").value);
    data.append("rating", rating);
  

    let dataJSON = Object.fromEntries(data.entries()); 

    
    try{
        const response = await fetch("http://localhost:8081/api/v1/opinion", {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : localStorage.getItem('token'),
                
            },
            method : 'POST',
            body : JSON.stringify(dataJSON)
        });
        if(response.status === 200){
            const json = await response.json();
            console.log(json);
            
            errorService("Your opinion is added", true);
            setTimeout(()=>{
               
              
                return Promise.resolve(json);
            },4000);
           
        }else{
            errorService("Opinion can't be added", false)
        }
    }catch (e) {
        return Promise.reject(e);
    }
}

function getProdById(prodId) {  
    getProdOpinion(prodId);
    getProductById(prodId)
    

    .then( product => {

        const productsElement = document.querySelector('#products');
        const search = document.getElementById("searchBar");
        search.classList.add("displayNone");
        const mainProducts = document.querySelector('#mainProducts');
        mainProducts.innerHTML = ' ';
        productsElement.innerHTML = " ";
         
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
        let totalPrice = prodPrice * document.getElementById("howMany").value;
        let data = new FormData();
        data.append("idProduct", prodId);
        data.append("idCart",  cartId);
        data.append("howMany", document.getElementById("howMany").value);
        data.append("price", totalPrice)
            

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

        <form class="cart__form formDouble" onsubmit="registerUser(event)" lang="en">
            <h2 class="formDouble__heading">Put your date and click submit</h2><div class="formDouble__close" id="registerClose">&#10005;</div>
            
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



function searchBar(){
    let input = document.getElementById("serachInput");
    if(!input.classList.contains("displayNone")){
        getProductWhere();
   
    }else{
        input.classList.remove("displayNone");
    }
   
    input.addEventListener("keypress", (event) => {
        if(event.keyCode == 13){
            getProductWhere();
        }
    })
}
 function checkPage(page, pageCount){
    let prevBtn = document.getElementById("prevPage");
    let nextBtn = document.getElementById("nextPage");
    let lastPage = pageCount - 1;

    switch(page){
        case 0: 
            nextBtn.classList.remove("displayNone");
            prevBtn.classList.add("displayNone");
            break;
        
        case lastPage: 
            nextBtn.classList.add("displayNone");
            prevBtn.classList.remove("displayNone");
            break;
        default: 
        nextBtn.classList.remove("displayNone");
        prevBtn.classList.remove("displayNone");
        break;
    }

 }
 function getProductWhere() {  
    getProductWhereReq()
    .then( products => {
        let prevBtn = document.getElementById("prevPage");
        let nextBtn = document.getElementById("nextPage");
        nextBtn.classList.add("displayNone");
        prevBtn.classList.add("displayNone");

        const productsElement = document.querySelector('#products');
        const notFound = document.querySelector('#notFound');
        const mainProducts = document.querySelector('#mainProducts');
        
        mainProducts.innerHTML = "";
        notFound.innerHTML = "";
        productsElement.innerHTML = "";

        let page = 1;
        let pageLimit = 3;
        let allRecords = products.length;
        let pageCount = Math.ceil(allRecords/pageLimit);
   
        if(products.length > 0){
            
            if(products.length > pageLimit){
                checkPage(page, pageCount);
            }
            getPage(products, pageLimit,page);
           
            prevBtn.addEventListener("click", () => {
                page--;
                if(products.length > pageLimit){
                    checkPage(page,pageCount);
                }
                prevPage(products, pageLimit,page);           
            })
           nextBtn.addEventListener("click", () => {
            page++;
            if(products.length > pageLimit){
                checkPage(page,pageCount);
            }
            nextPage(products, pageLimit,page);
           })     
        }
         else{
            const notFound = document.querySelector('#notFound');
            notFound.innerHTML = 
            `
                <p class="form__desc">Sorry product not found</p>
            `
        }
    })
    .catch(e => {
        console.log(e);
    })
} 

function getPage(products, pageLimit){
    const productsElement = document.querySelector('#products');
    productsElement.innerHTML = "";
    
    for(let i = 0; i < pageLimit ; i++){
        
        productsElement.innerHTML += `
        <article class="productBox">
        <img src="${products[i].imagePath}" alt="bean" class="productBox__img">
        <div class="productBox__info">
                <p class="productBox__info__heading">${products[i].name}</p>
                <p class="productBox__info__desc">${products[i].desc}</p>
            <div class="productBox__info__buy">
                <p class="productBox__info__bou__price">${products[i].price}$</p> 
                <a href="#" class="btn" role="button" onclick=seeProduct(${products[i].id})>Buy</a>
                </div>
             </div>
         </article>
        `;  
    }
}

function nextPage(products, pageLimit,page){
    const productsElement = document.querySelector('#products');
    productsElement.innerHTML = "";
   
    let pivot = page * pageLimit;
    for(let i = pivot; i < pivot + pageLimit ; i++){
        
        productsElement.innerHTML += `
        <article class="productBox">
        <img src="${products[i].imagePath}" alt="bean" class="productBox__img">
        <div class="productBox__info">
                <p class="productBox__info__heading">${products[i].name}</p>
                <p class="productBox__info__desc">${products[i].desc}</p>
            <div class="productBox__info__buy">
                <p class="productBox__info__bou__price">${products[i].price}$</p> 
                <a href="#" class="btn" role="button" onclick=seeProduct(${products[i].id})>Buy</a>
                </div>
             </div>
         </article>
        `;
        
    } 
   
}
function prevPage(products, pageLimit,page){
    const productsElement = document.querySelector('#products');
    productsElement.innerHTML = "";

    let pivot = page * pageLimit;
    for(let i = pivot; i < pivot + pageLimit ; i++){
        
        productsElement.innerHTML += `
        <article class="productBox">
        <img src="${products[i].imagePath}" alt="bean" class="productBox__img">
        <div class="productBox__info">
                <p class="productBox__info__heading">${products[i].name}</p>
                <p class="productBox__info__desc">${products[i].desc}</p>
            <div class="productBox__info__buy">
                <p class="productBox__info__bou__price">${products[i].price}$</p> 
                <a href="#" class="btn" role="button" onclick=seeProduct(${products[i].id})>Buy</a>
                </div>
             </div>
         </article>
        `;  
    } 
}

