const validationIngreso = (formData) => {
  const errors = {};

  if (!formData || typeof formData !== "object") {
    return errors;
  }

  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = "El correo electrónico o el número está vacío";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    if (emailPattern.test(formData.email)) {
    } else if (phonePattern.test(formData.email)) {
      if (formData.email.length !== 10) {
        errors.email =
          "El número de teléfono debe tener exactamente 10 dígitos";
      }
    } else {
      errors.email =
        "Ingrese un correo electrónico válido o un número de teléfono válido";
    }
  }

  if (!formData.password || formData.password.trim().length === 0) {
    errors.password = "La contraseña está vacía";
  }

  

  return errors;
};

export default validationIngreso;

