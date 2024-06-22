const validationIngreso = (formData) => {
  const errors = {};

  if (!formData || typeof formData !== "object") {
    return errors;
  }

  if (!formData.emailOrPhone || formData.emailOrPhone.trim().length === 0) {
    errors.emailOrPhone = "El correo electrónico o el número está vacío";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    if (emailPattern.test(formData.emailOrPhone)) {
    } else if (phonePattern.test(formData.emailOrPhone)) {
      if (formData.emailOrPhone.length !== 10) {
        errors.emailOrPhone =
          "El número de teléfono debe tener exactamente 10 dígitos";
      }
    } else {
      errors.emailOrPhone =
        "Ingrese un correo electrónico válido o un número de teléfono válido";
    }
  }

  if (!formData.password || formData.password.trim().length === 0) {
    errors.password = "La contraseña está vacía";
  }

  if (formData.password !== "1234") {
    errors.password = "La contraseña es incorrecta";
  }

  if (formData.emailOrPhone !== "admin@gmail.com") {
    errors.emailOrPhone =
      "El email no pertece a un usuario de administrador";
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
