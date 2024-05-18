import { ActionTypes } from "./Actions";

export const initialData = {
    currentUser:{},
};

export const allReducers = (state = initialData, action) => {
    switch (action?.type) {
        case ActionTypes.GET_CURRENT_URL:
            return {
                ...state,
                location: action?.payload,
            }
        default:
            return state;
    }
};