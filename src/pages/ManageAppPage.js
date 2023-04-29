import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import Box from "@mui/material/Box";
import {
  NavigationBar,
  AppConfig,
  Sidebar,
  List,
  ViewConfig,
} from "../components";

export default function ManageAppPage({
  publishedApps,
  unpublishedApps,
  setIsAppSaved,
  app,
  setAppData,
  userTables,
  viewDatas,
  setViewDatas,
}) {
  const { user, setUser } = useContext(UserContext);
  const [view, setView] = useState("app");
  const [viewRole, setViewRole] = useState([]);
  const [viewDataList, setViewDataList] = useState([]);
  const [selectedView, setSelectedView] = useState({});
  const [name, setName] = useState("");
  const [roleMembershipSheet, setRoleMembershipSheet] = useState("");
  const [addView, setAddView] = useState(false);
  const [addApp, setAddApp] = useState(false);
  const [appType, setAppType] = useState("publish");
  const [selectedPublishedApp, setSelectedPublishedApp] = useState({});

  return (
    <Box>
      <br />
      <br />
      <div className="container">
        <NavigationBar user={user} />
        <br />
        <div className="card p-0">
          <div className="row no-gutters mt-2">
            <Sidebar
              setIsAppSaved={setIsAppSaved}
              setView={setView}
              app={app}
              setAppData={setAppData}
              viewDatas={viewDatas}
              setViewDatas={setViewDatas}
              viewDataList={viewDataList}
            />

            {/* FIXME have another one for the App tab */}

            <div className="col-1 border-right text-center">
              {view === "app" && (
                <>
                  <button
                    onClick={() => {
                      setSelectedPublishedApp({});
                      setAddApp(true);
                    }}
                  >
                    Add App
                  </button>
                  <br />
                  <br />
                  <select onChange={(e) => setAppType(e.target.value)}>
                    <option value="publish">Publish</option>
                    <option value="unpublish">UnPublish</option>
                  </select>
                  <List
                    type="app"
                    viewDatas={viewDatas}
                    viewDataList={viewDataList}
                    setSelectedView={setSelectedView}
                    publishedApps={publishedApps}
                    unpublishedApps={unpublishedApps}
                    appType={appType}
                    setSelectedPublishedApp={setSelectedPublishedApp}
                  />
                </>
              )}

              {view === "view" && app && (
                <>
                  <button
                    onClick={() => {
                      setSelectedView({});
                      setAddView(true);
                    }}
                  >
                    Add View
                  </button>
                  <List
                    type="view"
                    viewDatas={viewDatas}
                    viewDataList={viewDataList}
                    setSelectedView={setSelectedView}
                  />
                </>
              )}
            </div>

            <div className="col-auto">
              <div className="container">
                <br />
                {view === "app" ? (
                  <AppConfig
                    setViewRole={setViewRole}
                    user={user}
                    app={app}
                    setAppData={setAppData}
                    setName={setName}
                    name={name}
                    setRoleMembershipSheet={setRoleMembershipSheet}
                    roleMembershipSheet={roleMembershipSheet}
                    selectedPublishedApp={selectedPublishedApp}
                    addApp={addApp}
                    setAddApp={setAddApp}
                    appType={appType}
                    setSelectedPublishedApp={setSelectedPublishedApp}
                  />
                ) : view === "view" && app && name && roleMembershipSheet ? (
                  <ViewConfig
                    viewRole={viewRole}
                    userTables={userTables}
                    viewDatas={viewDatas}
                    setViewDatas={setViewDatas}
                    setViewDataList={setViewDataList}
                    selectedView={selectedView}
                    setSelectedView={setSelectedView}
                    addView={addView}
                    setAddView={setAddView}
                  />
                ) : (
                  <div>Configure the app first</div>
                )}

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </Box>
  );
}
