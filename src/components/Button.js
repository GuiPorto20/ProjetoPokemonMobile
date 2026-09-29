import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

export default function Button({
  title,
  onPress,
  secondary = false,
  compact = false,
  style,
  textStyle: customTextStyle,
}) {
  const buttonStyle = [
    styles.button,
    secondary && styles.secondaryButton,
    compact && styles.compactButton,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    secondary && styles.secondaryButtonText,
    customTextStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
