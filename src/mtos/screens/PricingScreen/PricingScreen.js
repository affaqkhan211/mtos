import React, { useState } from 'react';
import colors from '../../utils/colors';
import './PricingScreen.css';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const PricingScreen = () => {
    const [ownerAccounts, setOwnerAccounts] = useState(2);
    const [adminAccounts, setAdminAccounts] = useState(2);
    const [driverAccounts, setDriverAccounts] = useState(3);

    // Function to handle increment and decrement of accounts
    const incrementAccounts = (type) => {
        switch (type) {
            case 'owner':
                setOwnerAccounts(ownerAccounts + 1);
                break;
            case 'admin':
                setAdminAccounts(adminAccounts + 1);
                break;
            case 'driver':
                setDriverAccounts(driverAccounts + 1);
                break;
            default:
                break;
        }
    };

    const decrementAccounts = (type) => {
        switch (type) {
            case 'owner':
                setOwnerAccounts(ownerAccounts > 1 ? ownerAccounts - 1 : 1);
                break;
            case 'admin':
                setAdminAccounts(adminAccounts > 1 ? adminAccounts - 1 : 1);
                break;
            case 'driver':
                setDriverAccounts(driverAccounts > 3 ? driverAccounts - 1 : 3);
                break;
            default:
                break;
        }
    };

    const totalAccounts = adminAccounts + ownerAccounts + driverAccounts;
    const totalPrice = totalAccounts * 100;

    return (
        <div class='container-fluid my-5 py-5'>
            <section id="pricing" class="pricing-content section-padding justify ">
                <div class="container">
                    <div class="section-title text-center">
                        <h1>PRICING PLAN</h1>
                        <p>Use A Predefined Basic Plan With Given Features Or Adjust It According To Your Needs By Choosing Custom Plan. Click On Plus/Minus Button To Increase/Decrease Number Of Accounts.</p>
                    </div>
                    <div class="row text-center justify-content-center">
                        <div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
                            <div class="single-pricing">
                                <div class="price-head">
                                    <h2>Basic</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <h1 class="price">$500</h1>
                                <h5>Monthly</h5>
                                <ul class='container-fluid' >
                                    <li>5 Accounts Creation</li>
                                    <li>Single Owner Account</li>
                                    <li>Single Admin Accounts</li>
                                    <li>Upto 3 Driver Accounts</li>
                                    <li>Owner Admin Dashboard</li>
                                    <li>Umlimited Access Monthly</li>
                                    <li>Admin + Driver Mobile App</li>
                                </ul>
                                <a href="#/">SUBSCRIBE NOW!</a>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
                            <div class="single-pricing single-pricing-white">
                                <div class="price-head">
                                    <h2>Custom</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <span class="price-label">Best</span>
                                <h1 class="price">${totalPrice}</h1>
                                <h5>Monthly</h5>
                                <ul className='container-fluid'>
                                    <li>$100 Per Account</li>
                                    <li>{totalAccounts} Accounts Creation</li>
                                    <li>
                                        <div className='round-button-container'>
                                            <button className='decrementButton' onClick={() => decrementAccounts('owner')}
                                                disabled={ownerAccounts === 1 ? true : false}
                                            >
                                                <IoMdRemove />
                                            </button>
                                            {`${ownerAccounts} Owner Account${ownerAccounts > 1 ? 's' : ''}`}
                                            <button className='incrementButton' onClick={() => incrementAccounts('owner')}>
                                                <IoMdAdd />
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='round-button-container'>
                                            <button className='decrementButton' onClick={() => decrementAccounts('admin')}
                                                disabled={adminAccounts === 1 ? true : false}

                                            >
                                                <IoMdRemove />
                                            </button>
                                            {`${adminAccounts} Admin Account${adminAccounts > 1 ? 's' : ''}`}
                                            <button className='incrementButton' onClick={() => incrementAccounts('admin')}>
                                                <IoMdAdd />
                                            </button>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='round-button-container'>
                                            <button className='decrementButton' onClick={() => decrementAccounts('driver')}
                                                disabled={driverAccounts < 4 ? true : false}

                                            >
                                                <IoMdRemove />
                                            </button>
                                            {`${driverAccounts} Driver Account${driverAccounts > 1 ? 's' : ''}`}
                                            <button className='incrementButton' onClick={() => incrementAccounts('driver')}>
                                                <IoMdAdd />
                                            </button>
                                        </div>
                                    </li>
                                    <li>Owner Admin Dashboard</li>
                                    <li>Unlimited Access Monthly</li>
                                    <li>Admin + Driver Mobile App</li>
                                </ul>
                                <a href="#/">SUBSCRIBE NOW!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingScreen;
