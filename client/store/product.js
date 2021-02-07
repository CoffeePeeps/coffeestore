import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

// Action Creator
const _loadProducts = (products) =>{
    return {
        type: LOAD_PRODUCTS,
        products
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

// Reducer
//state is not an array??
export default function(state = [], action) {
    console.log('in reducer');
    console.log(action)
    switch (action.type) {   
        case LOAD_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}