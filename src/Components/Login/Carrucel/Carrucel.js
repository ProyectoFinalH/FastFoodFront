import './Carrucel.css'
import imagen from '../Login_imagenes/food_sin_fondosi.png'
/*import no_like from '../Login_imagenes/iconos_carrucel/no_gusta.png'
import si_like from '../Login_imagenes/iconos_carrucel/me_gusta.png'
import regular_like from '../Login_imagenes/iconos_carrucel/me_gusta_regular.png'
import like_like from '../Login_imagenes/iconos_carrucel/me_encanta.png'*/
const Carrucel = () =>{
    return (
        <div className="loginCarrucel">
              
              <div className="grupogeneralcarrucel">
                    <h1>DAtos del elemento</h1>
                    <div className="carrucelimagen_centro"> 
                        <img src={imagen} alt="imagen del mostratr" className="imagencarrucelmostrar"/>
                    </div>
                    
            </div>
        </div>
    )
}
export default Carrucel