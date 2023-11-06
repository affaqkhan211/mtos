import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { FaFacebook, FaGoogle, FaArrowLeft, FaHome } from 'react-icons/fa';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import './RegisterScreen.css';
import { SIGNUP, SIGNUP_WITH_GOOGLE } from '../../../db/auth';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const RegisterScreen = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegistration = async () => {
        setLoading(true);
        setIsValid(true);
        validateEmail();
        validateFirstName();
        validatePassword();

        if (isValid) {
            const data = await SIGNUP(email, password, firstName, lastName);
            if (data.isSuccess) {
                toast.success("Registered Successfully")
                localStorage.setItem('token', data.uid);
                navigate("/home")
            } else {
                toast.error(data.message);
            }
            console.log(data);
        }
        setLoading(false);
    };

    const validateFirstName = () => {
        if (!firstName) {
            setFirstNameError('Please enter your first name');
            setIsValid(false);
        } else if (firstName.length < 3) {
            setFirstNameError('First name must be at least 3 characters long');
            setIsValid(false);
        } else {
            setFirstNameError('');
        }
    }

    const validateEmail = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // Basic email format regex
        if (!email || !email.match(emailRegex)) {
            setEmailError('Invalid Email!');
            setIsValid(false);
        } else {
            setEmailError('');
        }
    }

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            setIsValid(false);
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[@#$%^&+=!.]/.test(password)) {
            setPasswordError('Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            setIsValid(false);
        } else {
            setPasswordError('');
        }
    }

    const GoogleSignup = async () => {
        setLoading(true);
        const data = await SIGNUP_WITH_GOOGLE();
        if (data.isSuccess) {
            toast.success("Registered Successfully")
            sessionStorage.setItem('token', data.uid);
            navigate("/home")
        } else {
            toast.error(data.message);
        }
        setLoading(false);
        console.log(data);
    }

    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden  '
        >
            <NavLink
                to={loading ? '#' : '/#home'}
            >
                <MDBBtn className='btn-success custom-button w-15 mb-4 fixed-top' size='md'>
                    <FaHome size="1.5em" color='#FFF' />
                </MDBBtn>
            </NavLink>

            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        The best software <br />
                        <span style={{ color: 'rgba(64, 180, 145, 0.8)' }}>for your business</span>
                    </h1>
                    <p className='px-3' style={{ color: 'rgba(64, 180, 145, 0.9)' }}>
                        MTOS is a comprehensive solution for businesses in the transportation industry. We empower you to become the owner of your operations, allowing you to manage and scale your business effectively.
                    </p>
                </MDBCol>
                <MDBCol md='5 my-3 justify-content-center align-items-center' className='position-relative'>
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <MDBCard className='my-5 bg-glass'>
                        <MDBCardBody className='pb-5'>
                            <h1 className="display-6 mb-4 fw-bold" style={{ color: '#40B491' }}>
                                SIGN UP <br />
                            </h1>

                            <div className="text-danger">{firstNameError}</div>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='First name'
                                labelStyle={{
                                    fontWeight: 600
                                }}
                                id='form1'
                                type='text'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onBlur={validateFirstName}

                            />
                            <div className="text-danger"></div>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Last name (optional) '
                                labelStyle={{
                                    fontWeight: 600
                                }}
                                id='form2'
                                type='text'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <div className="text-danger">{emailError}</div>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Email'
                                labelStyle={{
                                    fontWeight: 600
                                }}
                                id='form3'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={validateEmail}

                            />

                            <div className="text-danger">{passwordError}</div>
                            <MDBInput
                                wrapperClass='mb-4'
                                label='Password'
                                id='form4'
                                labelStyle={{
                                    fontWeight: 600
                                }}
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={validatePassword}

                            />
                            <div className="already">
                                <p>Already have account? <NavLink className='navLink' to={loading ? '#' : '/login'}>Sign In Instead!</NavLink></p>
                            </div>
                            {
                                loading ?
                                    <button className='register-button w-50 mb-4 ' size='md'>
                                        <div className='loader' >
                                            <PulseLoader
                                                color='#ffff'
                                                loading={loading}
                                                size={10}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </div>
                                    </button>
                                    :
                                    <button className='register-button w-50 mb-4 ' size='md' onClick={handleRegistration}>
                                        REGISTER NOW!
                                    </button>
                            }

                            <div className="text-center">
                                <p>or register using</p>
                                {/* <button disabled={loading} tag='a' color='none' className='social-buttons btn-transparent btn-outline-0 mx-3'>
                                    <FaFacebook size="1.5em" color='#000' />
                                </button> */}

                                <button disabled={loading} tag='a' color='none' className='social-buttons btn-transparent btn-outline-0 mx-3' onClick={GoogleSignup} >
                                    <FaGoogle size="1.5em" color='#000' />
                                </button>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

        </MDBContainer >
    );
}

export default RegisterScreen;
