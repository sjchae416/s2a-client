import React, { useEffect, useState } from "react";
import { readViewAPI } from "../api";

const List = ({
  type,
  developerApps,
  userTables,
  viewDatas,
  viewDataList,
  setSelectedView,
  setSelectedTable,
  unpublishedApps,
  publishedApps,
  appType,
  app,
  setSelectedPublishedApp,
}) => {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleSelectApp = (app) => {
    setSelectedApp(app);
  };

  const handleSelectView = (view) => {
    setSelectedView(view);
  };

  const handleSelectTable = (table) => {
    setSelectedTable(table);
  };

  const loadAppViews = async (app) => {
    try {
      const appViews = await Promise.all(
        app.views.map(async (viewId) => {
          return await readViewAPI(viewId);
        })
      );
    } catch (error) {
      console.error("Error fetching View: ", error);
    }
  };

  useEffect(() => {
    if (selectedApp !== null) {
      loadAppViews(selectedApp);
    }
  }, [selectedApp]);

  return (
    <div>
      {/* FIXME check variable */}
      {type === "app" ? (
        <>
          {/* {developerApps.map(
            (developerApp) =>
              developerApp !== null && (
                <div
                  key={developerApp._id}
                  onClick={() => handleSelectApp(developerApp)}
                >
                  <hr />
                  {developerApp.name}
                </div>
              )
          )} */}

          {appType === "publish"
            ? publishedApps?.map(
                (publishedApp) =>
                  publishedApp !== null && (
                    <div
                      key={publishedApp._id}
                      onClick={() => setSelectedPublishedApp(publishedApp)}
                    >
                      <hr />
                      {publishedApp.name}
                    </div>
                  )
              )
            : unpublishedApps?.map(
                (unpublishedApp) =>
                  unpublishedApp !== null && (
                    <div
                      key={unpublishedApp._id}
                      // onClick={() => handleSelectApp(unpublishedApp)}
                    >
                      <hr />
                      {unpublishedApp.name}
                    </div>
                  )
              )}
        </>
      ) : type === "view" && viewDataList.length > 0 ? (
        viewDataList.map(
          (viewData) =>
            viewData !== null && (
              <div key={viewData.id} onClick={() => handleSelectView(viewData)}>
                <hr />
                {viewData.viewName}
              </div>
            )
        )
      ) : (
        userTables?.map(
          (userTable) =>
            userTable !== null && (
              <div
                key={userTable._id}
                onClick={() => handleSelectTable(userTable)}
              >
                <hr />
                {userTable.name}
              </div>
            )
        )
      )}
    </div>
  );
};

export default List;
