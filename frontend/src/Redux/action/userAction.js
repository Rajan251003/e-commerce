import * as actions from "../constant/userConstant";
import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: actions.LOGIN_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `api/v1/login`,
            { email, password },
            config
        );

        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.REGISTER_REQUEST
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post(
            `/api/v1/register`, 
            userData, 
            config
        );

        dispatch({
            type: actions.REGISTER_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.LOAD_USER_REQUEST
        });

        const { data } = await axios.get(`/api/v1/me`);

        dispatch({
            type: actions.LOAD_USER_SUCCESS, payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.LOAD_USER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({
            type: actions.LOGOUT_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: actions.LOGOUT_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UPDATE_PROFILE_REQUEST
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/v1/me/update`, userData, config);

        dispatch({
            type: actions.UPDATE_PROFILE_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });

    }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UPDATE_PASSWORD_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/password/update`,
            passwords,
            config
        );

        dispatch({
            type: actions.UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });

    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: actions.FORGOT_PASSWORD_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.post(
            `/api/v1/password/forgot`,
            email,
            config
        );

        dispatch({
            type: actions.FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: actions.FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
}

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: actions.RESET_PASSWORD_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        };

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch({
            type: actions.RESET_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: actions.ALL_USERS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({
            type: actions.ALL_USERS_SUCCESS,
            payload: data.users
        });

    } catch (error) {
        dispatch({
            type: actions.ALL_USERS_FAIL,
            payload: error.response.data.message
        });
    }
};

// get User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.USER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({
            type: actions.USER_DETAILS_SUCCESS,
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: actions.USER_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: actions.UPDATE_USER_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({
            type: actions.UPDATE_USER_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: actions.UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: actions.DELETE_USER_REQUEST
        });

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({
            type: actions.DELETE_USER_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: actions.DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: actions.CLEAR_ERRORS,
    });

}