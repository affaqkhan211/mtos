import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MFooter from "./mtos/components/Footer/MFooter"
import {
  Home,
  Trips,
  Subscriptions,
  Drivers,
  Admins,
  Profile,
  AddAdmin,
  PastTrips
} from "./pages";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { NavBar } from "./mtos/components";
import {HomeScreen} from "./mtos/screens";
import {FeaturesScreen} from "./mtos/screens";
import {PricingScreen} from "./mtos/screens";
import {ContactScreen} from "./mtos/screens";
import {AboutScreen} from "./mtos/screens";
import {LoginScreen} from "./mtos/screens";
import {RegisterScreen} from "./mtos/screens";
import {ForgotPassword} from "./mtos/screens";
import colors from "./mtos/utils/colors";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "react-scroll-to-top";
import { OwnerAdmins, OwnerHome } from "./owners/pages";
import { OwnerDrivers } from "./owners/pages";
import { OwnerSubscriptions } from "./owners/pages";
import { OwnerTrips } from "./owners/pages";
import { SubOwners } from "./owners/pages";
import { Revenue } from "./owners/pages";
import OwnerProfile from "./owners/pages/OwnerProfile";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
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
                                <MFooter />
                                <ScrollToTop smooth color={colors.primary} />
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
                {/* dashboard  */}
                <Route path="/home" element={<Home />} />

                {/* admins  */}
                <Route path="/admins" element={<Admins />} />
                <Route path="/addadmins" element={<AddAdmin />} />

                {/* drivers  */}
                <Route path="/drivers" element={<Drivers />} />

                {/* drivers  */}
                <Route path="/trips" element={<Trips />} />
                <Route path="/pasttrips" element={<PastTrips />} />

                {/* payments & info  */}

                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/profile" element={<Profile />} />

                
                {/* owner view  */}

                <Route path = "/ownerhome" element = {<OwnerHome/>}/>
                <Route path = "/revenue" element = {<Revenue/>}/>
                <Route path = "/owneradmins" element = {<OwnerAdmins/>}/>
                <Route path = "/ownerdrivers" element = {<OwnerDrivers/>}/>
                <Route path = "/ownersubscriptions" element = {<OwnerSubscriptions/>}/>
                <Route path = "/ownertrips" element = {<OwnerTrips/>}/>
                <Route path = "/subowners" element = {<SubOwners/>}/>
                <Route path = "/ownerprofile" element = {<OwnerProfile/>}/>
                
              </Routes>
              <ToastContainer />
              </BrowserRouter>
  );
};

export default App;