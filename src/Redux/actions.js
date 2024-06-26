import alertify from "alertifyjs";
import { axiosInstance, configureAxios } from "../AuthContext/axiosInstance";
import {
  GET_CATEGORIES,
  CANCELARCOMPRAUSER,
  CREATELISTAORDERSCOMPANY,
  CREATECOMPRA,
  UPDATE_USER,
  REGISTERUSER,
  //REGISTERBUSINESS,
  RECOVERYKEY,
  USERLOGIN,
  USERTOKEN,
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
  GET_COMMENT,
  CLEAR_COMMENTS,
  GET_CATEGORIES_ADMIN,
  LISTADOORDERSUSERS,//!Obtenemos action-type para lista de ordenes del usuario
  EMPRESALOGIN,
  UPDATE_USER_DATA, //! obtener la data actualizacion 
  SELECTRESTAURANTE, //!seleccionamos el restaurrante

  POST_COMMENT,

  GET_DETAIL_EMPRESA,
  SET_TOKEN, // para setear el valor del token 
  
  PUT_DETAIL_EMPRESA,
  GET_CATEGORIES_COMPANY,
  GET_MENUITEMS_COMPANY,
  GET_MENUS_COMPANY,
  GET_COMMENTS_COMPANY,
 } from "./action-types";
// import {GET_RESTAURANTS} from "./action-types"

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setToken, getToken } from "../Components/Login/Login_Ingreso/LocalStorange_user/LocalStorange_user";
//import { get } from "firebase/database";

const URLBACK="https://fastfoodback3-production.up.railway.app";

export const logoutUser = () => {
  return  {
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
      const endpoint = URLBACK+"/users/create";

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
  return async () => {
    try {
      const userData = {
        name:dataquery.username,
        email:dataquery.email,
        password:dataquery.password,
        address:"",
        phone:"",
        description:""
      };
      console.log(JSON.stringify(userData))
      const endpoint = URLBACK+"/restaurants/create";
      const response = await axios.post(endpoint, userData);
      if(response){
        return true
      }
        return false
    } catch (error) {
      console.log("Error al enviar la información", error.message);
    }
  };
};

//REcuperar contraseña

export const recovery_key_user = (dataquery) => {
  return async (dispatch) => {
    try {
      const endpoint = URLBACK+"/atleticos/register";
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

// Loguear usuario
export const login_User = (dataquery) => {
  return async (dispatch) => {
    try {
      if (dataquery === "invitado") {
        const invitado = {
          state: true,
          name: "invitado",
          email: "invitado@invitado.invitado",
          id: 0
        };
        dispatch({
          type: USERLOGIN,
          payload: invitado,
        });
      } else {
        const userData = {
          email: dataquery.emailOrPhone,
          password: dataquery.password,
        };
        const endpoint = URLBACK+"/users/login";
        const responseToken = await axios.post(endpoint, userData);
        console.log(responseToken.data);
        const response=jwtDecode(responseToken.data);//decodificando el token que manda el back
        

        const user = response;
        localStorage.setItem("token", user.token);
        dispatch({
          type: USERLOGIN,
          payload:user,
        });
        dispatch({
          type: USERTOKEN,
          payload:responseToken,
        });

        setToken(responseToken)
        return user;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      if (error.response && error.response.status === 400) {
        throw new Error("Usuario o contraseña incorrectos");
      } else {
        throw new Error("Error al intentar iniciar sesión");
      }
    }
  };
};

//Loguear usuario
export const login_User_Google = (dataquery) => {
  return async (dispatch) => {
    try {
      const endpoint = URLBACK+"/users/auth/google";
      const responseToken = await axios.post(endpoint, { token: dataquery.token });

      const response=jwtDecode(responseToken.data);//decodificando el token que manda el back

      const userData = response;
      
      const usuario = {
        state:userData.state,
        id: userData.id,
        email: userData.email,
        name: userData.name
      }

      localStorage.setItem("token", usuario.token);

      dispatch({
        type: USERLOGINGOOGLE,
        payload: usuario,
      });
      dispatch({
        type: USERTOKEN,
        payload:responseToken,
      });

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };
};
//Loguear usuario con localsotrag

export const login_user_localstorag = (auser) => {
  return async (dispatch) => {
   const responseToken=  getToken()
    dispatch({
      type: USERLOGIN,
      payload: auser,
    });

    dispatch({
      type: USERTOKEN,
      payload:responseToken,
    });
  };
};

//! logueo empresz
export const login_Busnnes = (dataUser) =>{
  return async (dispatch) => {
    try {
     
        const userData = {
          email: dataUser.emailOrPhone,
          password: dataUser.password,
        };

        const endpoint = URLBACK+"/restaurants/login";
        const response = await axios.post(endpoint, userData);
        const empresa = response.data;
        console.log("Encontrado " + JSON.stringify(empresa))
        // Assuming the backend returns a JWT token upon successful login,
        // store the token in localStorage for persistent session management
        localStorage.setItem("token", empresa.token);

        // Update Redux state with the authenticated user data
        dispatch({
          type: EMPRESALOGIN,
          payload: empresa,
        });
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };
}

export function getAllMenus() {
  return async function (dispatch) {
    const response = await axios(URLBACK+"/menus");
    return dispatch({
      type: GET_MENUS,
      payload: response.data,
    });
  };
}

export function getAllMenusAdmin() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);
    
    const response = await axiosInstance.get(URLBACK+`/menus/all`);
    return dispatch({
      type: GET_MENUS_ADMIN,
      payload: response.data,
    });
  };
}
export function getAllMenusCompany() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    
    const response = await axiosInstance.get(URLBACK+`/menus/restaurant/${restaurantId}`);
    return dispatch({
      type: GET_MENUS_COMPANY,
      payload: response.data,
    });
  };
}
export function getAllMenuitemsCompany() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    const response = await axiosInstance.get(URLBACK+`/menuitems/restaurant/${restaurantId}`);
    return dispatch({
      type: GET_MENUITEMS_COMPANY,
      payload: response.data,
    });
  };
}

export function getAllMenuitemsAdmin() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);
    const response = await axiosInstance.get(URLBACK+`/menuitems/all`);
    return dispatch({
      type: GET_MENUITEMS_ADMIN,
      payload: response.data,
    });
  };
}
export function getAllMenuitems() {
  return async function (dispatch) {
    const response = await axios(URLBACK+"/menuitems");
    return dispatch({
      type: GET_MENUITEMS,
      payload: response.data,
    });
  };
}

export function getMenuItemsByName(name) {
  return async function (dispatch) {
    const response = await axios(
      URLBACK+`/menuitems/search?name=${name}`
    );
    return dispatch({
      type: GET_MENUITEMS_BYNAME,
      payload: response.data,
    });
  };
}

export function getAllRestaurants() {
  return async function (dispatch) {
    const response = await axios(URLBACK+"/restaurants");
    return dispatch({
      type: GET_RESTAURANTS,
      payload: response.data,
    });
  };
}
export function getAllRestaurantsAdmin() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance(URLBACK+"/restaurants/all");
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
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);
    const restaurantId = getState().EMPRESAUSER.id;

    try {
      const endpoint = URLBACK+"/menus/create";
      const response = await axiosInstance.post(endpoint, { ...dataquery, restaurant_id: restaurantId });
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
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);
    const restaurantId = getState().EMPRESAUSER.id;

    try {
      const endpoint = URLBACK+"/menuitems/create";

      // Verifica el contenido de FormData antes de enviarlo
      formData.append("restaurant_id", restaurantId);
      console.log("FormData contenido:", Array.from(formData.entries()));

      const response = await axiosInstance.post(endpoint, formData, {
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
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);
    const restaurantId = getState().EMPRESAUSER.id;

    try {
      const endpoint = URLBACK+"/categories/create";
      const response = await axiosInstance.post(endpoint, { ...dataquery, restaurant_id: restaurantId });
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
    const response = await axios(URLBACK+"/categories");
    console.log("Categorías obtenidas:", response.data);
    return dispatch({
      type: GET_CATEGORIES,
      payload: response.data,
    });
  };
}

export const updateUser = (id, userData) => {
  return async (dispatch, getState) => {
      const token = getState().token;
      configureAxios(token.data);
      if (!token) {
          console.error("Token de autenticación no encontrado.");
          alert("Usuario no autenticado. Inicia sesión nuevamente.");
          throw new Error("Usuario no autenticado.");
      }
    try {
      console.log('data a modificar del user',userData);
      const endpoint = URLBACK+`/users/${id}`;
      const response = await axiosInstance.put(endpoint, userData);
       dispatch({
              type: UPDATE_USER,
              payload: response.data,
          });
          dispatch({
            type: UPDATE_USER_DATA,
            payload: response.data, 
          })
      } catch (error) {
          console.error("Error al actualizar usuario:", error.message);
          alert("Error al actualizar usuario. Por favor, intenta nuevamente.");
          throw error;
      }
  };
};

export const Desarrollode_Compra = (cards, id, res_id) => {
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);

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
      const endpoint = URLBACK+"/orders/create";
      const response = await axiosInstance.post(endpoint, dataquery);
      const compra = response.data;

      console.log("Esta es la compra: " + JSON.stringify(compra));

      dispatch({
        type: CREATECOMPRA,
        payload: compra,
      });
      return compra;
    } catch (error) {
     // alert("Error al enviar la información: " + error.message);
      console.log("Error al enviar la información: " + error.message);
    }
  };
};

//crear la lista de ordenes comapny

export const Create_Lista_Order_Company = () => {
  return async (dispatch,getState) => {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    try {
      const endpoint = URLBACK+`/orders/restaurant/${restaurantId}`;
      const response = await axiosInstance.get(endpoint);
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
export const Eliminar_Registro_Compra = (id)=>{
  return  async(dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);

    try {
      console.log(id)
      const endpoint = URLBACK+`/orders/delete/${id}`;
      const response = await axiosInstance.put(endpoint);
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

export const Listado_Orders_Usuario = (userId) => {
  return async (dispatch, getState) => {
    const token = getState().token.data;
    configureAxios(token);

    try {
      const endpoint = URLBACK+`/orders/user/${userId}`;
      const response = await axiosInstance.get(endpoint);
      
      console.log("Respuesta del servidor:", response);

      if (response.data && response.data.length === 0) {
        console.log("El usuario no tiene órdenes.");
      }

      dispatch({
        type: LISTADOORDERSUSERS,
        payload: response.data,
      });

    } catch (error) {
      console.error("Error al obtener las órdenes del usuario:", error);
    }
  };
};
//!Actualizar la compra de usuario

export const Actualizar_Compra_Usuario = (datauser) => {
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);

    try {
      console.log("Estos son los datos a enviar: " + JSON.stringify(datauser));
     
      const endpoint = URLBACK+`/orders/${datauser.id}`;
      const response = await axiosInstance.put(endpoint, {
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
  return async (dispatch,getState) => {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const endpoint = URLBACK+`/orders/delete/${id}`;
      const response = await axiosInstance.put(endpoint);
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance(URLBACK+"/users/all");
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
  return async (dispatch,getState) => {
    const token=getToken()//getState().token.data;
    configureAxios(token);

    console.log("Usuario de Mercado pago" + JSON.stringify(DAtosMercadoPAgo));
    const mercadopago = {
      description: DAtosMercadoPAgo.descriptions,
      price_total: DAtosMercadoPAgo.price,
      quantity_order: DAtosMercadoPAgo.quantity,
    };

    try {
      const endpoint = URLBACK+"/mercadopago/create";
      const response = await axiosInstance.post(endpoint, mercadopago);
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance(URLBACK+"/orders/all");
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance.put(
        URLBACK+`/restaurants/${
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance.put(
        URLBACK+`/users/${isActive ? "restore" : "delete"}/${id}`
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {
      const response = await axiosInstance.put(
        URLBACK+`/menus/${isActive ? "restore" : "delete"}/${id}`
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
  return async function (dispatch,getState) {
    const token=getState().token.data;
    configureAxios(token);

    try {

      const response = await axiosInstance.put(

        URLBACK+`/menuitems/${
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


//==============Login y Logout Admin=======================================//
export const loginAdmin = (formData) => {
  

  return async (dispatch) => {
   
    try {
      const URL=URLBACK+"/users/login"
      console.log(URL);
      let response=await axios.post(URL,formData);

      return dispatch({
        type:ADMIN_LOGIN,
        payload: response
      })

    } catch (error) {
       alertify.alert("Mensaje", 
          'Usuario no autorizado');
      
    }

    }
  };



export const logoutAdmin = () => ({
  type: ADMIN_LOGOUT,
});

export const setTokenAdmin =(tokenLocalStorage)=>({
  
    type: SET_TOKEN,
    payload:tokenLocalStorage,
  
});


//=============================================================================//


export function getAllCategoriesAdmin() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    
    try {
      const response = await axiosInstance(URLBACK+`/categories/restaurant/${restaurantId}`);
      console.log("Categorías obtenidas:", response.data);
      return dispatch({
        type: GET_CATEGORIES_ADMIN,
        payload: response.data,
      });
      
    } catch (error) {
      alertify.alert("Mensaje", 'No hay categorias');
    }
    
  };
}
export function getAllCategoriesCompany() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    
    try {
      const response = await axiosInstance(URLBACK+`/categories/restaurant/${restaurantId}`);
      console.log("Categorías obtenidas:", response.data);
      return dispatch({
        type: GET_CATEGORIES_COMPANY,
        payload: response.data,
      });
      
    } catch (error) {
      alertify.alert("Mensaje", 'No hay categorias');
    }
    
  };
}

//! Actualizo la orden
export const Actualizar_Orden_Compra_MP = (ordenid, orderData) => {
  return async (dispatch)=> {
    const token = await getToken();
  


    console.log("Este es el token ", token);
    configureAxios(token);
    

    try {
      // Asegúrate de utilizar el método HTTP correcto (PUT o PATCH)
      const response = await axios.put(URLBACK+`/orders/status/${ordenid}`, {
        statusorder_id: orderData // Enviar orderData en el cuerpo de la solicitud
      });
     console.log("Orden actualizada orden completo:", JSON.stringify(response));
      return true;
    } catch (error) {
      console.error("Orden actualizada orden completo Otro error:", error);
      
      // Verificar el tipo de error
      if (error.response) {
        // La solicitud fue hecha y el servidor respondió con un código de estado
        // que no está en el rango de 2xx
       
      //  console.error("Datos del error de respuesta:", error.response.data);
        //console.error("Estado del error de respuesta:", error.response.status);
        //console.error("Cabeceras del error de respuesta:", error.response.headers);

        if (error.response.status === 403) {
          alertify.alert("Mensaje", "No tienes permisos para realizar esta operación.");
        } else {
          alertify.alert("Mensaje", `Error al actualizar la orden: ${error.response.data.message}`);
        }
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
  //      console.error("Error en la solicitud:", error.request);
        alertify.alert("Mensaje", "No se recibió respuesta del servidor.");
      } else {
        // Algo sucedió al configurar la solicitud que desencadenó un error
    //    console.error("Error", error.message);
        alertify.alert("Mensaje", `Error al actualizar la orden: ${error.message}`);
      }

      return false;
    }
  };
};

//! Login Empresa

export const login_Emrpesa =  (userData)=>{
  return async  (dispatch)=> {
    const user = {
      email: userData.emailOrPhone,
      password: userData.password,
    };
    try {

      const endpoint = URLBACK+"/restaurants/login";
      const responseToken= await axios.post(endpoint, user);
      const response=jwtDecode(responseToken.data);
      
      console.log("Empresa desarrollada es :", JSON.stringify(response));



       dispatch({
        type: EMPRESALOGIN,
        payload: response,
      });

      dispatch({
        type: USERTOKEN,
        payload:responseToken,
      });
      
    } catch (error) {
      alertify.alert("Error", 'Credenciales invalidas');
    }
    
  };
}


export const Data_Usuario=(id)=>{
  return async  (dispatch)=> {
    const token = getToken();
    configureAxios(token.data);
    try {


    console.log('data a modificar del user',id);
    const endpoint = URLBACK+`/users/${id}`;
    const response = await axiosInstance.get(endpoint);
    dispatch({
      type: UPDATE_USER_DATA,
      payload: response.data, 
    })
    } catch (error) {
      alertify.alert("Mensaje", 'No hay informacion disponible');
    }
    
  };
}



export const Sellcionar_Restaurante = (id) =>{
  return async  (dispatch)=> {
   
    try {


   
    dispatch({
      type: SELECTRESTAURANTE,
      payload: id, 
    })
    } catch (error) {
      alertify.alert("Mensaje", 'No hay categorias');
    }
    
  };
}
export const Data_Empresa=(id)=>{
  console.log("empresa id",id)
  return async  (dispatch)=> {
    try {
    const endpoint = URLBACK+`/restaurants/${id}`;
    const response = await axios.get(endpoint);
    console.log("detalle del action empresa",response)
    dispatch({
      type: GET_DETAIL_EMPRESA,
      payload: response.data, 
    })

    } catch (error) {
      alertify.alert("Mensaje", 'No hay info de restaurante');
      console.log(error)
    }
    
  };
}
export const Update_Empresa=(formData)=>{
  return async  (dispatch,getState)=> {
    const token = getToken();
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token.data);
    console.log("id restaurante",restaurantId);
    try {
    const endpoint = URLBACK+`/restaurants/${restaurantId}`;
    const response = await axiosInstance.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("detalle del action empresa",response)
    dispatch({
      type: PUT_DETAIL_EMPRESA,
      payload: response.data, 
    })
  } catch (error) {
    console.error("Error al obtener el restaurant:", error);
  }  
    }
  }
  


export const GetComment = (id) => {
  return async (dispatch) => {

    console.log("id en action", id);
    try {

      dispatch(clearComments());

      const response  = await axios.get(URLBACK+`/comments/${id}`);
      dispatch ({
        type: GET_COMMENT,
        payload: response.data,
      })
      
    } catch (error) {
  console.error("Error al obtener el comentario:", error);
      
    }
  }
}


export const clearComments = () => ({
  type: CLEAR_COMMENTS,
});




export const PostComment = (commentData) => {
  return async (dispatch) => {

    const token = getToken();
    configureAxios(token.data);
    try {
      
      dispatch(clearComments());

     
      const response = await axiosInstance.post(URLBACK+'/comments', commentData);

     
      dispatch({
        type: POST_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      
    }
  };
};

export function getCommentsCompany() {
  return async function (dispatch,getState) {
    const token=getState().token.data;
    const restaurantId = getState().EMPRESAUSER.id;
    configureAxios(token);
    
    try {
      const response = await axiosInstance(URLBACK+`/comments/${restaurantId}`);
      console.log("Categorías obtenidas:", response.data);
      return dispatch({
        type: GET_COMMENTS_COMPANY,
        payload: response.data,
      });
      
    } catch (error) {
      alertify.alert("Mensaje", 'No hay comentarios');
    }
    
  };
}
