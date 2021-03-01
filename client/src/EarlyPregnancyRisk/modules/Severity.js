export function getSeverity(s) {
  switch (s) {
    case 1:
      return "Low";
    case 2:
      return "Increased";
    case 3:
      return "Moderate";
    case 4:
      return "High";
    case 5:
      return "Very High";
    default:
      return "Error";
  }
}
