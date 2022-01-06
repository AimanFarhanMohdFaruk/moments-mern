import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000"})


// authroisation header
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; //populate the req with a authorization header.
    }

    return req;
});

//POSTS API

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) => API.patch(`posts/${id}`, updatedPost);

export const likePost = (id, updatedPost) => API.patch(`/posts/${id}/likePost`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);


//USERS, Sign In and Sign UP API

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);