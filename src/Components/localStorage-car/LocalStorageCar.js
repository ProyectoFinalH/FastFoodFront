const getItem = (id) => JSON.parse(localStorage.getItem(`card-${id}`));
const setItem = (id, item) => localStorage.setItem(`card-${id}`, JSON.stringify(item));
const removeItem = (id) => localStorage.removeItem(`card-${id}`);

// Obtener todos los items del carrito
export const obtenerItemsCarrito = () => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("card-"))
    .map((key) => getItem(key.split("-")[1]))
    .filter((item) => item.cont > 0);
};

// Guardar un item en el carrito
export const guardarItemCarrito = (item) => setItem(item.id, item);
export const eliminarItemCarrito = removeItem;

// Limpiar el carrito completamente
export const limpiarCarrito = () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith("card-"))
    .forEach((key) => removeItem(key.split("-")[1]));
};

export const actualizarItemCarrito = guardarItemCarrito;

// Obtener un item del carrito por ID
export const obtenerItemCarrito = (id) => getItem(id);

// Obtener el contador de un item en el carrito por ID
export const obtenerContCarrito = (id) => {
  const item = getItem(id);
  return item ? item.cont : 0;
};

// Función para actualizar la cantidad de un item
const updateItemCount = (id, increment) => {
  let item = getItem(id);
  if (!item) {
    item = { id: id, cont: 0 }; // Inicializar item si no existe
  }
  item.cont = Math.max(item.cont + increment, 0);
  if (item.cont === 0) {
    removeItem(id);
  } else {
    setItem(id, item);
  }
  return item.cont;
};

export const handleSumar = (id) => updateItemCount(id, 1);
export const handleDisminuir = (id) => updateItemCount(id, -1);

export const resetearCarrito = () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith("card-"))
    .forEach((key) => {
      const item = getItem(key.split("-")[1]);
      if (item) {
        item.cont = 0;
        setItem(item.id, item);
      }
    });
};
