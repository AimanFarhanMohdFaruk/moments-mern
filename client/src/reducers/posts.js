import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes"


export default (posts = [],action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case 'LIKE':
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            // post.map returns a new array and runs a function to each post, if the post._id is a match, update the data with action.payload, else return the original post
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
            // 
        default:
            return posts;
    }
}