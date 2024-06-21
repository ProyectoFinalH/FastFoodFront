import alertify from "alertifyjs";
import { axiosInstance, configureAxios } from "../AuthContext/axiosInstance";
import {
  GET_CATEGORIES,
  CANCELARCOMPRAUSER,
  CREATELISTAORDERSCOMPANY,
  CREATECOMPRA,
  UPDATE_USER,
  REGISTERUSER,
  REGISTERBUSINESS,
  RECOVERYKEY,
  USERLOGIN,
  USERLOGINGOOGLE,
  CREATE_MENU,
  CREATE_MENU_ITEMS,
  LOGOUT_USER,
  GET_MENUITEMS,
  GET_RESTAURANTS,
  GET_MENUS,
  GET_MENUITEMS_BYNAME,
  CREATE_CATEGORIES,
  GET_ORDERS_ADMIN,
  GET_MENUITEMS_ADMIN,
  GET_MENUS_ADMIN,
  GET_RESTAURANTS_ALL,
  GET_USERS_ALL,
  PUT_RESTAURANTS,
  PUT_USERS,
  PUT_MENUS,
  PUT_ITEMMENU,
  ADMIN_LOGIN,
  ADMIN_LOGOUT,
  GET_CATEGORIES_ADMIN,
  LISTADOORDERSUSERS,//!Obtenemos action-type para lista de ordenes del usuario
 } from "./action-types";
// import {GET_RESTAURANTS} from "./action-types"

import axios from "axios";

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
//Registramos usuario
export const register_user = (dataquery) => {
  return async (dispatch) => {
    try {
      // alert("Entro al dispach")
      const userData = {
        username: dataquery.username,
        email: dataquery.email,
        password: dataquery.password,
        role_id: 1,
      };
      // alert ("usuario "+userData.username)
      const endpoint = "http://localhost:5000/users/create";

      const response = await axios.post(endpoint, userData);
      const { id, username, email, password, google_id, role_id } =
        response.data;

      // alert("El data es " + id + username + email + password + google_id + role_id )

      const userDatauser = {
        id,
        username,
        email,
        password,
        google_id,
        role_id,
      };
      console.log("Datos encontrados", JSON.stringify(userDatauser));
      dispatch({
        type: REGISTERUSER,
        payload: userDatauser,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};

//Registramos empresa
export const register_business = (dataquery) => {
  return async (dispatch) => {
    try {
      const userData = {
        username: dataquery.username,
        email: dataquery.email,
        password: dataquery.password,
        role_id: 2,
      };
      const endpoint = "http://localhost:5000/users/create";
      const response = await axios.post(endpoint, userData);
      const { id, username, email, password, google_id, role_id } =
        response.data;
      const userDatauser = {
        id,
        username,
        email,
        password,
        google_id,
        role_id,
      };
      console.log("Datos encontrados", JSON.stringify(userDatauser));
      dispatch({
        type: REGISTERBUSINESS,
        payload: userDatauser,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};

//REcuperar contraseña

export const recovery_key_user = (dataquery) => {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/atleticos/register";
      const response = await axios.post(endpoint, dataquery);
      const userData = response.data;

      console.log("Datos encontrados", JSON.stringify(userData));

      if (userData && userData.save === "yes") {
        dispatch({
          type: RECOVERYKEY,
          payload: userData,
        });
      } else {
        alert("Error al registrar el usuario");
      }
    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};

//Loguear usuario
export const login_User = (dataquery) => {
  return async (dispatch) => {
    try {
      if (dataquery === "invitado") {
        // For guest user scenario
        dispatch({
          type: USERLOGIN,
          payload: dataquery,
        });
      } else {
        // For regular user login
        const userData = {
          email: dataquery.emailOrPhone,
          password: dataquery.password,
        };

        const endpoint = "http://localhost:5000/users/login";
        const response = await axios.post(endpoint, userData);
        const user = response.data;

        // Assuming the backend returns a JWT token upon successful login,
        // store the token in localStorage for persistent session management
        localStorage.setItem("token", user.token);

        // Update Redux state with the authenticated user data
        dispatch({
          type: USERLOGIN,
          payload: user,
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };
};

//Loguear usuario
export const login_User_Google = (dataquery) => {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/users/auth/google";
      const response = await axios.post(endpoint, { token: dataquery.token });

      const userData = response.data;

      localStorage.setItem("token", userData.token);

      dispatch({
        type: USERLOGINGOOGLE,
        payload: userData,
      });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };
};
//Loguear usuario con localsotrag

export const login_user_localstorag = (auser) => {
  return async (dispatch) => {
    dispatch({
      type: USERLOGIN,
      payload: auser,
    });
  };
};

export function getAllMenus() {
  return async function (dispatch) {
    const response = await axios("http://localhost:5000/menus");
    return dispatch({
      type: GET_MENUS,
      payload: response.data,
    });
  };
}

export function getAllMenusAdmin() {
  return async function (dispatch) {
    
    const response = await axios("http://localhost:5000/menus/all");
    return dispatch({
      type: GET_MENUS_ADMIN,
      payload: response.data,
    });
  };
}

export function getAllMenuitemsAdmin() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    const response = await axiosInstance.get("http://localhost:5000/menuitems/all");
    return dispatch({
      type: GET_MENUITEMS_ADMIN,
      payload: response.data,
    });
  };
}
export function getAllMenuitems() {
  return async function (dispatch) {
    const response = await axios("http://localhost:5000/menuitems");
    return dispatch({
      type: GET_MENUITEMS,
      payload: response.data,
    });
  };
}

export function getMenuItemsByName(name) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:5000/menuitems/search?name=${name}`
    );
    return dispatch({
      type: GET_MENUITEMS_BYNAME,
      payload: response.data,
    });
  };
}

export function getAllRestaurants() {
  return async function (dispatch) {
    const response = await axios("http://localhost:5000/restaurants");
    return dispatch({
      type: GET_RESTAURANTS,
      payload: response.data,
    });
  };
}
export function getAllRestaurantsAdmin() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:5000/restaurants/all");
      dispatch({
        type: GET_RESTAURANTS_ALL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los restaurantes:", error);
    }
  };
}

export function sortedMenuItemsAsc(sortedMenuItems) {
  return {
    type: "SORTER_ASC",
    payload: sortedMenuItems,
  };
}

export function CreateMenu(dataquery) {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/menus/create";
      const response = await axios.post(endpoint, dataquery);
      const menuData = response.data;

      console.log("Datos encontrados", JSON.stringify(menuData));

      dispatch({
        type: CREATE_MENU,
        payload: menuData,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
      throw new Error(error.response.data.message || "Error desconocido");
    }
  };
}
export function CreateMenuItems(formData) {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/menuitems/create";

      // Verifica el contenido de FormData antes de enviarlo
      console.log("FormData contenido:", Array.from(formData.entries()));

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const menuItemData = response.data;

      console.log("Datos encontrados", JSON.stringify(menuItemData));

      dispatch({
        type: CREATE_MENU_ITEMS,
        payload: menuItemData,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
      throw new Error(error.response.data.message || "Error desconocido");
    }
  };
}

export function CreateCategory(dataquery) {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/categories/create";
      const response = await axios.post(endpoint, dataquery);
      const categoriesData = response.data;
      console.log("Datos encontrados", JSON.stringify(categoriesData));
      dispatch({
        type: CREATE_CATEGORIES,
        payload: categoriesData,
      });
    } catch (error) {
      console.log("Error al enviar la información", error.message);
      throw new Error(error.response.data.message || "Error desconocido");
    }
  };
}

export function getAllCategories() {
  return async function (dispatch) {
    const response = await axios("http://localhost:5000/categories");
    console.log("Categorías obtenidas:", response.data);
    return dispatch({
      type: GET_CATEGORIES,
      payload: response.data,
    });
  };
}

export const updateUser = (id, userData) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:5000/api/users/${id}`;
      const response = await axios.put(endpoint, userData);

      return dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      alert("Error al actualizar usuario. Por favor, intenta nuevamente.");
      throw error;
    }
  };
};

export const Desarrollode_Compra = (cards, id, res_id) => {
  return async (dispatch) => {
    try {
      // Calcular el costo total de todos los productos
      const totalCost = cards.reduce((acc, item) => {
        return acc + parseFloat(item.price) * item.cont;
      }, 0);

      // Crear los items sin las propiedades innecesarias
      const items = cards.map(({ name, price, cont }) => ({
        name,
        price,
        cont,
      }));

      console.log("Items array:", items); // Verificar el formato de items
      

      // Crear el objeto dataquery con las propiedades en el orden especificado
      const dataquery = {
        user_id: id,
        restaurant_id: res_id,
        total_price: totalCost,
        items: items,
      };

      console.log("Dataquery:", dataquery); // Verificar el formato de dataquery

      console.log("Datos enviados: " + JSON.stringify(dataquery));
      const endpoint = "http://localhost:5000/orders/create";
      const response = await axios.post(endpoint, dataquery);
      const compra = response.data;

      console.log("Esta es la compra: " + JSON.stringify(compra));

      dispatch({
        type: CREATECOMPRA,
        payload: compra,
      });
    } catch (error) {
      alert("Error al enviar la información: " + error.message);
      console.log("Error al enviar la información: " + error.message);
    }
  };
};

//crear la lista de ordenes comapny

export const Create_Lista_Order_Company = () => {
  return async (dispatch) => {
    try {
      const endpoint = "http://localhost:5000/orders/all";
      const response = await axios.get(endpoint);
      const compra = response.data;
      //alert("Esta es la lista de compras "+compra)
      console.log("Esta es la lista de compras " + JSON.stringify(compra));

      dispatch({
        type: CREATELISTAORDERSCOMPANY,
        payload: compra,
      });
    } catch (error) {
      alert("Error al enviar la información", error.message);
      console.log("Error al enviar la información", error.message);
    }
  };
};


//! este es el eliminar registro del usuario 
export const Eliminar_Registro_Compra = async (id)=>{
  return  () => {
    try {
      console.log(id)
      const endpoint = `http://localhost:5000/orders/delete/${id}`;
      const response =  axios.put(endpoint);
      const data = response;
      //alert("Esta es la lista de compras "+compra)
      console.log("Este si es " + JSON.stringify(data));

    return data; 
    } catch (error) {
      alert("Error al enviar la información", error.message);
      console.log("Error al enviar la información", error.message);
    }
  };


}


//!Identificar datos del las ordenes del Usuario 

export const  Listado_Orders_Usuario=(id)=>{
  return async (dispatch) => {
    try {
      console.log(id)
      const endpoint = `http://localhost:5000/orders/user/${id}`;
      const response = await  axios.get(endpoint);
      const data = response.data;
      //alert("Esta es la lista de compras "+compra)
      console.log("Este si es " + JSON.stringify(data));
      dispatch({
        type: LISTADOORDERSUSERS,
        payload: data,
      }); 



   
    } catch (error) {
      alert("Error al enviar la información", error.message);
      console.log("Error al enviar la información", error.message);
    }
  
  }
}
//!Actualizar la compra de usuario

export const Actualizar_Compra_Usuario = (datauser) => {
  return async (dispatch) => {
    try {
      console.log("Estos son los datos a enviar: " + JSON.stringify(datauser));
     
      const endpoint = `http://localhost:5000/orders/${datauser.id}`;
      const response = await axios.put(endpoint, {
        total_price: datauser.total_price,
        items: datauser.items,
        statusorder_id: datauser.statusorder_id
      });
      const compra = response.data;
      console.log("Actualizado: " + JSON.stringify(compra));
      
      // Descomenta esto si necesitas usar dispatch
      /* dispatch({
        type: CREATELISTAORDERSCOMPANY,
        payload: compra,
      }); */
    } catch (error) {
      alert(`Error al enviar la información del carrito: ${error.message}`);
      console.log("Error al enviar la información", error.message);
    }
  };
};

//deshabilito la compra en el carrito con el user
export const Deshabilito_Compra_User = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:5000/orders/delete/${id}`;
      const response = await axios.put(endpoint);
      const compra = response.data;

      dispatch({
        type: CANCELARCOMPRAUSER,
        payload: compra,
      });
    } catch (error) {
      alert("Error al enviar la del deshacer carrito", error.message);
      console.log("Error al enviar la información", error.message);
    }
  };
};

export function getAllUsersAdmin() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:5000/users/all");
      dispatch({
        type: GET_USERS_ALL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los restaurantes:", error);
    }
  }
}


export const ID_Registro_Mercado_Pago = (DAtosMercadoPAgo) => {
  return async (dispatch) => {
    console.log("Usuario de Mercado pago" + JSON.stringify(DAtosMercadoPAgo));
    const mercadopago = {
      description: DAtosMercadoPAgo.descriptions,
      price_total: DAtosMercadoPAgo.price,
      quantity_order: DAtosMercadoPAgo.quantity,
    };

    try {
      const endpoint = "http://localhost:5000/mercadopago/create";
      const response = await axios.post(endpoint, mercadopago);
      const compra = response.data;

      console.log("respuesta ID" + compra);
      return { id: compra };
      /* dispatch({
    type: IDCARRITOMERCADOPAGO,
    payload: compra,
  });
 
*/
    } catch (error) {
      alert("Error al enviar compra del carrito", error.message);
      console.log("Error al enviar la información", error.message);
    }
  };
};

export function getOrdersAdmin() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:5000/orders/all");
      dispatch({
        type: GET_ORDERS_ADMIN,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al obtener los ordenes:", error);
    }
  };
}

export const PutRestaurants = (id, isActive) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:5000/restaurants/${
          isActive ? "restore" : "delete"
        }/${id}`
      );

      // Suponiendo que la API devuelve el restaurante actualizado con `id` y `active`
      dispatch({
        type: PUT_RESTAURANTS,
        payload: response.data, // Ajusta según la respuesta de tu API
      });

      console.log("Solicitud PUT enviada correctamente.");
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };
};

export const PutUsers = (id, isActive) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${isActive ? "restore" : "delete"}/${id}`
      );

      // Suponiendo que la API devuelve el restaurante actualizado con `id` y `active`
      dispatch({
        type: PUT_USERS,
        payload: response.data, // Ajusta según la respuesta de tu API
      });

      console.log("Solicitud PUT enviada correctamente.");
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };
};

export const PutMenus = (id, isActive) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:5000/menus/${isActive ? "restore" : "delete"}/${id}`
      );

      // Suponiendo que la API devuelve el restaurante actualizado con `id` y `active`
      dispatch({
        type: PUT_MENUS,
        payload: response.data, // Ajusta según la respuesta de tu API
      });

      console.log("Solicitud PUT enviada correctamente.");
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };
};
export const PutItemMenu = (id, isActive) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:5000/menuitems/${
          isActive ? "restore" : "delete"
        }/${id}`
      );

      // Suponiendo que la API devuelve el restaurante actualizado con `id` y `active`
      dispatch({
        type: PUT_ITEMMENU,
        payload: response.data, // Ajusta según la respuesta de tu API
      });

      console.log("Solicitud PUT enviada correctamente.");
    } catch (error) {
      console.error("Error al cambiar el estado del restaurante:", error);
    }
  };
};



export const loginAdmin = (formData, navigate) => {
  //const { emailOrPhone, password } = formData;
  //console.log(formData);

  return async (dispatch) => {
    // try {
    //   if (emailOrPhone === 'admin@gmail.com' && password === '1234') {
    //     const adminUser = {
    //       emailOrPhone: 'admin@gmail.com',
    //       role_id: 2,
    //     };
  
    //     dispatch({
    //       type: ADMIN_LOGIN,
    //       payload: adminUser,
    //     });
  
    //     navigate('/admin')

    //    }
    //    } catch (error) {
    //     console.error("error al iniciar como administrador", error)
    //    }

    try {
      const URL="http://localhost:5000/users/login"
      let response=await axios.post(URL,formData);
      return dispatch({
        type:ADMIN_LOGIN,
        payload: response
      })

    } catch (error) {
       alertify.alert("Mensaje", 
          'Usuario no autorizado');
      //console.log("error al iniciar como administrador", error);
    }

    }
  };



export const logoutAdmin = () => ({
  type: ADMIN_LOGOUT,
});

export function getAllCategoriesAdmin() {
  return async function (dispatch) {
    const response = await axios("http://localhost:5000/categories/all");
    console.log("Categorías obtenidas:", response.data);
    return dispatch({
      type: GET_CATEGORIES_ADMIN,
      payload: response.data,
    });
  };
}