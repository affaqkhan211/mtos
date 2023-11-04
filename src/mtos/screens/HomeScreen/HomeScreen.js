import './HomeScreen.css';
import React from 'react';
import backgroundImage from '../../images/siteBg.svg';
import { NavHashLink as NavLink } from 'react-router-hash-link';

const HomeScreen = () => {

    return (
        <div className="row mb-5 pb-5" >
            <div className="col-lg-6 order-lg-2">
                <img src={backgroundImage} alt="Background" className="img-fluid" style={{ width: '100%', objectFit: 'contain' }} />
            </div>
            <div className="col-lg-6 order-lg-1 d-flex flex-column justify-content-center align-items-center p-4">
                <h1 className="text-center main-heading ">MTOS FOR BUSINESS</h1>
                <p className="text-center" style={{ width: "50%" }}>
                    Elevate your transport business: more profit, less time, total control
                </p>
                <NavLink to='/register' >
                    <button className="btn-default btn-success p-3">REGISTER NOW!</button>
                </NavLink>
            </div>
        </div>
    );
};

export default HomeScreen;
