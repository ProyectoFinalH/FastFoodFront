// Función para guardar el nombre del usuario en el Local Storage
export const guardarNombreUsuario = (nombre) => {
    localStorage.setItem('User-name', JSON.stringify(nombre));
  };
  
  // Función para obtener el nombre del usuario del Local Storage
  export const obtenerNombreUsuario = () => {
    const nombre = localStorage.getItem('User-name');
    return nombre ? JSON.parse(nombre) : null;
  };
  
  // Función para guardar el correo del usuario en el Local Storage
  export const guardarCorreoUsuario = (correo) => {
    localStorage.setItem('User-mail', JSON.stringify(correo));
  };
  
  // Función para obtener el correo del usuario del Local Storage
  export const obtenerCorreoUsuario = () => {
    const correo = localStorage.getItem('User-mail');
    return correo ? JSON.parse(correo) : null;
  };
  
  // Función para guardar el estado del usuario en el Local Storage
  export const guardarEstatusUsuario = (estatus) => {
    localStorage.setItem('User-status', JSON.stringify(estatus));
  };


  // Función para guardar el estado del usuario en el Local Storage
  export const guardarIdUsuario = (id_user) => {
    localStorage.setItem('User-id', JSON.stringify(id_user));
  };
  
  export const obtenerIdUsuario = ()=>{
    const idUsuairo= localStorage.getItem('User-id');
    return idUsuairo ? JSON.parse(idUsuairo) : null;
  }
  // Función para obtener el estado del usuario del Local Storage
  export const obtenerEstatusUsuario = () => {
    const estatus = localStorage.getItem('User-status');
    return estatus ? JSON.parse(estatus) : null;
  };
  
  // Función para eliminar los datos del usuario del Local Storage
  export const eliminarDatosUsuario = () => {
    localStorage.removeItem('User-name');
    localStorage.removeItem('User-mail');
    localStorage.removeItem('User-status');
    localStorage.removeItem('User-Id');
  };
  

  
  // Eliminar los datos del usuario
  //eliminarDatosUsuario();
  