import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import role from "../testData/test-role-sheet.json";
import test from "../testData/test2.json";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddView,
  actionClearInput,
  actionDeleteView,
  actionUpdateView,
} from "../redux/action";

const ViewConfig = ({
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
  const { isViewSelected, selectedView, clearInput, viewrole } = useSelector(
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
    // console.log(selectedColumns);
  };

  const handleAllowedActionCheckboxChange = (e, column) => {
    const { name, checked } = e.target;
    if (checked) {
      setAllowAction([...allowedAction, name]);
    } else {
      setAllowAction(allowedAction.filter((column) => column !== name));
    }
    // console.log(allowedAction);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(role);
    if (!role) {
      return window.alert("Add role membership sheet first!");
    }
    if (viewName) dispatch(actionAddView(viewData));

    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction([]);
    setRole("");
  };

  useEffect(() => {
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction([]);
    setRole("");

    dispatch(actionClearInput(false));
  }, [clearInput]);

  const handleCancel = () => {
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction([]);
    setRole("");
  };

  const updateViewList = (e) => {
    e.preventDefault();
    dispatch(actionUpdateView(selectedView.id, viewData));
    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction([]);
    setRole("");
  };

  const deleteViewList = () => {
    dispatch(actionDeleteView(selectedView.id));
    formElement.current.reset();
    setSelectedColumns([]);
    setShowTable(false);
    setViewName("");
    setViewType("Table");
    setAllowAction([]);
    setRole("");
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

        {viewType === "Table"
          ? ["Add Record", "Delete Record"].map((record) => (
              <div key={record}>
                <input
                  checked={allowedAction.find((item) => item === record)}
                  type="checkbox"
                  id={`checkbox-${record}`}
                  name={record}
                  onChange={(e) =>
                    handleAllowedActionCheckboxChange(e, record.split(" ")[0])
                  }
                />
                <label htmlFor={`checkbox-${record}`}>{record}</label>
              </div>
            ))
          : ["Edit Record", "Delete Record"].map((record) => (
              <div key={record}>
                <input
                  checked={allowedAction.find((item) => item === record)}
                  type="checkbox"
                  id={`checkbox-${record}`}
                  name={record}
                  onChange={(e) =>
                    handleAllowedActionCheckboxChange(e, record.split(" ")[0])
                  }
                />
                <label htmlFor={`checkbox-${record}`}>{record}</label>
              </div>
            ))}
      </div>
      <div class="form-group">
        <label>Role</label>
        <select
          className="form-control"
          value={role}
          onChange={handleRoleChange}
        >
          {viewrole[0]?.map((role, ind) => (
            <option key={ind} value={role}>
              {role}
            </option>
          ))}
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
export { ViewConfig };
