const performLogin = () => {
    const nickname = document.querySelector('#nickname').value;
    const password = document.querySelector('#password').value;

    login(nickname, password)
    .then( _ => {
        alert('Logged In!');
        document.dispatchEvent(new CustomEvent('login_event'));
    })
    .catch( e => {
        alert('Error!');
        console.log(e);
    });
    return false;
}

function auth(){
    const formBox = document.querySelector('#main');
   
        formBox.innerHTML += `
       
        <form class="login__form" onsubmit="return performLogin()">
        <p class="login__paragraph">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, debitis. Eos facilis nulla sed nesciunt assumenda nemo culpa, distinctio beatae quas architecto aperiam laboriosam magnam rem praesentium, quisquam quo inventore?</p>
        <label for="username" class="login__label">Username:</label>
        <input type="text" id="username" class="login__input">
        <label for="password" class="login__label">Password:</label>
        <input type="password" id="password" class="login__input">
        <input type="submit" class="login__btn btn" >
        </form>
        `
}