import axios from 'axios'

// Constants
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER';

// Action Creator
const setSingleOrder = (order) => {
    return {
        type: SET_SINGLE_ORDER,
        order
    }
} 


// Thunks
export const fetchSingleOrder = (userId, orderId) => {
    debugger;
    return async(dispatch) => {
        try {
            const order = (await axios.get(`/api/orderHistory/${userId}/${orderId}`)).data;
            dispatch(setSingleOrder(order));
        } catch (error) {
            console.log(error);
        }
    }
}



// Reducer

export default function(state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_ORDER:
            return action.order;
        default:
            return state;
    }
}
