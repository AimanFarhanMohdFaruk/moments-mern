import * as api from "../api/index.js"
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, navigate) =>  async(dispatch) => {
    try {

        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data })
        navigate("/")

    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, navigate) =>  async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        //signup the user
        dispatch({ type: AUTH, data})
        console.log("user created")
        navigate("/")

    } catch (error) {
        console.log(error)
    }
}

//redux workflow
// from the form, we dispatch an action, then it goes to our actions folder here, where we would trigger the respective action.
// This action in the actions folder, makes another call to our api with the data from the frontend or GET something from the API
// We do another dispatch an action type from the reducers folder.
