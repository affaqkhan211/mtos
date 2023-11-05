import React from 'react';
import './ContactScreen.css';
import { BsFillTelephoneFill, BsEnvelopeAtFill } from 'react-icons/bs';
import { BiSolidMap } from 'react-icons/bi';

const ContactScreen = () => {
    return (
        <section className="container-fluid custom-container my-4 p-4 justify-content-center align-item-center">
            <div className="container inner-container w-70">
                <div className="row">
                    <div className="col-md-9 mb-5">
                        <h2 className="h1-responsive font-weight-bold text-center my-4">CONTACT US</h2>
                        <p className="text-center w-responsive mx-auto mb-5">
                            Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.
                        </p>

                        <form name="contact-form">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="md-form mb-4">
                                        <input type="text" id="name" name="name" className="form-control" />
                                        <label htmlFor="name">Your name</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="md-form mb-4">
                                        <input type="text" id="email" name="email" className="form-control" />
                                        <label htmlFor="email">Your email</label>
                                    </div>
                                </div>
                            </div>
                            <div className="md-form mb-4">
                                <input type="text" id="subject" name="subject" className="form-control" />
                                <label htmlFor="subject">Subject</label>
                            </div>
                            <div className="md-form">
                                <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                <label htmlFor="message">Your message</label>
                            </div>

                            <button className="btn btn-dark text-md-left button-container my-3">
                                Send
                            </button>
                            <div className="status"></div>
                        </form>
                    </div>
                    <div className="col-md-3 py-5">
                        <ul className="list-unstyled mb-0 d-flex flex-column mx-3">
                            <li class='li-1 my-3' >
                                <BiSolidMap size={50} className="mb-3" color='#000' />
                                <p>San Francisco, CA 94126, USA</p>
                            </li>
                            <li class='li-1 my-3' >
                                <BsFillTelephoneFill size={50} className="mb-3" color='#000' />
                                <p>+ 1 (978) 918-6644</p>
                            </li>
                            <li className='li-1 my-3' >
                                <BsEnvelopeAtFill size={50} className="mb-3" color='#000' />
                                <p>contactwithmtos@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactScreen;
