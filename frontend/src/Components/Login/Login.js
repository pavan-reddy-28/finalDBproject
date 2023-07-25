import React, { useEffect, useState } from 'react';

import {
    Container,
    TextField,
    Button,
    Typography,

    Snackbar,
} from '@mui/material';
import { Cookies } from 'react-cookie';
import { styled } from '@mui/system';
import { useNavigate, NavLink } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux'

import { studentFetch, studentLogin,adminLogin, adminFetch } from '../../features/users/userSlice';



const LoginForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
}));

const InputField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const SignInButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
}));

const Login = () => {
    // const navigate = useNavigate();
    const cookies = new Cookies();

    const loggedInData = useSelector(
        (state) =>   state.user
    )
    const dispatch = useDispatch()


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);



    const navigate = useNavigate()
        const handleLoginRoute = async () => {
            console.log("admin data : ", loggedInData)
            if (loggedInData.error || loggedInData.user["error"]) {
                navigate("/login")
            }
           else if (loggedInData.user["role"] === "admin") {
                cookies.set("role", "admin", { path: '/' });
                cookies.set("id", loggedInData.user["_id"], { path: '/' });
                navigate("/adminDashboard")
            }
            else if (loggedInData.user["role"] === "student") {
                cookies.set("role", "student", { path: '/' });
                cookies.set("id", loggedInData.user["_id"], { path: '/' });
                navigate("/studentDashboard")
            }
        }

    useEffect( () => {
        handleLoginRoute()
    }, [loggedInData])
    

    useEffect( () => {
       if(cookies.get("role")){
        if(cookies.get("role")==="student"){
            dispatch(studentFetch({ id:cookies.get("id")}))
            navigate('/studentDashboard')
        }else if(cookies.get("role")==="admin"){
            dispatch(adminFetch({ id:cookies.get("id")}))
            navigate('/adminDashboard')
        }
       }
    }, [])



    const handleSignIn = async (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setError(true);
            setAlertOpen(true);
            return;
        }

        try {

            let isValidCredentials = false
            if (email === "admin@gmail.com") {
                
                dispatch(adminLogin({ email, password }))
            } else {
                
                dispatch(studentLogin({ email, password }))


            }


            if (!isValidCredentials) {
                setError(true);
                setAlertOpen(true);

                // Reset the form after 10 seconds
                setTimeout(() => {
                    setError(false);
                    setEmail('');
                    setPassword('');
                    setAlertOpen(false);
                }, 10000);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle the error as needed
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };
  
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <LoginForm onSubmit={handleSignIn}>
                <InputField
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error && email.trim() === ''}
                    fullWidth
                    required
                />
                <InputField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={error && password.trim() === ''}
                    fullWidth
                    required
                />
                <div>
                    {/* <NavLink
                        to="/"
                    >
                        Register New Customer
                    </NavLink> */}

                </div>
                <SignInButton variant="contained" color="primary" type="submit">
                    Sign In
                </SignInButton>
            </LoginForm>
            <Snackbar
                open={alertOpen}
                autoHideDuration={10000}
                onClose={handleAlertClose}
                message="Please enter valid details."
            />
        </Container>
    );
};

export default Login;
