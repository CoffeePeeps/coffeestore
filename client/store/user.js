import axios from 'axios'


const SET_SINGLE_USER = 'SET_SINGLE_USER';
const SET_USER_ORDERS = 'SET_USER_ORDERS';

const storage = () => window.localStorage;
const TOKEN = 'token';

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
    const token = storage().getItem(TOKEN);
    return async(dispatch) => {
        if (token) {
            const singleUser = (await axios.get(`/api/users/${id}`)).data;
            dispatch(setSingleUser(singleUser));
        }
    }
}

// Thunk for fetching orders for a single user
export const fetchUserOrders = (id) => {
    const token = storage().getItem(TOKEN);
    return async(dispatch) => {
        if (token) {
            const userOrders = (await axios.get(`/api/orderHistory/${id}`)).data;
            dispatch(setUserOrders(userOrders));
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
