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
    return async(dispatch) => {
        try {
            const order = (await axios.get(`/api/orderHistory/${userId}/${orderId}`)).data;
            
            // New variable to track total of order
            order.total = 0;
            for (let i = 0; i < order.length; i++) {
                // Pulling out coffee information for easier use in displaying history
                let coffeeArr = order[i].cart.coffees;

                for (let j = 0; j < coffeeArr.length; j++) {
                    if (coffeeArr[j].id === order[i].coffeeId) {
                        // Create new key in the order to store coffee information
                        order[i].coffeeInfo = coffeeArr[j];
                        // Remove old coffee array key
                        delete order[i].cart.coffees;
                    }
                }
            
                // Calculate & Create Total Price
                order[i].total = order[i].quantity * order[i].coffeeInfo.price;
                order.total += order[i].total;
            }
            

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
