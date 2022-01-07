import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import useStyles from "./styles"
import Posts from "../Posts/Posts"
import Form from "../Form/Form"

import { getPosts } from '../../actions/posts'

const Home = () => {
    
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles()

    useEffect(() =>{
        dispatch(getPosts())
    }, [dispatch, currentId])


    return (
        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" className={classes.mainContainer} spacing={1} >
                    <Grid item xs={12} sm={7}>
                        <Posts currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                        
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid> 
            </Container>
        </Grow>
    )
}

export default Home;
