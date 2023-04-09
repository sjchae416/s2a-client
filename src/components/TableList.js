import React from "react";

const TableList = ({ tablelist }) => {
  return (
    <div>
      {tablelist.map((item) => (
        <>
          <hr />
          {item}
        </>
      ))}
    </div>
  );
};

export default TableList;
