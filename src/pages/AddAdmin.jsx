import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings, Loader } from '../components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import avatar from '../data/avatar.jpg';
import { createAdmin } from '../db/admin';
import LockView from '../components/LockedView';

const AddAdmin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newData, setNewData] = useState({
    fullName: '',
    organization: '',
    phoneNumber: '',
    email: '',
    password: '',
    address: '',
    imageUrl: '',
  });
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    userProfile,
    allAdmins,
    premiumStatus
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
      setNewData({
        fullName: '',
        organization: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: '',
        imageUrl: '',
      });
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      setNewData({
        organization: userProfile?.organization
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
        setNewData({ ...newData, imageUrl: base64 }); // Store the base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const isFullNameValid = newData?.fullName?.length > 3; // Name length check
      const isPhoneNumberValid = newData?.phoneNumber?.length > 4; // Phone number check
      const isEmailValid = /\S+@\S+\.\S+/.test(newData?.email); // Email format check
      const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(newData?.password); // Password strength check
      const isAddressValid = newData?.address?.length >= 5; // Address length check
      const isImageValid = newData?.imageUrl?.length >= 1; // Address length check

      if (
        isFullNameValid &&
        isPhoneNumberValid &&
        isEmailValid &&
        isPasswordValid &&
        isAddressValid &&
        isImageValid
      ) {
        // Simulate an asynchronous operation with a timeout (replace this with your actual async call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        createAdmin(token, newData, (result) => {
          if (result.isSuccess) {
            setNewData({
              fullName: '',
              organization: '', // Add organization field
              phoneNumber: '',
              email: '',
              password: '',
              address: '',
              imageUrl: '',
            });
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
      } else {
        let errorMessage = 'Failed to add admin:\n';
        if (!isFullNameValid) errorMessage += '- Name must be at least 4 characters long.\n';
        if (!isPhoneNumberValid) errorMessage += '- Phone number must be at least 5 digits long.\n';
        if (!isEmailValid) errorMessage += '- Please enter a valid email address.\n';
        if (!isPasswordValid) errorMessage += '- Password must include uppercase, lowercase, number, and a special character.\n';
        if (!isAddressValid) errorMessage += '- Address must be at least 5 characters long.\n';
        if (!isImageValid) errorMessage += '- Image must be attached.\n';

        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
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
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2"
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
                  <Header category={"Admins (Already Added " + allAdmins?.length + ")"} title="Add Admin " />
                  {
                    premiumStatus ?
                      <div className="w-full">
                        <img
                          src={selectedImage ? selectedImage : newData.imageUrl ? newData.imageUrl : avatar}
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
                              Admin Full Name
                            </label>
                            <input
                              type="text"
                              value={newData.fullName}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="John Doe"
                              onChange={(e) => setNewData({ ...newData, fullName: e.target.value })}
                            />
                          </div>

                          <div className='mb-4' >
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Admin Organization Name (default)
                            </label>
                            <input
                              disabled={true}
                              type="text"
                              value={newData.organization}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="MTOS LLC"
                              onChange={(e) => setNewData({ ...newData, organization: e.target.value })}
                            />
                          </div>

                          <div className='mb-4' >
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Admin Phone Number
                            </label>
                            <input
                              type='number'
                              value={newData.phoneNumber}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="XXX-XXX-XXX"
                              onChange={(e) => setNewData({ ...newData, phoneNumber: e.target.value })}
                            />
                          </div>

                          <div className='mb-4' >
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Admin Login Email
                            </label>
                            <input
                              type='email'
                              value={newData.email}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="admin@gmail.com"
                              onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                            />
                          </div>

                          <div className='mb-4' >
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Admin Login Password
                            </label>
                            <input
                              type='text'
                              value={newData.password}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="XXXXXXXXX"
                              onChange={(e) => setNewData({ ...newData, password: e.target.value })}
                            />
                          </div>

                          <div className='mb-4' >
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Admin Address
                            </label>
                            <input
                              type='text'
                              value={newData.address}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="123 Main St, Anytown, USA 12345"
                              onChange={(e) => setNewData({ ...newData, address: e.target.value })}
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
                              Add Admin
                            </button>
                          </div>
                        </div>
                      </div>
                      :
                      <LockView />
                  }
                </div>
            }
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
