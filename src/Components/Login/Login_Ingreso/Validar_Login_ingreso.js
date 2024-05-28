const validationIngreso = (userData) => {
    const errors = {};

    // Verificar si userData está definido y es un objeto
    if (!userData || typeof userData !== 'object') {
        return errors; // Retorna un objeto de errores vacío si userData no está definido o no es un objeto
    }
    else
    // Verificar si el nombre está vacío
    if (userData.name && userData.name.trim().length === 0) {
        errors.name = 'El nombre no debe estar vacío';
    } 
    // Verificar la longitud del nombre
    else if (userData.name && (userData.name.trim().length < 4 || userData.name.trim().length > 40)) {
        errors.name = 'Usuario no valido';
    } else
    if (userData.name) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/; // Asumiendo que el número de celular es un número de 10 dígitos

        if (!emailPattern.test(userData.name) && !phonePattern.test(userData.name)) {
            errors.name = 'Usuario no valido';
        }
    }











    // Verificar si la contraseña está vacía
    if (userData.pass && userData.pass.trim().length === 0) {
        errors.pass = 'La contraseña no debe estar vacía';
    } 
    // Verificar si la contraseña contiene letras, números y caracteres especiales
    else 
    if (userData.pass) {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(userData.pass);
        const hasLowerCase = /[a-z]/.test(userData.pass);
        const hasNumber = /\d/.test(userData.pass);
        const hasSpecialChar = /[@$!%*?&]/.test(userData.pass);

        if (userData.pass.length < minLength) {
            errors.pass = 'Contraseña no valida'; //`La contraseña debe tener al menos ${minLength} caracteres`;
        } else if (!hasUpperCase) {
            errors.pass = 'Contraseña no valida';
        } else if (!hasLowerCase) {
            errors.pass = 'Contraseña no valida';
        } else if (!hasNumber) {
            errors.pass = 'Contraseña no valida';
        } else if (!hasSpecialChar) {
            errors.pass = 'Contraseña no valida';
        }
    }
    return errors;
};

export default validationIngreso;
