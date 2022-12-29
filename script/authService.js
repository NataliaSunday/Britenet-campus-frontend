const login = async (nickname, password) => {
    try{
        const response = await fetch('http://localhost:8081/api/v1/auth',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nickname:nickname,
                password:password
            })

        });
        if(response.status === 200){
            const json =await response.json();
            const token = json.token;
            localStorage.setItem('token', token);
            getUserCart();
            return Promise.resolve();
    
        }else{
            localStorage.removeItem('token');
            return Promise.reject();
        }
      
    }catch (e) {
        localStorage.removeItem('token');
        return Promise.reject(e);
    }
}

const getUserCart = async() =>{

    try{
        const response = await fetch('http://localhost:8081/api/v1/cart/cartUser',{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : localStorage.getItem('token')
            }
        });
            const json = await response.json();
            const cartId = json.idCart;
            localStorage.setItem('cartId', cartId);
            return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }

}

