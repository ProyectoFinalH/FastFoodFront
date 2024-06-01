import { REGISTERUSER, REGISTERBUSINESS, RECOVERYKEY, USERLOGIN, USERLOGINGOOGLE } from "./action-types"

const initialState = {
    Registrado: null,
    copydogs:[],
    temperamento:[]
}

const reducer = (state= initialState, {type, payload})=>{
   // console.log("entro al reducer la informacion" + payload);
    switch( type ){
        case REGISTERUSER:
            return{
                ...state, Registrado:payload
            }
        case REGISTERBUSINESS:
            return{
                ...state, Registrado:payload
            }
         case RECOVERYKEY:
             return{
                    ...state, Registrado:payload
             } 
        case USERLOGIN:
             return{
                    ...state, Registrado:payload
             } 
        case USERLOGINGOOGLE:
             return{
                    ...state, Registrado:payload
             }   
            default:
                return {...state}
        }
    }
      /*  case TEMPERAMENTO:
            return {
                ...state, temperamento:payload
            }
        case FILTROINPUT:
            const copiedAllDogs = state.copydogs.slice(); // Copia el estado
            const busquedaporname = copiedAllDogs.filter(element => element.name.toLowerCase().includes(payload?.toLowerCase()))
            return {
                ...state,
                allDogs:busquedaporname
            }
        case ORDERAZ:
            let orderedDogs = state.copydogs.slice();
            if (payload === 'A') {
                orderedDogs.sort((a, b) => a.name.localeCompare(b.name));
            } else if (payload === 'B') {
                orderedDogs.sort((a, b) => b.name.localeCompare(a.name));
            }
            console.log('esto manda el reduces ' + JSON.stringify(orderedDogs))
            return {
                ...state,
                allDogs:orderedDogs
            }
        case FILTROTEMPERAMENTO:
            let copy = state.copydogs.slice();
            const busquedaportemperamento = copy.filter(element => {
                const temperament = element.temperament;
                if (temperament) {
                    return temperament.toLowerCase().includes(payload?.toLowerCase());
                }
                return false;
            });
            console.log("Esta es la busqueda " + busquedaportemperamento);
            return {
                ...state,
                allDogs:busquedaportemperamento
            }
        case COPYDOG:
            return{
                ...state,
                allDogs: state.copydogs
            } 
        case IDBD: 
        let bd = state.copydogs.slice();
            const busquedatpBD = bd.filter(element => {
                const tipoBD = element.bd;
                if (tipoBD) {
                    return tipoBD.toLowerCase().includes(payload?.toLowerCase());
                }
                return false;
            });
            console.log("Esta es la busqueda " + busquedatpBD);
            return {
                ...state,
                allDogs:busquedatpBD
            }
      
}*/

export default reducer;
