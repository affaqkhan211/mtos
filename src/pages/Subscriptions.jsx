import React, { useEffect, useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { recentTransactions } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings, Header, Loader } from '../components';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import { addDocToCollection } from '../db/subscriptions';
import { toast } from 'react-toastify';

const Subscriptions = () => {
  const [ownerAccounts, setOwnerAccounts] = useState(2);
  const [adminAccounts, setAdminAccounts] = useState(2);
  const [driverAccounts, setDriverAccounts] = useState(3);
  const [loading, setLoading] = useState(false);
  const STRIPE_KEY = 'pk_test_51O8uBnLqgG0cdoTuNoIF8SiD0BzNycZcwTaFsxHOCSXot0PojCwGTt1nYZ4wEl6sE15XlRNZbqXTdAdCrUYaByvT001F1W31ob';
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    subscriptionData,
    setSubscriptionData,
    userProfile
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

  // Function to handle increment and decrement of accounts
  const incrementAccounts = (type) => {
    switch (type) {
      case 'owner':
        setOwnerAccounts(ownerAccounts + 1);
        break;
      case 'admin':
        setAdminAccounts(adminAccounts + 1);
        break;
      case 'driver':
        setDriverAccounts(driverAccounts + 1);
        break;
      default:
        break;
    }
  };

  const decrementAccounts = (type) => {
    switch (type) {
      case 'owner':
        setOwnerAccounts(ownerAccounts > 1 ? ownerAccounts - 1 : 1);
        break;
      case 'admin':
        setAdminAccounts(adminAccounts > 1 ? adminAccounts - 1 : 1);
        break;
      case 'driver':
        setDriverAccounts(driverAccounts > 3 ? driverAccounts - 1 : 3);
        break;
      default:
        break;
    }
  };

  const totalAccounts = adminAccounts + ownerAccounts + driverAccounts;
  const totalPrice = totalAccounts * 100;

  const onToken = async (data) => {
    setLoading(true);
    const attachedData = {
      token,
      ownerAccounts,
      adminAccounts,
      driverAccounts,
    }
    try {
      await addDocToCollection(attachedData, data, (result) => {
        if (result.isSuccess) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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



            {
              loading ?
                <Loader loading={loading} />
                :
                <div class='mt-10 pt-10 mx-10'>
                  <Header category="Payments" title="Subscriptions" />

                  {
                    userProfile.subscriptions ?
                      <div className="flex gap-10 m-4 flex-wrap justify-center">
                        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                          <div className="flex justify-between items-center gap-2">
                            <p className="text-xl font-semibold">Previous Subscriptions</p>
                          </div>
                          <div className="mt-10 w-72 md:w-400">
                            {recentTransactions.map((item) => (
                              <div key={item.title} className="flex w-100 justify-between mt-4">
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
                            <p className="text-gray-400 text-sm">36 Previous Transactions</p>
                          </div>
                        </div>
                      </div>
                      :
                      <div>
                        <section id="pricing" class="pricing-content section-padding justify ">
                          <div class="container">
                            <div class="section-title text-center mb-3">
                            </div>
                            <div class="row text-center justify-content-center">
                              <div class="col-lg-5 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" data-wow-offset="0">
                                <div class="single-pricing">
                                  <div class="price-head">
                                    <h2>Basic</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                  <h1 class="price">$500</h1>
                                  <h5>Monthly</h5>
                                  <ul class='container-fluid' >
                                    <li>5 Accounts Creation</li>
                                    <li>Single Owner Account</li>
                                    <li>Single Admin Accounts</li>
                                    <li>Upto 3 Driver Accounts</li>
                                    <li>Owner Admin Dashboard</li>
                                    <li>Umlimited Access Monthly</li>
                                    <li>Admin + Driver Mobile App</li>
                                  </ul>
                                  <a href="#/">SUBSCRIBE NOW!</a>
                                </div>
                              </div>
                              <div class="col-lg-5 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset="0">
                                <div class="single-pricing single-pricing-white">
                                  <div class="price-head">
                                    <h2>Custom</h2>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                  {/* <span class="price-label">Best</span> */}
                                  <h1 class="price">${totalPrice}</h1>
                                  <h5>Monthly</h5>
                                  <ul className='container-fluid'>
                                    <li>$100 Per Account</li>
                                    <li>{totalAccounts} Accounts Creation</li>
                                    <li>
                                      <div className='round-button-container'>
                                        <button className='decrementButton' onClick={() => decrementAccounts('owner')}
                                          disabled={ownerAccounts === 1 ? true : false}
                                        >
                                          <IoMdRemove />
                                        </button>
                                        {`${ownerAccounts} Owner Account${ownerAccounts > 1 ? 's' : ''}`}
                                        <button className='incrementButton' onClick={() => incrementAccounts('owner')}
                                          disabled={true}
                                        >
                                          <IoMdAdd />
                                        </button>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='round-button-container'>
                                        <button className='decrementButton' onClick={() => decrementAccounts('admin')}
                                          disabled={adminAccounts === 1 ? true : false}

                                        >
                                          <IoMdRemove />
                                        </button>
                                        {`${adminAccounts} Admin Account${adminAccounts > 1 ? 's' : ''}`}
                                        <button className='incrementButton' onClick={() => incrementAccounts('admin')}>
                                          <IoMdAdd />
                                        </button>
                                      </div>
                                    </li>
                                    <li>
                                      <div className='round-button-container'>
                                        <button className='decrementButton' onClick={() => decrementAccounts('driver')}
                                          disabled={driverAccounts < 4 ? true : false}

                                        >
                                          <IoMdRemove />
                                        </button>
                                        {`${driverAccounts} Driver Account${driverAccounts > 1 ? 's' : ''}`}
                                        <button className='incrementButton' onClick={() => incrementAccounts('driver')}>
                                          <IoMdAdd />
                                        </button>
                                      </div>
                                    </li>
                                    <li>Owner Admin Dashboard</li>
                                    <li>Unlimited Access Monthly</li>
                                    <li>Admin + Driver Mobile App</li>
                                  </ul>
                                  <a href="#/">SUBSCRIBE NOW!</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <div className='text-center mt-3'>
                          <StripeCheckout
                            token={onToken}
                            stripeKey={STRIPE_KEY}
                          />
                        </div>
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