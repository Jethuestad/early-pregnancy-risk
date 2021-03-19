export function getSeverity(s) {
  switch (s) {
    case 0:
      return "Low";
    case 1:
      return "Increased";
    case 2:
      return "Moderate";
    case 3:
      return "High";
    case 4:
      return "Very High";
    default:
      return "Error";
  }
}
