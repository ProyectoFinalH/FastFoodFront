const validationRigistro = (userData) => {
  const errors = {};

  if (!userData || typeof userData !== "object") {
    return errors;
  }

  if (!userData.email || userData.email.trim().length === 0) {
    errors.email = "El campo electrónico está vacío";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //  const phonePattern = /^\d{10}$/;

    if (
      !emailPattern.test(userData.email)// &&
 //     !phonePattern.test(userData.emailOrPhone)
    ) {
      errors.email =
        "Ingrese un correo electrónico válido";
    }
  }

  return errors;
};

export default validationRigistro;
