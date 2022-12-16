const addOrder = async(e) => {
   e.preventDefault();
   

   let data = new FormData();

   data.append("orderDate",  "2021-12-11");
   data.append("country", document.getElementById("country").value);
   data.append("city", document.getElementById("city").value)
   data.append("homeNumber", document.getElementById("homeNumber").value)
   data.append("zipCode", document.getElementById("zipCode").value)
   data.append("phoneNumber", document.getElementById("phoneNumber").value);
   data.append("eMail", document.getElementById("eMail").value)
   data.append("orderStatus", "finished");
   data.append("isPaid", true);
   data.append("totalPrice", 100.00);
   data.append("discount", 0.0)

   let dataJSON = Object.fromEntries(data.entries()); 
  
        try{
            const response = await fetch(`http://localhost:8081/api/v1/order`, {
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : localStorage.getItem('token')
                },
                method : 'POST',
                body : JSON.stringify(dataJSON)
            });
            const json = await response.json();


            addProductOrder();
            alert("Thank you for your order");
            return Promise.resolve(json);
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
        alert("Thank you for your order");
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
