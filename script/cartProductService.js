const getCartContentOfUser = async() => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/cartProduct/userCart`, {
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
    
