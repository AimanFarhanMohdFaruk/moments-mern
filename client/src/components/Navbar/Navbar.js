
import React from 'react'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles'
import iconMoments from "../../images/iconmoments.png"


const Navbar = () => {

    const classes = useStyles();
    const user = null;

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} var='h2' >Moments</Typography>
                <img  className={classes.image} src={iconMoments} alt="moments" height="40" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple}  alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout}  color="secondary" >Logout</Button>
                    </div> ) : (
                        <Button className={classes.logout} variant="contained" color="primary" >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
