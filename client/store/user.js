import axios from 'axios'


const SET_SINGLE_USER = 'SET_SINGLE_USER';
const SET_USER_ORDERS = 'SET_USER_ORDERS';

// Action Creators
const setSingleUser = (user) => {
    return {
        type: SET_SINGLE_USER,
        user
    }
}

const setUserOrders = (orders) => {
    return {
        type: SET_USER_ORDERS,
        orders
    }
}

// Thunk
export const fetchSingleUser = (id) => {
    return async(dispatch) => {
        try {
            const singleUser = (await axios.get(`/api/users/${id}`)).data;
            dispatch(setSingleUser(singleUser));
        } catch(ex) {
            console.log(ex);
        }
    }
}

// Thunk for fetching orders for a single user
export const fetchUserOrders = (id) => {
    return async(dispatch) => {
        try {
            const userOrders = (await axios.get(`/api/orderHistory/${id}`)).data;
            dispatch(setUserOrders(userOrders));
        } catch(ex) {
            console.log(ex);
        }
    }
}

// Reducer
export default function(state = { user: {}, orders: {} }, action) {
    switch (action.type) {   
        case SET_SINGLE_USER:
            return {
                user: action.user,
                orders: state.orders
            }
        case SET_USER_ORDERS:
            return {
                user: state.user,
                orders: action.orders
            }
        default:
            return state;
    }
}
