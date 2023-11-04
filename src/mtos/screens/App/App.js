import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { NavBar, Footer } from '../../components';
import {
    HomeScreen, FeaturesScreen,
    PricingScreen, ContactScreen,
    AboutScreen, LoginScreen,
    RegisterScreen, ForgotPassword
} from '../index';
import ScrollToTop from "react-scroll-to-top";
import colors from '../../utils/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    return (
        <>
            <ToastContainer position="top-center" />

            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <NavBar />
                                <div id="home">
                                    <HomeScreen />
                                </div>
                                <div id="features">
                                    <FeaturesScreen />
                                </div>
                                <div id="pricing">
                                    <PricingScreen />
                                </div>
                                <div id="contact">
                                    <ContactScreen />
                                </div>
                                <div id="about">
                                    <AboutScreen />
                                </div>
                                <ScrollToTop smooth color={colors.primary} />
                                <Footer />
                            </div>

                        }
                    />
                    <Route
                        path='/login'
                        element={
                            <div id="login">
                                <LoginScreen />
                            </div>
                        }
                    />
                    <Route
                        path='/register'
                        element={
                            <div id="register">
                                <RegisterScreen />
                            </div>
                        }
                    />
                    <Route
                        path='/forgotpassword'
                        element={
                            <div id="forgot">
                                <ForgotPassword />
                            </div>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;