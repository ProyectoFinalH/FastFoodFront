import "./Login_Recuperar_key.css";

const Recuperarkey = ({ setView }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    //lógica para enviar la solicitud
  };

  return (
    <div className="bodyRecuperar">
      <form className="formRecuperar" onSubmit={handleSubmit}>
        <h2>Recuperar contraseña</h2>
        <p>
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace
          para restablecer tu contraseña.
        </p>
        <input type="email" placeholder="Correo electrónico" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Recuperarkey;
