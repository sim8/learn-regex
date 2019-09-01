export function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    let value = object[name];
    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

export const mapKeys = (obj = {}, fn) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: fn(obj[key])
    }),
    {}
  );
