const validationIngreso = (userData) => {
  const errors = {};

  if (!userData || typeof userData !== "object") {
    return errors;
  }

  if (!userData.emailOrPhone || userData.emailOrPhone.trim().length === 0) {
    errors.emailOrPhone = "El correo electrónico o el número esta vacío";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;


    if (
      !emailPattern.test(userData.emailOrPhone) &&
      !phonePattern.test(userData.emailOrPhone)
    ) {
      errors.emailOrPhone =
        "Ingrese un correo electrónico válido o un número de teléfono válido";
    }
  }

  if (!userData.password || userData.password.trim().length === 0) {
    errors.password = "La contraseña esta vacía";
  }

  return errors;
};

export default validationIngreso;

//if (userData.name) {
   // const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    //const phonePattern = /^\d{10}$/; // Asumiendo que el número de celular es un número de 10 dígitos

  //  if (!emailPattern.test(userData.name) && !phonePattern.test(userData.name)) {
  ////      errors.name = 'Usuario no valido';
  //  }
//}
// Verificar la longitud del nombre
//else if (userData.name && (userData.name.trim().length < 4 || userData.name.trim().length > 40)) {
//errors.name = 'Usuario no valido';
//} else
//if (userData.name) {
   // const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
   // const phonePattern = /^\d{10}$/; // Asumiendo que el número de celular es un número de 10 dígitos

   // if (!emailPattern.test(userData.name) && !phonePattern.test(userData.name)) {
   //     errors.name = 'Usuario no valido';
   // }
//}