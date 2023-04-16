import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSelectView, actionSelectTable } from "../redux/action";

const List = ({ type }) => {
  const { tableList, viewList } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  return (
    <div>
      {type === "view"
        ? viewList.map((item, ind) => (
            <div key={ind} onClick={() => dispatch(actionSelectView(item))}>
              <hr />
              {item.viewName}
            </div>
          ))
        : tableList.map((item, ind) => (
            <div key={ind} onClick={() => dispatch(actionSelectTable(item))}>
              <hr />
              {item.name}
            </div>
          ))}
    </div>
  );
};

export default List;
