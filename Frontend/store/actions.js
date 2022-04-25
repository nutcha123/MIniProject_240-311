import axios from "axios";
import config from '../config/config'

export const allActions = {
    
    getChanoms: () => async (dispatch) => {
        const data = await axios.get(config.URL + "/chanom/show")
        dispatch({ data: data.data, type: "GET_CHANOMS" })
    },
    deleteChanom: (chanom) => async (dispatch) => {
        const data = await axios.delete(config.URL + "/chanom/delete/" + chanom.id)
        if (data.data.status) {
            dispatch({ data: chanom, type: "DELETE_CHANOM" })
        }
    },
    addChanom: (chanom) => async (dispatch) => {
        const data = await axios.post(config.URL + "/chanom/add", { ...chanom })
        dispatch({ data: chanom, type: "ADD_CHANOM" })
    },
    updateChanom: (chanom) => async (dispatch) => {
        const data = await axios.put(config.URL + "/chanom/update/" + chanom.id, { ...chanom })
        dispatch({ data: chanom, type: "UPDATE_CHANOM" })
    },

};
