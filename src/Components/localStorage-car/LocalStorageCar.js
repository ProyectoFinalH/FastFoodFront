const getItem = (id) => JSON.parse(localStorage.getItem(`card-${id}`));
const setItem = (id, item) => localStorage.setItem(`card-${id}`, JSON.stringify(item));
const removeItem = (id) => localStorage.removeItem(`card-${id}`);

export const obtenerItemsCarrito = () => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith("card-"))
    .map((key) => getItem(key.split("-")[1]))
    .filter((item) => item.cont > 0);
};

export const guardarItemCarrito = (item) => setItem(item.id, item);
export const eliminarItemCarrito = removeItem;
export const limpiarCarrito = () => localStorage.clear();

export const actualizarItemCarrito = guardarItemCarrito;

export const obtenerItemCarrito = (id) => getItem(id);

export const obtenerContCarrito = (id) => {
  const item = getItem(id);
  return item ? item.cont : 0;
};

const updateItemCount = (id, increment) => {
  const item = getItem(id);
  if (item) {
    item.cont = Math.max(item.cont + increment, 0);
    setItem(id, item);
    return item;
  }
  return null;
};

export const handleSumar = (id) => updateItemCount(id, 1);
export const handleDisminuir = (id) => updateItemCount(id, -1);






/*// Obtener todos los ítems del carrito
export const obtenerItemsCarrito = () => {
  const cardKeys = Object.keys(localStorage);
  const cards = cardKeys
    .filter((key) => key.startsWith("card-"))
    .map((key) => JSON.parse(localStorage.getItem(key)))
    .filter((card) => card.cont > 0); // Filtrar los items con cont > 0
  return cards;
};







export const guardarItemCarrito = (item) => {
  localStorage.setItem(`card-${item.id}`, JSON.stringify(item));
};



// Eliminar un ítem del carrito
export const eliminarItemCarrito = (id) => {
  localStorage.removeItem(`card-${id}`);
};




// Limpiar todos los ítems del carrito
export const limpiarCarrito = () => {
  localStorage.clear();
};






export const actualizarItemCarrito = (item) => {
  localStorage.setItem(`card-${item.id}`, JSON.stringify(item));
};






export const obtenerItemCarrito = (id) => {
  const storedData = localStorage.getItem(`card-${id}`);
  return storedData ? JSON.parse(storedData) : null;
};





export const obtenerContCarrito = (id) => {
  const storedData = localStorage.getItem(`card-${id}`);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData.cont;
  }
  return 0; // Retorna 0 si no hay datos en localStorage para el id dado
};



export const handleSumar = (id) => {
  // Obtener el item del carrito del localStorage
  const storedData = localStorage.getItem(`card-${id}`);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    // Incrementar el contador
    const newCount = parsedData.cont + 1;
    // Actualizar el item con el contador incrementado
    const updatedCard = { ...parsedData, cont: newCount };
    // Guardar el item actualizado en el localStorage
    localStorage.setItem(`card-${id}`, JSON.stringify(updatedCard));
    return updatedCard;
  }
  return null;
};



export const handleDisminuir = (id) => {
  // Obtener el item del carrito del localStorage
  const storedData = localStorage.getItem(`card-${id}`);
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    // Disminuir el contador en 1 si es mayor que 0
    const newCount = parsedData.cont > 0 ? parsedData.cont - 1 : 0;
    // Actualizar el item con el contador disminuido
    const updatedCard = { ...parsedData, cont: newCount };
    // Guardar el item actualizado en el localStorage
    localStorage.setItem(`card-${id}`, JSON.stringify(updatedCard));
    return updatedCard;
  }
  return null;
};*/