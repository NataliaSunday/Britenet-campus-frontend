const getProducts = async() => {
    try{
        const response = await fetch('http://localhost:8081/api/v1/product')
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}

const getProductsByCategory = async( productCategoryId ) => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/product/productCategory=${productCategoryId }`)
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}
    
const getProductById = async ( productId ) => {
    try{
        const response = await fetch(`http://localhost:8081/api/v1/product/${productId}`)
        const json = await response.json();
        return Promise.resolve(json);
    }catch (e) {
        return Promise.reject(e);
    }
}