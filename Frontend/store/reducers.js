import { combineReducers } from "redux";

const initialUser = {
    id: '',
    username: '',
    password: '',
    email: '',

}

const chanomReducer = (state = [], { data, type }) => {
    console.log(data);
    switch (type) {
        case 'GET_CHANOMS':
            return data
        case 'DELETE_CHANOM':
            return state.filter(item => data.id != item.id)
        case 'ADD_CHANOM':
            return [...state, { ...data, id: state.length ? state[state.length - 1].id + 1 : 1 }]
        case 'UPDATE_CHANOM':
            return state.map(chanom => {
                return (+chanom.id === +data.id) ? data : chanom
            })
        default:
            return state
    }
}

const userReducer = (state = initialUser, { data, type }) => {
    switch (type) {
        case 'LOGIN':

            return data
        case 'LOGOUT':
            return ""
        default:
            return state
    }
}

const reducer = {
    chanoms: chanomReducer,
    user: userReducer
};

export default combineReducers(reducer);
