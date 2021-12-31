import * as api from "../api"
import { SIGNIN, SIGNUP, AUTH } from "../constants/actionTypes";

export const signIn = (formData, navigate) =>  async(dispatch) => {
    try {

        //login the user
        // dispatch({
        //     type: AUTH,
        //     authData: formData
        // })
        navigate("/")

    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, navigate) =>  async(dispatch) => {
    try {

        //signup the user
        // dispatch({
        //     type: AUTH,
        //     authData: formData
        // })
        navigate("/")

    } catch (error) {
        console.log(error)
    }
}