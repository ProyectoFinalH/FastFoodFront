import { REGISTERUSER, REGISTERBUSINESS, RECOVERYKEY, USERLOGIN, USERLOGINGOOGLE } from "./action-types"
import axios from 'axios'


//Registramos usuario 
export const register_user = (dataquery) => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/register';
            const response = await axios.post(endpoint, dataquery);
            const userData = response.data;



            console.log("Datos encontrados", JSON.stringify(userData));

            if (userData && userData.save === 'yes') {

            dispatch({
                type: REGISTERUSER,
                payload: userData,
            });
        }else{
            alert('Error al registrar el usuario');
        }
        } catch (error) {
            console.log("Error al enviar la información", error.message);
        }
    };
};

//Registramos empresa 
export const register_business = (dataquery) => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/register';
            const response = await axios.post(endpoint, dataquery);
            const userData = response.data;



            console.log("Datos encontrados", JSON.stringify(userData));

            if (userData && userData.save === 'yes') {

            dispatch({
                type: REGISTERBUSINESS,
                payload: userData,
            });
        }else{
            alert('Error al registrar el usuario');
        }
        } catch (error) {
            console.log("Error al enviar la información", error.message);
        }
    };
};


//REcuperar contraseña

export const recovery_key_user = (dataquery) => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/register';
            const response = await axios.post(endpoint, dataquery);
            const userData = response.data;



            console.log("Datos encontrados", JSON.stringify(userData));

            if (userData && userData.save === 'yes') {

            dispatch({
                type: RECOVERYKEY,
                payload: userData,
            });
        }else{
            alert('Error al registrar el usuario');
        }
        } catch (error) {
            console.log("Error al enviar la información", error.message);
        }
    };
};




//Loguear usuario
export const login_User = (dataquery)=>{
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/recuperarkey';
            
            const response = await axios.post(endpoint, dataquery)


            dispatch({
                        type:USERLOGIN,
                        payload:response
                 })
        } catch (error) {
            console.log("Error al enviar mensaje", error.message);
        }

    }
}



//Loguear usuario
export const login_User_Google = (dataquery)=>{
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/recuperarkey';
            
            const response = await axios.post(endpoint, dataquery)


            dispatch({
                        type:USERLOGINGOOGLE,
                        payload:response
                 })
        } catch (error) {
            console.log("Error al enviar mensaje", error.message);
        }

    }
}
