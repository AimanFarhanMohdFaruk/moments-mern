import React, { useState } from 'react'
import { Avatar, Paper, Typography, Button, Grid, Container, TextField } from "@material-ui/core"
import useStyles from "./styles"
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from "./Input";

const Auth = () => {

    const classes = useStyles()
    const isSignUp = false;

    const [ showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => {

    };

    const handleChange= () => {

    };


    return (
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant="h5" >{ isSignUp ? ('Sign Up') : ('Sign In')} </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                    <Input name='firstName' variant='outlined' label="First Name" handleChange={handleChange} autoFocus half/> 
                                    <Input name='lastname' variant='outlined' label='Last Name' handleChange={handleChange} half/>
                                    </>
                                )
                            }
                            <Input name="email" label="Email Adress" type="email" handleChange={handleChange}   />
                            <Input name="password" labe="Password"  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} /> 
                            { isSignUp && (
                                <>
                                <Input name='confirmPassword' label='Repeat password'  type='password' handleChange={handleChange} />
                                </>
                            )}  
                    </Grid>
                    <Button variant='contained' fulllWidth color='primary' type='submit'  className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                     </Button>    
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
