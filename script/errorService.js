

function errorService(com, isGood) {

   if(isGood == false){
        let article = document.createElement('article');
        article.innerHTML =  `
        <article class="announcement announcement--error">
            <p>${com}</p>
        </article>
        `
        document.body.insertAdjacentElement('afterbegin', article);
        setTimeout(()=>{
            article.remove();
        },8000);
    
   }else{

        let article = document.createElement('article');
        article.innerHTML =  `
        <article class="announcement announcement--good">
            <p>${com}</p>
        </article>
        `
        document.body.insertAdjacentElement('afterbegin', article);
        setTimeout(()=>{
            article.remove();
        },8000);
   }
   
    
}