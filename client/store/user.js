import axios from 'axios'


const SET_SINGLE_USER = 'SET_SINGLE_USER'

// Action Creator
const setSingleUser = (user) => {
    return {
        type: SET_SINGLE_USER,
        user
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

// Reducer
export default function(state = {}, action) {
    switch (action.type) {   
        case SET_SINGLE_USER:
            return action.user;
        default:
            return state;
    }
}
