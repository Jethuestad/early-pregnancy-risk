export function checkRequirement(requirement, value, type) {
  let [c, v] = requirement.split(";");
  if (type === "integer") {
    switch (c) {
      case "=":
        return ((x) => x == Number(v))(value);
      case ">":
        return ((x) => x > Number(v))(value);
      case "<":
        return ((x) => x < Number(v))(value);
      case ">=":
        return ((x) => x >= Number(v))(value);
      case "<=":
        return ((x) => x <= Number(v))(value);
      default:
        return false;
    }
  } else if (type === "boolean") {
    switch (v) {
      case "T":
        return value == true;
      case "F":
        return value == false;
      default:
        return false;
    }
  }
  return false;
}
