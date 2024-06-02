import axios from 'axios';

// export const GET_RESTAURANT = "GET_RESTAURANT"
export const GET_MENUS ="GET_MENUS"
export const GET_MENUITEMS ="GET_MENUITEMS"
// export const GET_CATEGORIES ="GET_CATEGORIES"
export const GET_MENUITEMS_BYNAME = "GET_MENUITEMS_BYNAME"

export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
  }
};


// export function  getAllRestaurants(){
//   return async function(dispatch){
//       const response = await axios("http://localhost:5000/restaurants")
//       return dispatch({
//           type:"GET_RESTAURANT",
//           payload:response.data
//       })
//   }
// }


export function  getAllMenus(){
  return async function(dispatch){
      const response = await axios("http://localhost:5000/menus")
      return dispatch({
          type:"GET_MENUS",
          payload:response.data
      })
  }
}

export function  getAllMenuitems(){
  return async function(dispatch){
      const response = await axios("http://localhost:5000/menuitems")
      return dispatch({
          type:"GET_MENUITEMS",
          payload:response.data
      })
  }
}
// export function  getAllCategories(){
//   return async function(dispatch){
//       const response = await axios("http://localhost:5000/categories")
//       return dispatch({
//           type:"GET_RESTAURANT",
//           payload:response.data
//       })
//   }
// }

export function  getMenuItemsByName(name){
  return async function(dispatch){
      const response = await axios(`http://localhost:5000/menuitems?name=${name}`)
      return dispatch({
          type:"GET_MENUITEMS_BYNAME",
          payload:response.data
      })
  }
}