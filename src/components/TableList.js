import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSelectTable } from "../redux/action";

const TableList = () => {
  const { tableList } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div>
      {tableList.map((item, ind) => (
        <div key={ind} onClick={() => dispatch(actionSelectTable(item))}>
          <hr />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default TableList;
