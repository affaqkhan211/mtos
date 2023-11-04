import React from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { FaFacebook, FaGoogle, FaArrowLeft, FaHome } from 'react-icons/fa';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import './ForgotPassword.css';

const ForgotPassword = () => {
    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden  '
        >
            <NavLink
                to='/#home'
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
                                FORGOT PASSWORD? <br />
                            </h1>


                            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' />

                            <MDBBtn className='btn-success w-100 mb-4' size='md'>RESET PASSWORD</MDBBtn>
                            <div className="text-center">
                                <p>Your reset password link will be emailed to you!</p>
                            </div>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    );
}

export default ForgotPassword;
