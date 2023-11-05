import React from 'react';
import { FaRoute, FaCode, FaLock, FaUser, FaLocationArrow, FaTasks } from 'react-icons/fa';
import { GiUpgrade } from 'react-icons/gi';
import { SiGoogleanalytics } from 'react-icons/si';
import './FeaturesScreen.css';

const FeaturesScreen = () => {
    return (
        <div className="container-fluid mb-5 pb-5">

            <div className='container-fluid upper-container' >
                <h4 class='text-left feature-subHeading mx-5 pt-5' >MTOS FEATURES</h4>
                <h1 className="text-left feature-heading mx-5 mb-5">WE PROVIDE BEST FEATURES//</h1>

                {/* First Row */}
                <div className="row justify-content-center mx-5 ">
                    <div className="col-lg-4 light-bg custom-class pt-5 pb-5 p-4 ">
                        <FaUser size={48} className="mb-3" />
                        <h3 class='h3' >USER MANAGEMENT</h3>
                        <p>Owners add admins, who, in turn, manage drivers, assign routes, and many more, streamlining your transport business</p>
                    </div>

                    <div className="col-lg-4 dark-bg custom-class pt-5 pb-5 p-4 ">
                        <FaRoute size={48} className="mb-3" />
                        <h3 class='h3'>ROUTE MANAGEMENT</h3>
                        <p>Daily routes are automatically assigned to drivers, ensuring efficient and organized distribution of tasks</p>
                    </div>

                    <div className="col-lg-4 light-bg custom-class pt-5 pb-5 p-4 ">
                        <FaLocationArrow size={48} className="mb-3" />
                        <h3 class='h3'>REAL-TIME TRACKING</h3>
                        <p>Keep a close eye on your fleet's movements with real-time tracking to enhance security and ensure timely deliveries</p>
                    </div>
                </div>

            </div>

            {/* Second Row */}
            <div className='container-fluid' >

                <div className="row justify-content-center mx-5">
                    <div className="col-lg-4 dark-bg custom-class pt-5 pb-5 p-4 ">
                        <GiUpgrade size={48} className="mb-3" />
                        <h3 class='h3'>ROUTE OPTIMIZATION</h3>
                        <p>Optimize routes to save time, reduce fuel costs, and improve delivery efficiency by avoiding traffic and selecting the best paths</p>
                    </div>

                    <div className="col-lg-4 light-bg custom-class pt-5 pb-5 p-4 ">
                        <FaTasks size={48} className="mb-3" />
                        <h3 class='h3'>TASK SCHEDULING</h3>
                        <p>Plan daily tasks for drivers, including pickups, drop-offs, and other duties, to maintain order and productivity</p>
                    </div>

                    <div className="col-lg-4 dark-bg custom-class pt-5 pb-5 p-4 ">
                        <SiGoogleanalytics size={48} className="mb-3" />
                        <h3 class='h3'>ANALYTICS</h3>
                        <p>Access detailed reports and analytics to make informed decisions and continually improve your transport business</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesScreen;
