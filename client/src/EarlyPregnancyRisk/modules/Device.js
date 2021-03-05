import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export function isPhone() {
  return window.width < 600;
}
