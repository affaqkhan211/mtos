import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useNavigate } from 'react-router-dom';
import { getSubOwnerById } from '../db/profile';

const Profile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [name, setName] = useState('');
  const [oragnization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    userProfile,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  });

  useEffect(() => {
    if (userProfile) {
      setName(userProfile?.fullName);
      setOrganization(userProfile?.organization);
      setPhone(userProfile?.phone);
      setEmail(userProfile?.email);
    }
  }, []);

  if (token === null) {
    navigate('/login');
  }


  const handleSave = () => {
    // You can implement your save logic here
    console.log('Profile saved:');
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>

      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <div className="mt-10 pt-10 mx-10">
              <Header category="Info" title="Profile" />

              <div className="w-ful">
                <img
                  src={image}
                  className="h-40 w-40 rounded-full mx-auto"
                />
                <div className="bg-white p-4">

                  <div className='mb-4' >
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John Doe"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className='mb-4' >
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={oragnization}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="MTOS LLC"
                      required
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>

                  <div className='mb-4' >
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type='email'
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="mtos@gmail.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className='mb-4' >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type='phone'
                      value={phone}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="XXX-XXX-XXX"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleSave}
                      style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                      className={'text- p-3 w-half hover:drop-shadow-xl hover:bg-red'}
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>

  );
};

export default Profile;