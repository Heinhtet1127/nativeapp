import { ThemeSwitchButton } from "@/components/ThemeSwitchButton";
import { Link } from "expo-router";
import { View, Text } from "react-native";
export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemeSwitchButton />
    </View>
  );
}
