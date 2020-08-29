export function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);

  const newObject = propNames.reduce((obj, key) => {
    const value = object[key];
    return {
      ...obj,
      [key]: value && typeof value === 'object' ? deepFreeze(value) : value,
    };
  }, {});

  return Object.freeze(newObject);
}

export const mapKeys = (obj = {}, fn) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: fn(obj[key]),
    }),
    {}
  );
