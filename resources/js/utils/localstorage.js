export const setItem = (key, object) =>
    localStorage.setItem(key, JSON.stringify(object));

export const getItem = (key) => JSON.parse(localStorage.getItem(key));

export const removeObject = (key) => localStorage.removeItem(key);
