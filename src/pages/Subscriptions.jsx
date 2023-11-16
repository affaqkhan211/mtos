import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Header, Loader } from '../components';
import { useNavigate } from 'react-router-dom';
import { getCheckoutUrlForCustom } from '../db/stripePayments';

const Subscriptions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    allDrivers,
    themeSettings,
    allAdmins,
    subscriptionData,
    token,
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

  const handleCustomSubscriptions = async () => {
    let priceId = 'price_1OCwehLqgG0cdoTuftsjScQ5';
    const checkOutUrl = await getCheckoutUrlForCustom(priceId, token);
    if (checkOutUrl) {
      window.location.href = checkOutUrl;
    }
  }

  // const manageSubscriptions = async () => {
  //   const portalUrl = await getPortalUrl();
  //   if (portalUrl) {
  //     window.location.href = portalUrl;
  //   }
  // }

  if (token === null) {
    navigate('/login');
  }

  const ACCOUNTS_SUM = allAdmins.length + allDrivers.length;
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>

      <div className="flex relative dark:bg-main-dark-bg">
        {/* <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
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
        </div> */}

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
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 md:ml-20"
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}



            {
              loading ?
                <Loader loading={loading} />
                :
                <div class='mt-10 pt-10 mx-10'>
                  <Header category="Payments" title="Subscriptions" />

                  {
                    premiumStatus ?
                      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {/* <button
                          className='btn btn-rounded btn-dark ml-auto'
                          onClick={manageSubscriptions}
                        >
                          Manage Subscriptions
                        </button> */}

                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th class="py-2 px-4">#</th>
                              <th class="py-2 px-4">Starting Date</th>
                              <th class="py-2 px-4">Renewal Date</th>
                              {/* <th class="py-2 px-4">Amount</th> */}
                              {/* <th class="py-2 px-4">Currency</th> */}
                              <th class="py-2 px-4">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subscriptionData.map((data, index) => (
                              <tr key={index} class="bg-white dark:bg-gray-800">
                                <td class="py-2 px-4">{index + 1}</td>
                                <td class="py-2 px-4">{data?.current_period_start.toDate().toLocaleDateString()}</td>
                                <td class="py-2 px-4">{data?.current_period_end.toDate().toLocaleDateString()}</td>
                                {/* <td class="py-2 px-4">{(data?.items[0]?.price?.unit_amount_decimal / 100) * ACCOUNTS_SUM}</td> */}
                                {/* <td class="py-2 px-4">{data?.items[0]?.price?.currency?.toUpperCase()}</td> */}
                                <td class="py-2 px-4">{data?.status.toUpperCase()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      :
                      <div>
                        <section id="pricing" class="pricing-content section-padding justify ">
                          <div class="container">
                            <div class="section-title text-center">
                              <h1>PRICING PLAN</h1>
                              <p className='price-p' >Use our best metered pricing plan. You will be charged as much as you create admin accounts or driver accounts.</p>
                            </div>
                            <div class="row text-center justify-content-center">
                              <div class="col-lg-6 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
                                <div class="single-pricing single-pricing-white">
                                  <div class="price-head">
                                    <h2>Pay As Yo Go!</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                  <h5>Starting From</h5>
                                  <h1 class="price">$0</h1>
                                  <ul className='container-fluid'>
                                    <li>$100 Per Account </li>
                                    <li>Free Owner Dashboard</li>
                                    <li>Unlimited Admin Accounts</li>
                                    <li>Unlimited Driver Accounts</li>
                                    <li>Unlimited Access Monthly</li>
                                  </ul>
                                  <button
                                    className='subButton'
                                    onClick={handleCustomSubscriptions}
                                  >
                                    NO COST CHECKOUT!
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
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

export default Subscriptions;