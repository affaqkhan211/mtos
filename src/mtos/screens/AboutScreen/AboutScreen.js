import React from 'react';
import './AboutScreen.css';

const AboutScreen = () => {
    return (
        <div className="container my-5 py-5">
            <h1 className="text-center mb-5">ABOUT US</h1>

            <div className="row my-5 align-items-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Our Story</h2>
                    <p>
                        As a self-transport business owner, I initially developed this solution for my own business needs. Over time, I realized the potential to extend this solution to others in the industry. The journey began with addressing my own operational challenges and gradually expanded to offer a comprehensive solution for businesses in the transportation sector.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="https://www.easyhaul.com/blog/wp-content/uploads/2021/07/Blog-EasyHaul-Modes-of-Transport-Title-1.png" alt="Our Story" className="img-fluid w-100" />
                </div>
            </div>
            <div className="row my-5 align-items-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Our Mission</h2>
                    <p>
                        Our mission is to provide top-notch services to businesses in the transportation industry. We believe in empowering every subscriber to become the owner of their operations. With our platform, owners can easily manage and scale their business. They can add multiple owners, administrators, and drivers to streamline their operations. Administrators can upload daily, weekly, or monthly routes, and our platform automatically assigns these routes to drivers, ensuring a smooth and efficient business process.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="https://img.freepik.com/premium-vector/3d-top-view-map-with-destination-location-point-aerial-clean-top-view-day-time-city-map-with-street-river-blank-urban-map-gps-map-navigator-concept_34645-1098.jpg" alt="Our Mission" className="img-fluid w-100" />
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
