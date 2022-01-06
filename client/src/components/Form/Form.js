import React from 'react';
import { useState , useEffect } from 'react';
import FileBase from 'react-file-base64'
import { TextField, Paper, Typography, Button } from "@material-ui/core"
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from "../../actions/posts"

const Form = ({currentId, setCurrentId}) => {

    const classes = useStyles()
    const dispatch = useDispatch()

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const [postData,setPostData] = useState({ title:"",message:"",selectedFile:"",tags:"" })

    const user = JSON.parse(localStorage.getItem("profile"))

    useEffect(()=>{
        if(post) setPostData(post);
    },[post]) // function to populate form in case the post data is available

    const clear = () => {
        setCurrentId(0)
        setPostData({
            title:"",message:"",selectedFile:"",tags:""})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name }))
            clear(); //the current Id and the postData is sent out to the actions where it would call the API with the data attached and dispatch the reducer which would then return the new updated post.
        } else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name }))
            clear();
        }
    };

    return (
        <>
        <Paper className={classes.paper}> 
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Creating'} a moment
                </Typography>
                <TextField 
                name="title" 
                variant="outlined" 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({...postData,title: e.target.value})}
                />
                <TextField 
                name="message" 
                variant="outlined" 
                label="Message" 
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({...postData,message: e.target.value})}
                />
                <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                value={postData.tags} 
                onChange={(e) => setPostData({...postData, tags: e.target.value.split(",") })}
                />
                <div className={classes.fileInput} >
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData( {...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
        </>
    )
}

export default Form;