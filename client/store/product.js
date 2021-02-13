import axios from 'axios'


const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
const LOAD_PRODUCT = 'LOAD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const CREATE_PRODUCT = 'CREATE_PRODUCT'


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

const updateProduct = (product) => {
    return {
        type: UPDATE_PRODUCT,
        product
    };
};

const deleteProduct = (product) => {
    return {
        type: DELETE_PRODUCT,
        product
    }
}

const createProduct = (product) => {
    return {
        type: CREATE_PRODUCT,
        product
    }
}

// Thunk
//not sure if a try catch is needed here, I don't think it hurts but pretty
//sure prof did not use them would like to know the differnce
export const loadProducts = () =>{
    return async(dispatch)=>{
        const products = (await axios.get('/api/products')).data;
        dispatch(_loadProducts(products));
    }
};

export const loadProduct = (id) =>{
    return async(dispatch)=>{
        const product = (await axios.get(`/api/products/${id}`)).data;
        dispatch(_loadProduct(product));
    }
};

export const loadUpdatedProduct = (updatedProduct) => {
    return async(dispatch) => {
        const { update } = await axios.put(`/api/products/${updatedProduct.id}`, updatedProduct);
        dispatch(updateProduct(update))
    }
}

export const destroyProduct = (coffee) => {
    return async(dispatch) => {
        await axios.delete(`/api/products/${coffee.id}`);
        dispatch(deleteProduct(coffee));
    }
}

export const addProduct = (product) => {
    return async(dispatch) => {
        const newProduct = (await axios.post('/api/products', product)).data;
        dispatch(createProduct(newProduct.product));
    }

}

// Reducer
export default function(state = [], action) {
    switch (action.type) {   
        case LOAD_PRODUCTS:
            return action.products;
        case LOAD_PRODUCT:
            return action.product;  
        case UPDATE_PRODUCT:
            return state.map((product) => {
                action.product.coffeeId === product.coffeeId 
                ? action.product 
                : product 
            })
        case DELETE_PRODUCT:
            return state.filter((coffee) => coffee.id !== action.product.id)
        case CREATE_PRODUCT:
            return [...state, action.product]
        default:
            return state;
    }
}