import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Resize, Toolbar, Sort, Filter, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from 'react-router-dom';
import LockView from '../components/LockedView';

const signatureTemplate = (props) => {
  return (
    <img
      src={props.signature} // Make sure the field name is correct
      alt="Customer Image"
      style={{ width: '50px', height: '50px', borderRadius: '100px' }} // Adjust the size as needed
    />
  );
};

const driverTemplate = (props) => {
  return (
    <img
      src={props.imageUri} // Make sure the field name is correct
      alt="Customer Image"
      style={{ width: '50px', height: '50px', borderRadius: '100px' }} // Adjust the size as needed
    />
  );
};

const Trips = () => {
  let grid;
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const selectionsettings = { persistSelection: true, type: 'Multiple' };
  const toolbarOptions = ['Search', 'Print', 'ExcelExport', 'PdfExport'];

  const editing = { allowDeleting: false, allowEditing: false, allowAdding: false, allowEditOnDblClick: false };
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, pastTrips, premiumStatus } = useStateContext();
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

  const toolbarClick = (args) => {
    if (grid && args.item.id === 'grid_excelexport') {
      grid.excelExport();
    } else if (grid && args.item.id === 'grid_pdfexport') {
      grid.pdfExport();
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

            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <Header category="Trips" title="Past Trips" />
              {
                premiumStatus ?
                  <GridComponent
                    id='grid'
                    ref={g => grid = g}
                    dataSource={pastTrips}
                    allowPaging
                    pageSettings={{ pageCount: 5 }}
                    selectionSettings={selectionsettings}
                    toolbar={toolbarOptions}
                    editSettings={editing}
                    allowSorting
                    enableAdaptiveUI={true}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                    allowPdfExport={true}
                  >
                    <ColumnsDirective>
                      <ColumnDirective template={signatureTemplate} headerText='Client Signature' width='150' />
                      <ColumnDirective template={driverTemplate} headerText='Driver Image' width='130' />
                      <ColumnDirective field='driverName' headerText='Driver Name' width='130' />
                      <ColumnDirective field='PU Time Request' headerText='PU Time Request' width='150' />
                      <ColumnDirective field='ApptTime' headerText='ApptTime' width='130' />
                      <ColumnDirective field='Client Name' headerText='Client Name' width='130' />
                      <ColumnDirective field='Client Mob' headerText='Client Mob' width='130' />
                      <ColumnDirective field='Client Dis' headerText='Client Dis' width='130' />
                      <ColumnDirective field='From Address' headerText='From Address' width='200' />
                      <ColumnDirective field='From Phone' headerText='From Phone' width='150' />
                      <ColumnDirective field='To Address' headerText='To Address' width='200' />
                      <ColumnDirective field='To Phone' headerText='To Phone' width='150' />
                      <ColumnDirective field='Miles' headerText='Miles' width='100' />
                      <ColumnDirective field='Booking Comments' headerText='Booking Comments' width='250' />
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar, Sort, Filter, Resize, ExcelExport, PdfExport]} />
                  </GridComponent>
                  :
                  <LockView />
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Trips;