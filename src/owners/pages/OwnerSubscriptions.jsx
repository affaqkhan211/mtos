import React, { useEffect, useState } from 'react';
import { recentTransactions, } from '../data/dummy';
import { useStateContext } from "../../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Header } from '../components';
import { useNavigate } from 'react-router-dom';

const OwnerSubscriptions = () => {
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
    subscriptionData
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

  console.log(subscriptionData);

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
            <div className="mt-25 mx-10">
              <Header category="Payments" title="Subscriptions" />

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <button
                  className='btn btn-rounded btn-dark ml-auto'
                >
                  Manage Subscriptions
                </button>

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th class="py-2 px-4">#</th>
                      <th class="py-2 px-4">Starting Date</th>
                      <th class="py-2 px-4">Renewal Date</th>
                      <th class="py-2 px-4">Amount</th>
                      <th class="py-2 px-4">Status</th>
                      <th class="py-2 px-4">Currency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptionData.map((data, index) => (
                      <tr key={index} class="bg-white dark:bg-gray-800">
                        <td class="py-2 px-4">{index + 1}</td>
                        <td class="py-2 px-4">{data?.current_period_start.toDate().toLocaleDateString()}</td>
                        <td class="py-2 px-4">{data?.current_period_end.toDate().toLocaleDateString()}</td>
                        <td class="py-2 px-4">{data?.items[0]?.price?.unit_amount_decimal / 100}</td>
                        <td class="py-2 px-4">{data?.status.toUpperCase()}</td>
                        <td class="py-2 px-4">{data?.items[0]?.price?.currency?.toUpperCase()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>

  );
};

export default OwnerSubscriptions;

// <div className="flex gap-10 m-4 flex-wrap justify-center">
//                 <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
//                   <div className="flex justify-between items-center gap-2">
//                     <p className="text-xl font-semibold">Previous Subscriptions</p>
//                   </div>
//                   <div className="mt-10 w-72 md:w-400">
//                     {recentTransactions.map((item) => (
//                       <div key={item.title} className="flex w-100 justify-between mt-4">
//                         <div className="flex gap-4">
//                           <button
//                             type="button"
//                             style={{
//                               color: item.iconColor,
//                               backgroundColor: item.iconBg,
//                             }}
//                             className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
//                           >
//                             {item.icon}
//                           </button>
//                           <div>
//                             <p className="text-md font-semibold">{item.title}</p>
//                             <p className="text-sm text-gray-400">{item.desc}</p>
//                           </div>
//                         </div>
//                         <p className={`text-${item.pcColor}`}>{item.amount}</p>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex justify-between items-center mt-5 border-t-1 border-color">
//                     <p className="text-gray-400 text-sm">36 Previous Transactions</p>
//                   </div>
//                 </div>
//               </div>