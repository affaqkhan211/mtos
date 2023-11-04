import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaGem, FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <FaFacebook />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FaTwitter />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FaGoogle />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FaInstagram />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FaLinkedin />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <FaGithub />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <FaGem className="me-3" />
                                MTOS - Medical Transport Operating System
                            </h6>
                            <p>
                                MTOS is a comprehensive solution for businesses in the transportation industry. We empower you to become the owner of your operations, allowing you to manage and scale your business effectively.
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <FaHome className="me-2" />
                                New York, NY 10012, US
                            </p>
                            <p>
                                <FaEnvelope className="me-3" />
                                contactwithmtos@gmail.com
                            </p>
                            <p>
                                <FaPhone className="me-3" /> + 1 (978) 918-6644
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href=''>
                    CodingLabs
                </a>
            </div>
        </MDBFooter>
    );
}