export function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);

  // eslint-disable-next-line no-restricted-syntax
  for (const name of propNames) {
    const value = object[name];
    // eslint-disable-next-line no-param-reassign
    object[name] =
      value && typeof value === 'object' ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

export const mapKeys = (obj = {}, fn) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: fn(obj[key]),
    }),
    {}
  );
