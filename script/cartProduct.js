window.addEventListener('load', function () {

    if(localStorage.getItem('token')){
        getCartContent();
        getUserData();
        getUserOrderData();
        let cart = document.getElementById('main--cart');
        cart.classList.remove('displayNone');   
    }else{
        let cart = document.getElementById('main--cart');
        cart.classList.add("displayNone");
       window.location.href = "login.html";
    }
});

function getCartContent(){
    
    getCartContentOfUser()
    .then( cartProduct => {
        console.log(cartProduct)
        let totalPrice = 0;
        if(cartProduct.length  != 0){
            let cartProductElement = document.querySelector('#cart');
            cartProduct.forEach(cartProduct => {
          console.log(cartProduct.product.imagePath)
          totalPrice += cartProduct.price;
                cartProductElement.innerHTML += `
                <tr class="table__row">
                        <td class="table__col table__col--svg" onclick=" deletePermission(this, ${cartProduct.idCartProduct})"><svg class="table--svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;"xml:space="preserve"><g><path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></td>
                        <td class="table__col"><img src="${cartProduct.product.imagePath}" class="cart__img"></td>
                        <td class="table__col">${cartProduct.product.name}</td>
                        <td class="table__col">${cartProduct.howMany}</td>
                        <td class="table__col">${cartProduct.price}$</td>
                    </tr>
                `
            })
      
            cartProductElement.innerHTML += `
            <tr class="table__row">
                    <td colspan="4" class="table__col table__totalPrice">Total Price:</td>
                    <td class="table__col "><span id="totalPrice">${totalPrice}</span>$</td>
                </tr>
            `
        }else{
            let cartProductElement = document.querySelector('#cart');
            cartProductElement.innerHTML += 
            `
            <tr class="table__row">
                <td class="table__col" colspan="4">Your cart is empty</td>
                <td class="table__col"></td>
                <td class="table__col"></td>
                <td class="table__col"></td>
                <td class="table__col"></td>
            </tr>
            `
        }
    }).catch(e => {
        console.log(e);
    })
}

function deleteCartProduct(target, idCartProduct){
   
    errorService("Product deleted from your cart", true)
    delCartProductOne(idCartProduct)
    .then(
        target.parentElement.remove().
        getCartContentOfUser()          
    ).catch(e => {
        console.log(e);
    })
}
function  deletePermission(target, idCartProduct){
  
    delScreen= document.getElementById("delPermission");
    delScreen.classList.remove("displayNone");

    const btnYes = document.getElementById("delPermissionYes");
    const btnNo = document.getElementById("delPermissionNo");

    btnYes.addEventListener('click', () => {
        delScreen.classList.add("displayNone");
        deleteCartProduct(target, idCartProduct); 
   })
   btnNo.addEventListener('click', () => {
        delScreen.classList.add("displayNone");
   })
}