import * as api from "../api/index.js"
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes"

// Actions Creators - function that returns actions
// the bracket before async refers the data that you pass on your frontend to the API on your backend

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts(); //await data from server then return through the FETCH_ALL action.payload
        console.log(data)
        dispatch({
            type: FETCH_ALL,
            payload: data
        });
    } catch (error) {
        console.log(error)
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        console.log(data)
        dispatch ({ 
            type: CREATE, 
            payload: data
         });

    } catch (error) {
        console.log(error)
    }
};

export const updatePost = (currentId, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(currentId, post)

        dispatch( {
            type: UPDATE, 
            payload: data
        });
    } catch (error) {
        console.log(error)
    };
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({
            type: DELETE, payload: id
        });

    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id, post)

        dispatch({
            type: UPDATE, payload: data
        })
    } catch (error) {
        console.log(error);
    }
}