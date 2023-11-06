import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  });

  if (token === null) {
    navigate('/login');
  }

  const [profile, setProfile] = useState({
    name: 'John Doe',
    organization: 'Sample Organization',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    image: 'https://huggingface.co/tasks/assets/image-classification/image-classification-input.jpeg',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // You can implement your save logic here
    console.log('Profile saved:', profile);
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

              <div className="w-full text-center">
                <img
                  src={profile.image}
                  className="h-40 w-40 rounded-full mx-auto"
                />
                <div className="bg-white p-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="organization"
                      value={profile.organization}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 focus:outline-none"
                      placeholder="Organization Name"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 focus:outline-none"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-gray-300 p-2 focus:outline-none"
                      placeholder="Address"
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