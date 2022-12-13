const getProducts = async() => {
    try{
        const response = await fetch('http://localhost:8081/api/v1/product')
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}

    
const getProductsByCategoryId = async(id) => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/product/productCategory=${id}`)
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
