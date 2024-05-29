import './Loading.css'
import loadingimg from './Loadin_imagenes/iconos/giphy.gif'
const Loading = ()=> {

    return(
    <div className="bodyloading">
        <img src={loadingimg} alt="Cargando"/>
    </div>
            
    )
}
export default Loading;