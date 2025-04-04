import * as actions from "../constant/userConstant";

export const userReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
        case actions.REGISTER_REQUEST:
        case actions.LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            };
        case actions.LOGIN_SUCCESS:
        case actions.REGISTER_SUCCESS:
        case actions.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case actions.LOGIN_FAIL:
        case actions.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case actions.LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case actions.LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            };
        case actions.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.UPDATE_PROFILE_REQUEST:
        case actions.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_PROFILE_SUCCESS:
        case actions.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case actions.UPDATE_PROFILE_FAIL:
        case actions.UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.UPDATE_PROFILE_RESET:
        case actions.UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case actions.FORGOT_PASSWORD_REQUEST:
        case actions.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actions.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case actions.FORGOT_PASSWORD_FAIL:
        case actions.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case actions.ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case actions.ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case actions.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case actions.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actions.CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};