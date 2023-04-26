import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAppAPI,
  updateAppAPI,
  createViewAPI,
  updateUserAPI,
} from "../api";
import Modal from "@mui/material/Modal";

const Sidebar = ({
  setView,
  viewName,
  checkUnsavedData,
  user,
  setUser,
  appIds,
  app,
  setAppData,
  viewDatas,
  setViewDatas,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const saveViews = async (viewDatas) => {
    try {
      const newViews = await Promise.all(
        viewDatas.map(async (viewData) => {
          return await createViewAPI(viewData);
        })
      );

      return newViews;
    } catch (error) {
      console.error("Error saving new View: ", error);
      throw new Error(error);
    }
  };

  const saveApp = async (
    // appId,
    appData,
    savedViews
  ) => {
    try {
      // FIXME if the App alreadly exits, update the field with passed id(appId), else creat and save
      // if (appId) {
      // const update = {
      // 	appData,
      // 	lastModifiedDate: new Date().toLocaleString('en-US', {
      // 		timeZone: 'America/New_York',
      // 	}),
      // };
      // 	await updateAppAPI(appId, update);
      // } else {
      const newViewsIds = savedViews.map((savedView) => savedView._id);
      appData.views = newViewsIds;

      const newApp = await createAppAPI(appData);

      return newApp;
    } catch (error) {
      console.error("Error saving new App", error);
      throw new Error(error);
    }
  };

  const updateUser = async (user, savedApp) => {
    const newAppIds = [...appIds, savedApp._id];
    const update = { apps: newAppIds };

    try {
      const updatedUser = await updateUserAPI(user._id, update);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating the User: ", error);
      throw new Error(error);
    }
  };

  const handleSaveClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSaveChanges = async () => {
    try {
      const savedViews = await saveViews(viewDatas);
      const savedApp = await saveApp(
        // appId,
        app,
        savedViews
      );
      await updateUser(user, savedApp);
      setAppData(null);
      setViewDatas([]);
      navigate("/");
      setIsModalVisible(false);
    } catch (error) {
      window.alert(error);
      console.error("Error while saving the App: ", error);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="col-1 border-right text-center">
      <button
        onClick={() => {
          if (viewName) {
            if (
              window.confirm(
                "You have unsaved changes, Are you sure you want to leave!"
              ) === true
            ) {
              setView(1);
            }
          } else {
            setView(1);
          }
        }}
      >
        App
      </button>
      <hr />
      <button onClick={() => setView(4)}>View</button>
      <hr />
      <button onClick={checkUnsavedData}>Publish</button>
      <hr />

      <button id="save-changes" onClick={handleSaveClick}>
        Save
      </button>
      <hr />
      <Modal open={isModalVisible} onClose={handleModalClose}>
        <div className="modal-content">
          <h5>Save Changes</h5>
          <h5>Would you like to save your changes before proceeding?</h5>
          <button
            onClick={() => navigate("/")}
            className="btn btn-danger"
            id="dismiss_create_app_modals"
          >
            Discard
          </button>
          <button
            onClick={handleSaveChanges}
            className="btn btn-success"
            id="save-changes-btns"
          >
            Save
          </button>
          <button
            onClick={handleModalClose}
            className="btn btn-danger"
            id="save-changes-btn"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
