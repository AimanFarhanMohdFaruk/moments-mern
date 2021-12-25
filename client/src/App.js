import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import iconMoments from "./images/iconmoments.png"


//import actions
import {getPosts} from "./actions/posts"

//import styles
import useStyles from './styles'

//import components
import Posts from "./components/Posts/Posts"
import Form from "./components/Form/Form"

const App = () => {

    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getPosts())
    }, [currentId,dispatch])

    return (
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} var='h2' >Moments</Typography>
                <img  className={classes.image} src={iconMoments} alt="moments" height="40" />
            </AppBar>
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
        </Container>
    );
}

export default App;