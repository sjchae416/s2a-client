import * as types from "./type";

export const actionSelectView = (view) => {
  return {
    type: types.SELECT_VIEW,
    payload: view,
  };
};

export const actionAddView = (view) => {
  return {
    type: types.ADD_VIEW,
    payload: view,
  };
};

export const actionUpdateView = (id, view) => {
  return {
    type: types.UPDATE_VIEW,
    payload: { id, view },
  };
};

export const actionDeleteView = (id) => {
  return {
    type: types.DELETE_VIEW,
    payload: id,
  };
};

export const actionAddTable = (table) => {
  return {
    type: types.ADD_TABLE,
    payload: table,
  };
};

export const actionSelectTable = (table) => {
  return {
    type: types.SELECT_TABLE,
    payload: table,
  };
};

export const actionUpdateTable = (ids, table) => {
  return {
    type: types.UPDATE_TABLE,
    payload: { ids, table },
  };
};

export const actionDeleteTable = (id) => {
  return {
    type: types.DELETE_TABLE,
    payload: id,
  };
};

export const actionClearInput = (val) => {
  return {
    type: types.CLEAR_INPUT,
    payload: val,
  };
};

// Setting role action
export const actionSetRole = (data) => {
  return {
    type: types.SET_ROLE,
    payload: data,
  };
};

export const actionUpdateSelectedViewTable = (data) => {
  return {
    type: types.SELECTED_VIEW_TABLE,
    payload: data,
  };
};
