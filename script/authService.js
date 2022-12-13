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
        console.log(nickname + " " + password)
        const json =await response.json();
        const token = json.token;
        localStorage.setItem('token', token);
console.log(token)
        return Promise.resolve();

    }catch (e) {
        return Promise.reject(e);
    }
}
/*
const getOrder = () => {
    const token = localStorage.getItem('token');
    const response = fetch('...', {
        method: 'GET',
        headers: {
            'Auyhorization' : token
        }
    })
}/*/