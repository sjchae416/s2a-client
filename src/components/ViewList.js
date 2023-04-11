import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSelectView } from "../redux/action";

const TableList = () => {
  const { viewList } = useSelector((state) => state.app);
  const dispatch = useDispatch();

<<<<<<< HEAD
  // for list of items in view tab under Create App
=======
>>>>>>> dev4.11
  return (
    <div>
      {viewList.map((item, ind) => (
        <div key={ind} onClick={() => dispatch(actionSelectView(item))}>
          <hr />
          {item.viewName}
        </div>
      ))}
    </div>
  );
};

export default TableList;
