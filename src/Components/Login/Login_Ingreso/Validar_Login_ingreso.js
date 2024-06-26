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

  return errors;
};

export default validationIngreso;