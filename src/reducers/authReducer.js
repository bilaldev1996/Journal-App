import { types } from "../types/types"

/*
    * state si está autenticado
    {
        firebaseUid : 'ashfdhhkgdsfjhdshgfjhasg',
        name : 'Bilal
    }
 */


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
        default:
            return state
    }

}