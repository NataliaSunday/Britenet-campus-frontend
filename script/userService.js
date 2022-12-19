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
        console.log(userData)
        const userOrders = document.querySelector("#userOrders");
        userData.forEach( userOrder => {
            userOrders.innerHTML += 
            `
            <tr>
               <td class="cart__table__col">${userOrder.idOrder}</td>
                <td class="cart__table__col">${userOrder.orderDate}</td>
                <td class="cart__table__col">${userOrder.orderStatus}</td>
                <td class="cart__table__col">${userOrder.totalPrice}$</td>
            </tr>
            `
        })

           
    }).catch(e => {
        console.log(e);
    })
}