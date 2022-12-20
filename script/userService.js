const getUserDataReq= async() => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/order/userOrder`, {
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

function getUserData(){
getUserDataReq()
    .then(userData => {

            const accountData = document.querySelector("#accountData");
            accountData.innerHTML += 
            `
                <li class="listItem">Name: ${userData[0].user.name} </li>
                <li class="listItem">Surname: ${userData[0].user.surname}</li>
                <li class="listItem">Nickname: ${userData[0].user.nickname}</li>
                <li class="listItem">Country: ${userData[0].user.country}</li>
                <li class="listItem">City: ${userData[0].user.city}</li>
                <li class="listItem">Home number: ${userData[0].user.homeNumber}</li>
                <li class="listItem">Zip Code: ${userData[0].user.zipCode}</li>
                <li class="listItem">Phone number: ${userData[0].user.phoneNumber}</li>
                <li class="listItem">E-mail: ${userData[0].user.eMail}</li>
            `
        
        const userOrders = document.querySelector("#userOrders");
        userData.forEach( userOrder => {
            userOrders.innerHTML += 
            `
            <tr onclick="seeOrder(${userOrder.idOrder})">
               <td class="table__col">${userOrder.idOrder}</td>
                <td class="table__col">${userOrder.orderDate}</td>
                <td class="table__col">${userOrder.orderStatus}</td>
                <td class="table__col">${userOrder.totalPrice}$</td>
            </tr>
            `
        })
           
    }).catch(e => {
        console.log(e);
    })
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


function register(e){
    e.preventDefault();
    let register = document.querySelector("#register");
    register.classList.remove("displayNone");
    

}

function addUser(e){
    e.preventDefault();
}