import {
  // GET_RESTAURANT,
  GET_MENUS,
  GET_MENUITEMS,
  // GET_CATEGORIES,
  GET_MENUITEMS_BYNAME,
} from "./actions";

let initialState = {
  allRestaurante: [],
  allMenuItems: [],
  allMenus: [],
  allCategories: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return { ...state, data: action.payload };
    case "FETCH_DATA_FAILURE":
      return { ...state, error: action.payload };
    // case GET_RESTAURANT:
    //   return {
    //     ...state,
    //     allRestaurante: action.payload,
    //   };
    case GET_MENUS:
      return {
        ...state,
        allMenus: action.payload,
      };
    case GET_MENUITEMS:
      return {
        ...state,
        allMenuItems: action.payload,
      };
    // case GET_CATEGORIES:
    //   return {
    //     ...state,
    //     allCountries: action.payload,
    //   };

    case GET_MENUITEMS_BYNAME:
    return {
      ...state,
      allMenuItems: action.payload
    };
    default:
      return state;
  }
};

export default dataReducer;
