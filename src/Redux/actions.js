import { REGISTERUSER, REGISTERBUSINESS, RECOVERYKEY, USERLOGIN, USERLOGINGOOGLE, HAMBURGUER } from "./action-types"
import axios from 'axios'


//Registramos usuario 
export const register_user = (dataquery) => {
    return async (dispatch) => {
        try {
           // alert("Entro al dispach")
            const userData = {
                                username:dataquery.username,
                                email:dataquery.email,
                                password:dataquery.password
            }
          //  alert ("usuario "+userData.username)
            const endpoint = 'http://localhost:5000/users/create';
            
            const response = await axios.post(endpoint, userData);
            const {id, username, email, password, google_id, role_id } =response.data

           // alert("El data es " + {id, username, email, password, google_id, role_id })

           

            const userDatauser= {id, username, email, password, google_id, role_id }
           // console.log("Datos encontrados", JSON.stringify(userDatauser));
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
            
            const userData = {
                email:dataquery.emailOrPhone,
                password:dataquery.password
            }
        
           // const params = new URLSearchParams(userData).toString();
          
           // alert ("Lo que tienen el username en el anme es "+ userData.username )
            
            const endpoint = 'http://localhost:5000/users/login';
            
            
            //const response = await axios.get(`${endpoint}?${params}`);
           
            const response = await axios.post(endpoint, userData);
            const userDatauser=response.data
           // console.log("lo que tengo de retorno "+ userDatauser[0])
            console.log("lo que tengo de retorno "+ JSON.stringify(userDatauser))
            //const userDatauser= {id, username, email, password, google_id, role_id }

            dispatch({
                        type:USERLOGIN,
                        payload:userDatauser
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

export const filter_hamburguer = (dataquery)=>{
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/types';
            
            const response = await axios.get(`${endpoint}?${dataquery}`)


            dispatch({
                        type:HAMBURGUER,
                        payload:response
                 })
        } catch (error) {
            console.log("Error al enviar mensaje", error.message);
        }

    }
}
