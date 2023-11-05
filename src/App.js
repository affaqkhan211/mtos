import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MFooter from "./mtos/components/Footer/MFooter"
import {
  Home,
  Trips,
  Calendar,
  Drivers,
  Customers,
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

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
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

                {/* pages  */}
                <Route path="/trips" element={<Trips />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/deleteadmin" element={<Customers />} />

                {/* apps  */}

                <Route path="/calendar" element={<Calendar />} />

                {/* charts  */}

                
              </Routes>
              <ToastContainer />
              </BrowserRouter>
  );
};

export default App;





// <div className={currentMode === "Dark" ? "dark" : ""}>
// <BrowserRouter>

//   <div className="flex relative dark:bg-main-dark-bg">
//     <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
//       <TooltipComponent content="Settings" position="Top">
//         <button
//           type="button"
//           onClick={() => setThemeSettings(true)}
//           style={{ background: currentColor, borderRadius: "50%" }}
//           className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
//         >
//           <FiSettings />
//         </button>
//       </TooltipComponent>
//     </div>
    
//     {activeMenu ? (
//       <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
//         <Sidebar />
//       </div>
//     ) : (
//       <div className="w-0 dark:bg-secondary-dark-bg">
//         <Sidebar />
//       </div>
//     )}
//     <div
//       className={
//         activeMenu
//           ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
//           : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
//       }
//     >
//       <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
//         <Navbar />
//       </div>
//       <div>
//         {themeSettings && <ThemeSettings />}

        
        
//       </div>
//       <Footer />
//     </div>
//   </div>
// </BrowserRouter>
// </div>