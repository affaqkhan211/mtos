import React, { useEffect } from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";


import { scheduleData } from '../data/dummy';
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from "../contexts/ContextProvider";

const change = (args) => {
  document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
};

const CustomColorPicker = ({ id, mode }) => <ColorPickerComponent id={id} mode={mode} modeSwitcher={false} inline showButtons={false} change={change} />;

const ColorPicker = () => {
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

            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <Header category="App" title="Color Picker" />
              <div className="text-center">
                <div id="preview" />
                <div className="flex justify-center items-center gap-20 flex-wrap">
                  <div>
                    <p className="text-2xl font-semibold mt-2 mb-4">Inline Pallete</p>
                    <CustomColorPicker id="inline-palette" mode="Palette" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold mt-2 mb-4">Inline Picker</p>
                    <CustomColorPicker id="inline-picker" mode="Picker" />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}


export default ColorPicker;
