
import React, { useState, useEffect } from 'react'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles'
import iconMoments from "../../images/iconmoments.png"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const [ user , setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    

    useEffect(() => {
        const token = user?.token;
        

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleLogOut = () => {
        dispatch({type:"LOGOUT"})
        navigate("/")
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to="/" var='h2' >Moments</Typography>
                <img  className={classes.image} src={iconMoments} alt="moments" height="40" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple}  alt={user.result.name} src={user.result.imageUrl}> {user.result.name.charAt(0)} </Avatar>
                        <Typography variant="h6" className={classes.userName}>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout}  color="secondary" onClick={handleLogOut} >Logout</Button>
                    </div> ) : (
                        <Button className={classes.logout} variant="contained" color="primary" component={Link} to="/auth">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
