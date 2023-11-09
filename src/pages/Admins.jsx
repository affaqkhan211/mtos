import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, CommandColumn } from '@syncfusion/ej2-react-grids';
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Header, Navbar, Footer, Sidebar, ThemeSettings, CustomGridTemplate, LockedView } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from 'react-router-dom';
import { deleteAdmin, updateAdminById } from '../db/admin';
import { toast } from 'react-toastify';

const Admins = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const selectionsettings = { persistSelection: true, type: 'Multiple' };
  const toolbarOptions = ['Search', 'Print'];
  const commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
  { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true, allowEditOnDblClick: false };
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, allAdmins, premiumStatus } = useStateContext();
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

  // Event handler for the "actionBegin" event to handle delete action
  const actionBegin = (args) => {
    if (args.requestType === 'delete') {
      const primaryKeyField = 'id';
      const selectedRecords = args.data;

      selectedRecords.forEach((record) => {
        const primaryKeyValue = record[primaryKeyField];

        // Call the deleteAdmin function with the primary key value
        deleteAdmin(primaryKeyValue, (result) => {
          if (result.isSuccess) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
      });
    } else if (args.requestType === 'save') {
      const primaryKeyField = 'id';
      const record = args.data;
      const primaryKeyValue = record[primaryKeyField];

      // Call the deleteAdmin function with the primary key value
      updateAdminById(primaryKeyValue, record, (result) => {
        if (result.isSuccess) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });
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
              <Header category="Admins" title="View Admins" />
              {
                premiumStatus ?
                  <GridComponent
                    dataSource={allAdmins}
                    allowPaging
                    pageSettings={{ pageCount: 5 }}
                    selectionSettings={selectionsettings}
                    toolbar={toolbarOptions}
                    editSettings={editing}
                    allowSorting
                    actionBegin={actionBegin}
                  >
                    <ColumnsDirective>
                      <ColumnDirective template={CustomGridTemplate} headerText='Image' width='120' />
                      <ColumnDirective field='fullName' headerText='Name' width='120' />
                      <ColumnDirective field='phoneNumber' headerText='Phone' width='130' />
                      <ColumnDirective field='email' headerText='Email' width='250' isIdentity={true} />
                      <ColumnDirective field='address' headerText='Address' />
                      <ColumnDirective headerText='Manage Records' width='160' commands={commands}></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, CommandColumn]} />
                  </GridComponent>
                  :
                  <LockedView />
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Admins;