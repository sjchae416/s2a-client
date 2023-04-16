import React, { useEffect, useState } from "react";
import { loadTable } from "../api/tableApi";
import { useDispatch } from "react-redux";
import { actionSetRole } from "../redux/action";

const App = ({ developer }) => {
  const [appName, setAppName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [roleMembershipURL, setRoleMembershipURL] = useState("");
  const [showTable, setShowTable] = useState(false);
  const[roleData, setRoleData] = useState([]);

  const roleKey = roleData.length > 0 ? roleData[0] : [];
  const dispatch = useDispatch();
  const appData = {
    name: appName,
    creator: creatorEmail,
    roleMembershipSheet: roleMembershipURL,
    // tables: tables,
    // view: views,
    // lastModifiedDate: new Date().toISOString(),
    // lastOpenedDate: new Date().toISOString(),
  };

  const handleSaveAppName = (name) => {
    setAppName(name);
  };

  const handleSaveURL = (url) => {
    setRoleMembershipURL(url);
  };

  // FN create and fill in App document & and load Table data
  const loadRoleTable = async () => {
    if (appName && roleMembershipURL) {
      const tableData = {
        url: roleMembershipURL,
        //NOTE - In order for sheetIndex to always choose the first sheet index, the metadata must be used. May add it later.
        sheetIndex: "Sheet1",
      };
      const dataArray = await loadTable(tableData);
      if (dataArray) {
        dispatch(actionSetRole(dataArray));
			  setRoleData(dataArray);
				console.log(dataArray);
        console.log(roleKey);

        //TODO - save dataArray to a local state variable
      } else {
        alert(
          "Error loading table. Please check your URL or make sure your role membership sheet sheetIndex is 'Sheet1'"
        );
        return;
      }
    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
    setShowTable(true);
  };

  useEffect(() => {
    appData.appName = appName;
    appData.roleMembershipURL = roleMembershipURL;
    // console.log(appData);
  }, [appName, roleMembershipURL]);

  useEffect(() => {
    if (developer) {
      setCreatorEmail(developer.email);
    }
  }, [developer]);

  return (
    <div
      className="card"
      style={{
        margin: "10px auto",
        width: "600px",
        maxWidth: "100%",
      }}
    >
      <div className="form-group">
        <label>Creator's Email</label>
        <div>{creatorEmail}</div>
      </div>
      <div className="form-group">
        <label>App Name</label>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => handleSaveAppName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Role Membership Sheet URL</label>
        <input
          required
          type="text"
          className="form-control"
          onChange={(e) => handleSaveURL(e.target.value)}
          // onChange={(e) => setRoleMembershipURL(e.target.value)}
        />
      </div>
      <div className="text-right">
        <button onClick={loadRoleTable} className="btn btn-info">
          Load
        </button>
      </div>

      <br />
      <br />
      {showTable ? (
        <table>
          <thead>
          <tr>
            {roleKey.map((header, index) => ( // Loop through the roleKey array and get the header and index
              <th key={index}>{header}</th> // Use the index as the key for the header
            ))}
          </tr>
          </thead>
          <tbody>
            {roleData.slice(1).map((rowData, rowIndex) => ( // Use slice(1) to exclude the first row (header)
            <tr key={rowIndex}>
              {rowData.map((value, colIndex) => ( // Loop through each row and get the value and colIndex
                <td key={colIndex}>{value}</td> // Use the colIndex as the key for the cell
              ))}
            </tr>
        ))}
          </tbody>
        </table>
      ) : (
        ""
      )}

      <br />
      <br />
    </div>
  );
};
export { App };
