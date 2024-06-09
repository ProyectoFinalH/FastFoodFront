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
    if (item.cont === 0) {
      removeItem(id);
    } else {
      setItem(id, item);
    }
    return item;
  }
  return null;
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