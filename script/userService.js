const getUserOrderDataReq= async() => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/order/userOrder`, {
            'headers': {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
const getUserDataReq= async ( ) => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/user/getUser`, {
            'headers': {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
       
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
const getUserOrderByIdReq = async( orderId ) => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/orderProduct/userOrder/${orderId}`, {
            'headers': {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}

function getUserOrderData(){
getUserOrderDataReq()
    .then(userOrder => {
        if(userOrder.length > 0){
            const userOrders = document.querySelector("#userOrders");
            userOrder.forEach( userOrder => {
               
                userOrders.innerHTML += 
                `
                <tr onclick="seeOrder(${userOrder.idOrder})">
                   <td class="table__col">${userOrder.idOrder}</td>
                    <td class="table__col">${userOrder.orderDate}</td>
                    <td class="table__col">${userOrder.orderStatus}</td>
                    <td class="table__col">${userOrder.totalPrice}$</td>
                </tr>
                `
            }  
        )}else{
            const userOrders = document.querySelector("#userOrders");
            userOrders.innerHTML += 
                `
                <tr>
                    <td colspan="4" class="table__col">You dont have any orders</td>
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

function getUserData(){
    getUserDataReq()
    .then(userData => {
        const accountData = document.querySelector("#accountData");
        accountData.innerHTML += 
        `
            <li class="listItem">Name: ${userData.name} </li>
            <li class="listItem">Surname: ${userData.surname}</li>
            <li class="listItem">Nickname: ${userData.nickname}</li>
            <li class="listItem">Country: ${userData.country}</li>
            <li class="listItem">City: ${userData.city}</li>
            <li class="listItem">Home number: ${userData.homeNumber}</li>
            <li class="listItem">Zip Code: ${userData.zipCode}</li>
            <li class="listItem">Phone number: ${userData.phoneNumber}</li>
            <li class="listItem">E-mail: ${userData.eMail}</li>
        `
    }    
       
    )
}



function seeOrder(orderId){
    getUserOrderByIdReq(orderId)
    .then(userOrder => {
        
        const account = document.querySelector("#account");
        account.classList.add("displayNone");

        const userOrderSec= document.querySelector("#orderHistory");
        userOrderSec.classList.remove("displayNone");

        const orderData = document.querySelector("#orderData");

        orderData.innerHTML += 
        `
            <li class="listItem">Order Id: ${userOrder[0].idOrder} </li>
            <li class="listItem">Order date: ${userOrder[0].order.orderDate}</li>
            <li class="listItem">Status: ${userOrder[0].order.orderStatus}</li>
          
            <li class="listItem">Addres: ${userOrder[0].order.city} ${userOrder[0].order.homeNumber} ${userOrder[0].order.zipCode} ${userOrder[0].order.country}</li>
            <li class="listItem">E-mail: ${userOrder[0].order.eMail}</li>
            <li class="listItem">Phone Number: ${userOrder[0].order.phoneNumber}</li>
            <li class="listItem">Total price: ${userOrder[0].order.totalPrice}</li>
            <li class="listItem">Is paid: ${userOrder[0].order.isPaid}</li>
            <a href="login.html" class="btn btn--back">Back</a>
        `;
    
        const orderInfo = document.querySelector("#orderInfo");
     
        userOrder.forEach( userOrder => {
            console.log(userOrder.product.name);
            orderInfo.innerHTML += 
            `
          <tr>
            <td class="table__col"></td>
            <td class="table__col">${userOrder.product.name}</td>
            <td class="table__col">${userOrder.howMany}</td>
            <td class="table__col">${userOrder.product.price}$</td>
          </tr>
            `
        }   
        )
    }).catch(e => {
        console.log(e);
    })
}



const registerUser= async(e) => {
    e.preventDefault();
    let data = new FormData();

    data.append("name",  document.getElementById("register_name").value);
    data.append("surname",  document.getElementById("register_surname").value);
    data.append("password",  document.getElementById("register_user_password").value);
    data.append("nickname",  document.getElementById("register_nickname").value);
    data.append("country", document.getElementById("register_country").value);
    data.append("city", document.getElementById("register_city").value)
    data.append("homeNumber", document.getElementById("register_homeNumber").value)
    data.append("zipCode", document.getElementById("register_zipCode").value)
    data.append("phoneNumber", document.getElementById("register_phoneNumber").value);
    data.append("eMail", document.getElementById("register_eMail").value)
  

   let dataJSON = Object.fromEntries(data.entries()); 
    try{
        const response = await fetch(`http://localhost:8081/api/v1/auth/register`, {
            headers: {
                'Content-type' : 'application/json',
            },
            method : 'POST',
            body : JSON.stringify(dataJSON)
        });
        if(response.status === 200){
            const url = window.location.search;
            const params = new URLSearchParams(url);
            errorService("User added." ,true);
            setTimeout(()=>{
                params.delete('addUser');
                window.location.search = params;
            },4000);
           
        return Promise.resolve();}
        else{
            errorService("User can't be added. Check data." ,false);
            return Promise.reject();
        }
    }catch (e) {
        return Promise.reject(e);
    }
}


function registerStart(e){
    e.preventDefault();
    const url = window.location.search;
    const params = new URLSearchParams(url);
    params.set("addUser", "a");
    window.location.search = params;
}

