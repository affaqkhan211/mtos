import React, { useEffect, useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Button } from '../components';
import { earningData, recentTransactions, dropdownData } from '../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useNavigate } from 'react-router-dom';
import { getAllAdmins } from '../db/admin';
import { getAllDrivers } from '../db/driver';
import { getPastTrips } from '../db/trips';
import { getAllSubOwners } from '../db/subOwner';
import { getAllSubscriptions } from '../db/subscriptions';
import { toast } from 'react-toastify';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const OwnerHome = () => {
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
    setAllAdmins,
    setAllDrivers,
    setPastTrips,
    setSubOwners,
    setSubscriptionData
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, [setCurrentColor, setCurrentMode, setToken]);

  // fetchData
  const fetchData = (token, setter, amountIndex, endpoint, assignValue) => {
    if (token) {
      endpoint((result) => {
        if (result.isSuccess) {
          setter(result.data);
          if (assignValue) {
            earningData[amountIndex].amount = result.data.length;
          }
        } else {
          toast.error(result.message);
        }
      });
    }
  };

  useEffect(() => {
    fetchData(token, setSubOwners, 0, getAllSubOwners, true);
    fetchData(token, setAllAdmins, 1, getAllAdmins, true);
    fetchData(token, setAllDrivers, 2, getAllDrivers, true);
    fetchData(token, setPastTrips, 3, getPastTrips, true);
    fetchData(token, setSubscriptionData, 0, getAllSubscriptions, false);
  }, [token, setAllAdmins, setAllDrivers, setSubOwners, setPastTrips, setSubscriptionData]);

  if (token === null) {
    navigate('/login');
  }

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
          <div className="w-20 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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

            <div className="mt-24">
              <div className="flex flex-wrap lg:flex-nowrap justify-center ">

                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  {earningData.map((item) => (
                    <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl flex flex-col justify-center items-center shadow transition-transform transform hover:-translate-y-1">
                      <button
                        type="button"
                        style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        {item.icon}
                      </button>
                      <p className="mt-3">
                        <span className="text-lg font-semibold">{item.amount}</span>
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{item.title}</p>
                    </div>
                  ))}
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

export default OwnerHome;