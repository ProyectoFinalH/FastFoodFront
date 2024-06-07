import "./infoCompany.css";

function InfoCompany() {
  return (
    <div >
      <h2>Informacion de tu empresa</h2>
    <div className="infoCompanyContainer">
      <div className="labelContainer">
        <h3>Nombre:</h3>
        <label>
          NOMBRE DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      <div className="labelContainer">
      <h3>Imagen:</h3>
        <label>
          IMAGEN DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      <div className="labelContainer">
      <h3>Descripcion:</h3>
        <label>
          DESCRIPCION DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      <div className="labelContainer">
      <h3>Email:</h3>
        <label>
          EMAIL DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      <div className="labelContainer">
      <h3>Telefono:</h3>
        <label>
          TELEFONO DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      <div className="labelContainer">
      <h3>Contraseña:</h3>
        <label>
          CONTRASEÑA DE LA EMPRESA
        </label>
          <button>Cambiar</button>
      </div>
      </div>
    </div>
  );
}

export default InfoCompany;
