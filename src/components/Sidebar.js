import React from "react";
import { useSelector } from "react-redux";

const Sidebar = ({ setView, viewName, myfun }) => {
  const { isViewSelected } = useSelector((state) => state.app);

  return (
    <div className="col-1 border-right text-center">
      <button
        onClick={() => {
          if (!isViewSelected && viewName) {
            if (
              window.confirm(
                "You have unsaved changes, Are you sure you want to leave!"
              ) == true
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
      <button onClick={myfun}>Publish</button>
      <hr />
    </div>
  );
};

export default Sidebar;
