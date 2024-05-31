import { REGISTER, RECOVERYKEY } from "./action-types"
import axios from 'axios'


//Registramos usuario 
export const REgister_user = (dataquery) => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/register';
            const response = await axios.post(endpoint, dataquery);
            const userData = response.data;



            console.log("Datos encontrados", JSON.stringify(userData));

            if (userData && userData.save === 'yes') {

            dispatch({
                type: REGISTER,
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

/*/ Acción para verificar usuario
export const Verify_User_Code = (dataquery) => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/verify';
            const response = await axios.post(endpoint, dataquery);
            const verificationData = response.data;

            console.log("Verificación de usuario", JSON.stringify(verificationData));

            let Autorise;
            if (verificationData.message === 'Usuario verificado con éxito') {
               // alert('Usuario verificado con éxito, Ahora puedes acceder');
                Autorise = "Verificado";
            } else {
              //  alert('Error al verificar el usuario');
                Autorise = "Error";
            }

            dispatch({
                type: REGISTRAR,
                payload: Autorise ,
            });
        } catch (error) {
            console.log("Error al verificar el usuario", error.message);
            alert("Error Fatal, Comunicate con el administrador");
        }
    };
};

*/





export const recovery_key = (dataquery)=>{
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/atleticos/recuperarkey';
            
            const response = await axios.post(endpoint, dataquery)


            dispatch({
                        type:RECOVERYKEY,
                        payload:response
                 })
        } catch (error) {
            console.log("Error al enviar mensaje", error.message);
        }

    }
}







/*

export const Alldogs = () => {
    return async (dispatch) => {
        try {
            const endpoint = 'http://localhost:3001/dogs';
            const { data } = await axios.get(endpoint);

            let priemrabusqueda = [];

            if (data?.api) {
                data.api.forEach((breeds) => {
                    if (breeds.breeds) {
                        let inf = breeds.breeds.map((elemento) => ({
                            bd:'API',
                            code: breeds.id,
                            id: elemento.id,
                            name: elemento.name,
                            country_code: elemento.country_code,
                            life_span: elemento.life_span,
                            temperament: elemento.temperament,
                            weight: elemento.weight.metric,
                            url: breeds.url,
                        }));
                        priemrabusqueda.push(...inf);
                    }
                });
            }

            if (data?.bd) {
                let infbd = data.bd.map((elemento) => ({
                    bd:'BD',
                    code: elemento.id,
                    id: elemento.id,
                    name: elemento.name,
                    country_code: elemento.country_code,
                    life_span: elemento.life_span,
                    temperament: elemento.temperament,
                    weight: elemento.weight,
                    url: elemento.url,
                }));
                priemrabusqueda.push(...infbd);
            }

            dispatch({
                type: AllDOGS,
                payload: priemrabusqueda,
            });
        } catch (error) {
            console.error("El dato de error es: " + error);
            // Aquí puedes lanzar una acción de error o mostrar un mensaje de error al usuario
        }
    };
};

export const AllTemperamento = ()=>{
    return async (dispatch)=>{
        try {
            const endpoint = 'http://localhost:3001/temperament'
            const {data} = await axios.get(endpoint)
            const {temperamentos} =  data
          //  const priemrabusqueda = []
            console.log("Este es el temperamento "+JSON.stringify(data))

            dispatch({
                type: TEMPERAMENTO,
                payload: temperamentos,
            })
        } catch (error) {
            console.error("El dato de error es: "+error)
        }
    }
}


export const FiltroInput = (dato)=>{
    return async (dispatch) =>{
        dispatch({
        type: FILTROINPUT,
        payload: dato,
    })
}
}

export const OrderAZ = (dato)=>{
    return async (dispatch) =>{
        dispatch({
        type: ORDERAZ,
        payload: dato,
    })
}
}

export const FiltertTemperamento = (dato)=>{
    return async (dispatch) =>{
        dispatch({
        type: FILTROTEMPERAMENTO,
        payload: dato,
    })
}
}

export const Copydog = () =>{
    return async (dispatch) =>{
        dispatch({
        type: COPYDOG,
        payload: '',
    })
}
}

export const SeleccionaBD = (dato)=>{
    return async (dispatch) =>{
        dispatch({
        type: IDBD,
        payload: dato,
    })
}
}
*/