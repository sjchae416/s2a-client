import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import role from "../../testData/test-role-sheet.json";
import test from "../../testData/test2.json";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddView,
  actionClearInput,
  actionDeleteView,
  actionUpdateView,
} from "../../redux/action";

const View = ({
  role,
  setRole,
  allowedAction,
  setAllowAction,
  viewType,
  setViewType,
  viewName,
  setViewName,
}) => {
  const [showTable, setShowTable] = useState(false);
  const columns = Object.keys(test[0]);
  const { isViewSelected, selectedView, clearInput } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const formElement = useRef(null);

  useEffect(() => {
    setSelectedColumns(selectedView.selectedColumns);
    setViewName(selectedView.viewName);
    setViewType(selectedView.viewType);
    setAllowAction(selectedView.allowedAction);
    setRole(selectedView.role);
  }, [selectedView]);

  const viewData = {
    id: new Date().getTime(),
    viewName: viewName,
    selectedColumns: selectedColumns,
    viewType: viewType,
    allowedAction: allowedAction,
    role: role,
  };

  const handleAllowedActionChange = (e) => {
    setAllowAction(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleCheckboxChange = (e, column) => {
    const { name, checked } = e.target;
    if (checked) {
      setSelectedColumns([...selectedColumns, name]);
    } else {
      setSelectedColumns(selectedColumns.filter((column) => column !== name));
    }
    //console.log(selectedColumns);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (viewName) dispatch(actionAddView(viewData));

    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction("");
    setRole("Developer");
  };

  useEffect(() => {
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction("");
    setRole("Developer");

    dispatch(actionClearInput(false));
  }, [clearInput]);

  const handleCancel = () => {
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction("");
    setRole("Developer");
  };

  const updateViewList = (e) => {
    e.preventDefault();
    dispatch(actionUpdateView(selectedView.id, viewData));
    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction("");
    setRole("Developer");
  };

  const deleteViewList = () => {
    dispatch(actionDeleteView(selectedView.id));
    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction("");
    setRole("Developer");
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      ref={formElement}
      class="card"
      style={{
        margin: "10px auto",
        width: "480px",
        maxWidth: "100%",
      }}
    >
      <div class="form-group">
        <label>View Name</label>
        <input
          value={viewName}
          onChange={(e) => setViewName(e.target.value)}
          type="text"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label>Table</label>
        <select class="form-control">
          <option value="">test</option>
        </select>
      </div>
      <div>
        <div className="form-group">
          <label>Columns</label>
          {columns.map((column) => (
            <div key={column}>
              <input
                checked={selectedColumns.find((item) => item === column)}
                type="checkbox"
                id={`checkbox-${column}`}
                name={column}
                onChange={(e) => handleCheckboxChange(e, column)}
              />
              <label htmlFor={`checkbox-${column}`}>{column}</label>
            </div>
          ))}
        </div>
        <p>Selected Columns: {selectedColumns.join(", ")}</p>
      </div>
      <div class="form-group">
        <label className="can_btn">View Type</label>
        <input
          onChange={(e) => setViewType(e.target.value)}
          type="radio"
          checked={viewType === "Table" ? true : false}
          id="Table"
          name="view_type"
          value="Table"
        />
        <label for="Table">Table</label>{" "}
        <input
          checked={viewType === "Detail" ? true : false}
          onChange={(e) => setViewType(e.target.value)}
          type="radio"
          id="Detail"
          name="view_type"
          value="Detail"
        />
        <label for="Detail">Detail</label>
      </div>
      <div class="form-group">
        <label>Allowed Action</label>
        <select
          className="form-control"
          value={allowedAction}
          onChange={handleAllowedActionChange}
        >
          {viewType === "Table" ? (
            <>
              <option value="Add">Add Record</option>
              <option value="Delete">Delete Record</option>
            </>
          ) : (
            <>
              <option value="Edit">Edit Record</option>
              <option value="Delete">Delete Record</option>
            </>
          )}
        </select>
      </div>
      <div class="form-group">
        <label>Role</label>
        <select
          className="form-control"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="Developer">Developer</option>
          <option value="End User">End User</option>
        </select>
      </div>

      {!isViewSelected ? (
        <div class="text-right">
          <button
            type="reset"
            class="btn btn-danger can_btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" class="btn btn-info">
            Create
          </button>
        </div>
      ) : (
        <div class="text-right">
          <button class="btn btn-danger can_btn" onClick={updateViewList}>
            Save
          </button>
          <button onClick={deleteViewList} class="btn btn-info">
            Delete
          </button>
        </div>
      )}

      <br />
      <br />
    </form>
  );
};
export { View };
