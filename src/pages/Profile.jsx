import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings, Loader } from '../components';
import { useNavigate } from 'react-router-dom';
import { updateSubOwnerById } from '../db/profile';
import { toast } from 'react-toastify';
import avatar from '../data/avatar.jpg';

const Profile = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newData, setNewData] = useState({});
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    userProfile,
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
  }, []);

  useEffect(() => {
    if (userProfile) {
      setNewData({
        fullName: userProfile?.fullName,
        organization: userProfile?.organization,
        phone: userProfile?.phone,
        email: userProfile?.email,
        image: userProfile?.image
      });
      setLoading(false);
    }
  }, [userProfile]);

  if (token === null) {
    navigate('/login');
  }

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target.result.split(',')[1]; // Extract base64 data
        setSelectedImage(URL.createObjectURL(file)); // Display the image from the URL
        setNewData({ ...newData, image: base64 }); // Store the base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    if (
      newData.fullName !== userProfile.fullName ||
      newData.email !== userProfile.email ||
      newData.organization !== userProfile.organization ||
      newData.phone !== userProfile.phone ||
      newData.image !== userProfile.image
    ) {
      updateSubOwnerById(token, newData, (result) => {
        if (result.isSuccess) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
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
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-20 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 md:ml-20"
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            {
              loading ?
                <Loader loading={loading} />
                :
                <div className="mt-10 pt-10 mx-10">
                  <Header category="Info" title="Profile" />
                  <div className="w-full">
                    <img
                      src={selectedImage ? selectedImage : newData.image ? newData.image : avatar}
                      className="h-40 w-40 rounded-full mx-auto mb-3"
                      onClick={() => document.getElementById('imageInput').click()}
                      style={{ cursor: 'pointer' }}
                    />
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                    <div className="bg-white p-4">
                      <div className='mb-4' >
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newData.fullName || ''}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="John Doe"
                          onChange={(e) => setNewData({ ...newData, fullName: e.target.value })}
                        />
                      </div>
                      <div className='mb-4' >
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={newData.organization || ''}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="MTOS LLC"
                          onChange={(e) => setNewData({ ...newData, organization: e.target.value })}
                        />
                      </div>
                      <div className='mb-4' >
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Email
                        </label>
                        <input
                          type='email'
                          disabled={true}
                          value={newData.email || ''}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="mtos@gmail.com"
                          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                        />
                      </div>
                      <div className='mb-4' >
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Phone Number
                        </label>
                        <input
                          type='number'
                          value={newData.phone || ''}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="XXX-XXX-XXX"
                          onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleSave}
                          style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
                          className={'text- p-3 w-half hover:drop-shadow-xl hover:bg-red'}
                          disabled={!userProfile || JSON.stringify(newData) === JSON.stringify(userProfile)}
                        >
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;