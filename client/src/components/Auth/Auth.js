import React, { useState } from 'react'
import { Avatar, Paper, Typography, Button, Grid, Container, TextField } from "@material-ui/core"
import { GoogleLogin } from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useStyles from "./styles"
import LockOutlined from '@material-ui/icons/LockOutlined';
import Input from "./Input";
import Icon from "./Icon"

const Auth = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ isSignUp , setIsSignUp ] = useState(true)
    const [ showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = () => {

    };

    const handleChange= () => {

    };


    const switchMode = (e) => {
        e.preventDefault()
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const googleSucess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type:"AUTH", data: { result, token } })
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = () => {
        console.log("google sign in failed, try again")
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
                            <Input name="email" label="Email Address" type="email" handleChange={handleChange}   />
                            <Input name="password" labe="Password"  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} handleChange={handleChange} /> 
                            { isSignUp && (
                                <>
                                <Input name='confirmPassword' label='Repeat password'  type='password' handleChange={handleChange} />
                                </>
                            )}  
                    </Grid>
                    <Button variant='contained' fullWidth color='primary' type='submit'  className={classes.submit} >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                     </Button>
                    <GoogleLogin
                        clientId="1067242737276-gh1kpk0mkc1m0cvq2661ajg71kb4eiir.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant='contained'>
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSucess}
                        onFailire={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                     <Grid container justifyContent="flex-end">
                        <Button onClick={switchMode}  fontSize="10px">
                                { isSignUp ? "Already have an acccount? Sign in" : "Don't have an account? Sign up" }
                        </Button>
                     </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
