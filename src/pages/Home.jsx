import React, { useEffect, useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useNavigate } from 'react-router-dom';
import { getAllAdmins } from '../db/admin';
import { toast } from 'react-toastify';
import { getAllDrivers } from '../db/driver';
import { getPastTrips, getTripsUploadedToday } from '../db/trips';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Home = () => {
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
    setTrips,
    setPastTrips,
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
  const fetchData = (token, setter, amountIndex, endpoint) => {
    if (token) {
      endpoint(token, (result) => {
        if (result.isSuccess) {
          setter(result.data);
          earningData[amountIndex].amount = result.data.length;
        } else {
          toast.error(result.message);
        }
      });
    }
  };

  useEffect(() => {
    fetchData(token, setAllAdmins, 0, getAllAdmins);
    fetchData(token, setAllDrivers, 1, getAllDrivers);
    fetchData(token, setTrips, 2, getTripsUploadedToday);
    fetchData(token, setPastTrips, 2, getPastTrips);
  }, [token, setAllAdmins, setAllDrivers, setTrips, setPastTrips]);

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

            <div className="mt-24">
              <div className="flex flex-wrap lg:flex-nowrap justify-center ">

                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  {earningData.map((item) => (
                    <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl flex flex-col justify-center items-center">
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

              <div className="flex gap-10 m-4 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-xl font-semibold">Recent Transactions</p>
                    <DropDown currentMode={currentMode} />
                  </div>
                  <div className="mt-10 w-72 md:w-400">
                    {recentTransactions.map((item) => (
                      <div key={item.title} className="flex justify-between mt-4">
                        <div className="flex gap-4">
                          <button
                            type="button"
                            style={{
                              color: item.iconColor,
                              backgroundColor: item.iconBg,
                            }}
                            className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                          >
                            {item.icon}
                          </button>
                          <div>
                            <p className="text-md font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                          </div>
                        </div>
                        <p className={`text-${item.pcColor}`}>{item.amount}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-5 border-t-1 border-color">
                    <div className="mt-3">
                      <Button
                        color="white"
                        bgColor={currentColor}
                        text="Add"
                        borderRadius="10px"
                      />
                    </div>

                    <p className="text-gray-400 text-sm">36 Recent Transactions</p>
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

export default Home;
