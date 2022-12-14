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
            console.log(nickname + " " + password)
            const json =await response.json();
            const token = json.token;
            localStorage.setItem('token', token);
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