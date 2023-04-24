import React from "react";

const List = ({ type, viewDataList, setSelectedView, setSelectedTable }) => {
  const tables = JSON.parse(window.localStorage.getItem("tables"));

  return (
    <div>
      {type === "view"
        ? viewDataList.map((item) => (
          <div key={item.id} onClick={() => setSelectedView(item)}>
            <hr />
              {item.viewName}
            </div>
          ))
        : tables.map(
            (item) => 
              item && (
                <div key={item._id} onClick={() => setSelectedTable(item)}>
                  <hr />
                  {item.name}
                </div>
              )
          )}
    </div>
  );
};

export default List;
