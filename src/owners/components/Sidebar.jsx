import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BiLogOut } from 'react-icons/bi';

import { links } from '../data/dummy';
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentColor, activeMenu, setActiveMenu, screenSize, setIsClicked, initialState } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const handleLogout = () => {
    setIsClicked(initialState);
    localStorage.removeItem('token');
    navigate('/');
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu ? (
        <>
          <div className="flex justify-between items-center">
            <Link to="/home" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <img src={require('../../mtos/images/siteLogo.png')} width='40px' height='40px' />
              <span>MTOS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={handleLogout}
            type="button"
            style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}
            className={' text- p-3 w-half hover:drop-shadow-xl hover:bg-red mt-5'}
          >
            LOGOUT
          </button>

        </>
      ) :
        (
          <>
            <div className="flex justify-between items-center">
              <Link to="/home" onClick={handleCloseSideBar} className="items-center mt-3">
                <img src={require('../../mtos/images/siteLogo.png')} width='20px' height='20px' />
              </Link>
              <TooltipComponent content="Menu" position="BottomCenter">
                <button
                  type="button"
                  onClick={() => setActiveMenu(!activeMenu)}
                  style={{ color: currentColor }}
                  className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <MdOutlineCancel />
                </button>
              </TooltipComponent>
            </div>
            <div className="mt-3 ">
              {links.map((item) => (
                <div key={item.title}>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      {link.icon}
                    </NavLink>
                  ))}
                </div>
              ))}
              <button
                onClick={handleLogout}
                type="button"
                style={{ backgroundColor: 'red', color: 'white', borderRadius: '10px' }}
                className={' text- p-3 w-half hover:drop-shadow-xl hover:bg-red mt-3'}
              >
                <BiLogOut />
              </button>
            </div>

          </>
        )
      }
    </div>
  );
};

export default Sidebar;
