const addOrder = async(e) => {
   e.preventDefault();

  
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = yyyy +  '-' + mm + '-' + dd;
    console.log(today)

   let data = new FormData();

   data.append("orderDate",  today);
   data.append("country", document.getElementById("country").value);
   data.append("city", document.getElementById("city").value);
   data.append("homeNumber", document.getElementById("homeNumber").value);
   data.append("zipCode", document.getElementById("zipCode").value);
   data.append("phoneNumber", document.getElementById("phoneNumber").value);
   data.append("eMail", document.getElementById("eMail").value);
   data.append("orderStatus", "new");
   data.append("isPaid", true);
   data.append("totalPrice", 100.00);
   data.append("discount", 0.0)

   let dataJSON = Object.fromEntries(data.entries()); 
  
        try{
            const response = await fetch(`http://localhost:8081/api/v1/order`, {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : localStorage.getItem('token'),
                    'cartId': localStorage.getItem("cartId")
                },
                method : 'POST',
                body : JSON.stringify(dataJSON)
            });
            if(response.status === 200){
                const json = await response.json();
                console.log(json);
                addProductOrder();
                errorService("Thank you for your order", true);
                setTimeout(()=>{
                   
                    window.location.href="/shop.html"
                    return Promise.resolve(json);
                },4000);
               
            }else{
                errorService("Order can't be done", false)
            }
        }catch (e) {
            return Promise.reject(e);
        }
}

const addProductOrder = async () => {
   
    try{
        const response = await fetch(`http://localhost:8081/api/v1/cartProduct/addCartProductToUserProduct`, {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
            },
            method : 'POST',
           
        });
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
