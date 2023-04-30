import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
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
  setReloadApp,
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
  const [appType, setAppType] = useState("published");
  const [selectedPublishedApp, setSelectedPublishedApp] = useState({});

  useEffect(() => {
    if (selectedPublishedApp.createdViews) {
      setViewDataList(selectedPublishedApp.createdViews);
    }
  }, [selectedPublishedApp]);

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <NavigationBar user={user} />
        <br />
        <div className="card p-0">
          <div className="row no-gutters mt-2">
            <Sidebar
              setReloadApp={setReloadApp}
              setView={setView}
              app={app}
              setAppData={setAppData}
              viewDatas={viewDatas}
              setViewDatas={setViewDatas}
              viewDataList={viewDataList}
            />

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
                  <select
                    defaultValue={appType}
                    onChange={(e) => {
                      setName("");
                      setRoleMembershipSheet("");
                      setSelectedPublishedApp({});
                      setAppType(e.target.value);
                    }}
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
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
    </div>
  );
}
