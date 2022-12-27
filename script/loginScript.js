const performLogin = () => {
    const nickname = document.querySelector('#nickname').value;
    const password = document.querySelector('#password').value;

    login(nickname, password)
    .then( _ => {
        window.location.href = "login.html";
    })
    .catch( e => {
        
        errorService("User doesn't exist or bad data", false);
        console.log(e);
    });
    return false;
}


function logout(){
    window.localStorage.clear();
    window.location.reload(true);
    errorService("You are log out", true);
}
if(!localStorage.getItem('token') ){
    let displays = document.querySelector('#logout');
    displays.classList.add('displayNone');

    let account = document.querySelector("#account");
    account.classList.add("displayNone");
    
}else{
    let displays = document.querySelector('#logout');
    displays.classList.remove('displayNone');

    let loginForm = document.querySelector("#loginForm");
    loginForm.classList.add("displayNone");
}

