// Función para guardar el nombre del usuario en el Local Storage
export const guardarNombreUsuario = (nombre) => {
  if (nombre !== undefined && nombre !== null) {
    localStorage.setItem("User-name", JSON.stringify(nombre));
  } else {
    console.error("Error: nombre es undefined o null");
  }
};

// Función para obtener el nombre del usuario del Local Storage
export const obtenerNombreUsuario = () => {
  const nombre = localStorage.getItem("User-name");
  if (nombre === null || nombre === undefined) {
    console.error("Error: nombre es null o undefined");
    return null;
  }
  try {
    return JSON.parse(nombre);
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return null;
  }
};

// Función para guardar el correo del usuario en el Local Storage
export const guardarCorreoUsuario = (correo) => {
  if (correo !== undefined && correo !== null) {
    localStorage.setItem("User-mail", JSON.stringify(correo));
  } else {
    console.error("Error: correo es undefined o null");
  }
};

// Función para obtener el correo del usuario del Local Storage
export const obtenerCorreoUsuario = () => {
  const correo = localStorage.getItem("User-mail");
  if (correo === null || correo === undefined) {
    console.error("Error: correo es null o undefined");
    return null;
  }
  try {
    return JSON.parse(correo);
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return null;
  }
};

// Función para guardar el estado del usuario en el Local Storage
export const guardarEstatusUsuario = (estatus) => {
  if (estatus !== undefined && estatus !== null) {
    localStorage.setItem("User-status", JSON.stringify(estatus));
  } else {
    console.error("Error: estatus es undefined o null");
  }
};

// Función para obtener el estado del usuario del Local Storage
export const obtenerEstatusUsuario = () => {
  const estatus = localStorage.getItem("User-status");
  if (estatus === null || estatus === undefined) {
    console.error("Error: estatus es null o undefined");
    return null;
  }
  try {
    return JSON.parse(estatus);
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return null;
  }
};

// Función para guardar el id del usuario en el Local Storage
export const guardarIdUsuario = (id_user) => {
  if (id_user !== undefined && id_user !== null) {
    localStorage.setItem("User-id", JSON.stringify(id_user));
  } else {
    console.error("Error: id_user es undefined o null");
  }
};

// Función para obtener el id del usuario del Local Storage
export const obtenerIdUsuario = () => {
  const idUsuario = localStorage.getItem("User-id");
  if (idUsuario === null || idUsuario === undefined) {
    console.error("Error: idUsuario es null o undefined");
    return null;
  }
  try {
    return JSON.parse(idUsuario);
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return null;
  }
};

// Función para eliminar los datos del usuario del Local Storage
export const eliminarDatosUsuario = () => {
  localStorage.removeItem("User-name");
  localStorage.removeItem("User-mail");
  localStorage.removeItem("User-status");
  localStorage.removeItem("User-id");
};


// Función para guardar el token en el Local Storage
export const setToken = (token) => {
  try {
    localStorage.setItem("token-general", JSON.stringify(token));
    console.log("Token almacenado correctamente.");
  } catch (error) {
    console.error("Error al almacenar el token:", error);
  }
};

// Función para obtener el token del Local Storage
export const getToken = () => {
  try {
    const token = localStorage.getItem("token-general");
    if (token === null || token === undefined) {
      console.error("Error: token es null o undefined");
      return null;
    }
    return JSON.parse(token);
  } catch (error) {
    console.error("Error al parsear el token:", error);
    return null;
  }
};




//!functuion para guardar el  restaurante seleccionado 
// Función para guardar el token en el Local Storage
export const setSelctRestaurantapp = (restauran) => {
  try {
    localStorage.setItem("restauran-select", JSON.stringify(restauran));
    console.log("Token almacenado correctamente.");
  } catch (error) {
    console.error("Error al almacenar el token:", error);
  }
};

// Función para obtener el token del Local Storage
export const getSelctRestaurantapp = () => {
  try {
    const token = localStorage.getItem("restauran-select");
    if (token === null || token === undefined) {
      console.error("Error: token es null o undefined");
      return null;
    }
    return JSON.parse(token);
  } catch (error) {
    console.error("Error al parsear el token:", error);
    return null;
  }
};