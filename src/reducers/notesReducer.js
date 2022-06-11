import { types } from "../types/types";


/* {
    notes:[],
    active : null,
    active {
        id : 1564asdf87ds8,
        title : "",
        body : "",
        date : 15625498498,
        imageUrl : ""
    }

} */


const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    
    switch(action.type){
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        
        default:
            return state;
    }
}