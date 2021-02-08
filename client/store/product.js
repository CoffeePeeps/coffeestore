import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const LOAD_PRODUCT = 'LOAD_PRODUCT'


// Action Creator
const _loadProducts = (products) =>{
    return {
        type: LOAD_PRODUCTS,
        products
    };
};

const _loadProduct = (product) =>{
    return {
        type: LOAD_PRODUCT,
        product
    };
};

// Thunk
//not sure if a try catch is needed here, I don't think it hurts but pretty
//sure prof did not use them would like to know the differnce
export const loadProducts = () =>{
    console.log('in thunk');
    return async(dispatch)=>{
        const products = (await axios.get('/api/products')).data;
        
        dispatch(_loadProducts(products));
    }
};

export const loadProduct = (id) =>{
    console.log('in thunk');
    return async(dispatch)=>{
        const product = (await axios.get(`/api/products/${id}`)).data;
        
        dispatch(_loadProduct(product));
    }
};

// Reducer
//state is not an array??
export default function(state = [], action) {
    console.log('in reducer');
    console.log(action)
    switch (action.type) {   
        case LOAD_PRODUCTS:
            return action.products;
        case LOAD_PRODUCT:
                return action.product;    
        default:
            return state;
    }
}