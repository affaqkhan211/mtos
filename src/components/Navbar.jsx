import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { useStateContext } from '../contexts/ContextProvider';
import { getSubOwnerById } from '../db/profile';
import { getPremiumStatus } from '../db/stripePayments';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="btn btn-light rounded-circle p-3"
    >
      <span
        style={{ background: dotColor }}
        className="position-absolute rounded-circle h-2 w-2 top-2 end-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize, userProfile, setUserProfile, setPremiumStatus } = useStateContext();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    const getData = () => {
      getSubOwnerById(token, (result) => {
        setUserProfile(result.data);
      })
    }

    const getStatus = async () => {
      const status = await getPremiumStatus(token);
      setPremiumStatus(status);
    }

    if (token) {
      getData();
      getStatus();
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="container d-flex justify-content-end py-2">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={activeMenu ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />} />
      <div className="d-flex align-items-center ms-3">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="d-flex align-items-center cursor-pointer p-1 bg-light rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-circle me-2"
              src={userProfile?.image ? userProfile.image : avatar}
              alt="user-profile"
              style={{ width: '32px', height: '32px' }}
            />
            <p className="m-0 text-gray-400 text-14">Hi, <span className="font-bold">{userProfile?.fullName}</span></p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;