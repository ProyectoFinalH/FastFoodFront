export const validarUsername = (username) => {
    if (!/^[a-zA-Z]{4,20}$/.test(username) && username !== "") {
      return "El nombre de usuario debe tener entre 4 y 20 caracteres y solo contener letras.";
    }
    return "";
  };
  
  export const validarPassword = (password) => {
    if (!/^[a-zA-Z0-9]{5,20}$/.test(password) && password !== "") {
      return "La contraseña debe tener entre 5 y 20 caracteres y solo contener letras y números.";
    }
    return "";
  };
  