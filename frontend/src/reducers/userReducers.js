import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT} from "../constants/userConstants";

export const userLoginReducer = (state = {}, actions) => {
    switch (actions.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: actions.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: actions.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}