import React from 'react';
import './PricingScreen.css';
import { useNavigate } from 'react-router-dom';

const PricingScreen = () => {
    const navigate = useNavigate();

    return (
        <div class='container-fluid my-5 py-5'>
            <section id="pricing" class="pricing-content section-padding justify ">
                <div class="container">
                    <div class="section-title text-center">
                        <h1>PRICING PLAN</h1>
                        <p className='price-p' >Use our best metered pricing plan. You will be charged as much as you create admin accounts or driver accounts.</p>
                    </div>
                    <div class="row text-center justify-content-center">
                        <div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
                            <div class="single-pricing single-pricing-white">
                                <div class="price-head">
                                    <h2>Pay As Yo Go!</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <h5>Starting From</h5>
                                <h1 class="price">$0</h1>
                                <ul className='container-fluid'>
                                    <li>$100 Per Account </li>
                                    <li>Free Owner Dashboard</li>
                                    <li>Unlimited Admin Accounts</li>
                                    <li>Unlimited Driver Accounts</li>
                                    <li>Unlimited Access Monthly</li>
                                </ul>
                                <button
                                    className='subButton'
                                    onClick={() => navigate('login')}
                                >
                                    REGISTER NOW!
                                </button>                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingScreen;
