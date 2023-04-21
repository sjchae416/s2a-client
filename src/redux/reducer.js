import * as types from "./type";

const INITIAL_STATE = {
  viewList: [],
  selectedView: {
    viewName: "",
    selectedColumns: [],
    viewType: "Table",
    allowedAction: "",
    role: "",
  },
  isViewSelected: false,
  tableList: [],
  isTableSelected: false,
  selectedTable: {
    name: "",
    url: "",
    sheetIndex: "",
  },
  clearInput: false,
  // added the role membership sheet to the intial_state
  viewrole: [],
  selectedViewTable: {
    viewName: "",
    selectedColumns: [],
    viewType: "Table",
    allowedAction: [],
    role: [],
  },
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_VIEW:
      return {
        ...state,
        isViewSelected: true,
        selectedView: action.payload,
        selectedViewTable: action.payload,
      };

    case types.SELECTED_VIEW_TABLE:
      console.log(action.payload);
      return {
        ...state,
        selectedViewTable: { ...state.selectedViewTable, ...action.payload },
      };

    case types.CLEAR_INPUT:
      return {
        ...state,
        clearInput: action.payload,
        isViewSelected: false,
      };

    // Setting role based on the role membership sheet
    case types.SET_ROLE:
      return {
        ...state,
        viewrole: action.payload,
      };

    case types.ADD_VIEW:
      return {
        ...state,
        viewList: [...state.viewList, action.payload],
      };

    case types.UPDATE_VIEW:
      const { id, view } = action.payload;
      const index = state.viewList.findIndex((item) => item.id === id);
      state.viewList[index] = view;
      return {
        ...state,
        viewList: state.viewList,
      };

    case types.DELETE_VIEW:
      return {
        ...state,
        viewList: state.viewList.filter((item) => item.id !== action.payload),
        isViewSelected: false,
      };

    case types.ADD_TABLE:
      return {
        ...state,
        tableList: [...state.tableList, action.payload],
      };

    case types.SELECT_TABLE:
      return {
        ...state,
        isTableSelected: true,
        selectedTable: action.payload,
      };

    case types.UPDATE_TABLE:
      const { ids, table } = action.payload;
      const indexs = state.tableList.findIndex((item) => item.id === ids);
      state.tableList[indexs] = table;
      return {
        ...state,
        tableList: state.tableList,
      };

    case types.DELETE_TABLE:
      return {
        ...state,
        tableList: state.tableList.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default appReducer;
