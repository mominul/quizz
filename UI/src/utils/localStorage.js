const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const findFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export { saveToLocalStorage, findFromLocalStorage };
