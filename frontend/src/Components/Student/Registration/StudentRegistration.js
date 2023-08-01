import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { ButtonContainer, Title } from '../styles/styles';
import { Card ,SubmitButton} from '../styles/componentStyles';
import { useDispatch } from 'react-redux';
import { studentSignup } from '../../../features/student/studentSlice';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom: '20px',
});

const StudentRegistration = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        const newErrors = {};
        if (!firstName) {
            newErrors.firstName = true;
        }
        if (!lastName) {
            newErrors.lastName = true;
        }
        if (!email) {
            newErrors.email = true;
        }
        if (!password) {
            newErrors.password = true;
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = true;
        }
        if(confirmPassword!==password){
            newErrors.confirmPassword = true;
            newErrors.password=true;
        }

       

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if(confirmPassword!==password){
                alert('Passwords must match');
            }else{

            
            alert('Please fill in all fields');
            }
            return;
        }else{
            dispatch(studentSignup({"firstName":firstName, "lastName":lastName, "mail":email, "password":password}))
          alert("Student Registered Succesfully")
            navigate("/login")
        }
        
      

       
        
    };

    return (
        <Container>
            <Card style={{ width: '500px', padding: '20px' }}>
                <Title>Student Registeration</Title>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={errors.firstName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={errors.lastName}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email}
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password}
                        type="password"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />
                    <TextField
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirmPassword}
                        type="password"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    />

                    <ButtonContainer>
                        <SubmitButton onClick={()=>{navigate("/login")}} type="button" variant="contained" color="primary">
                            Back
                        </SubmitButton>

                        <SubmitButton  type="submit" variant="contained" color="primary" style={{marginLeft:'10px'}}>
                            Submit
                        </SubmitButton>
                    </ButtonContainer>

                </form>
            </Card>
        </Container>
    );
};

export default StudentRegistration;
