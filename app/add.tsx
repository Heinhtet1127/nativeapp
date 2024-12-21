import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function add() {
  return (
    <View>
      <Text>Add</Text>
      <Link href="../">Back</Link>
    </View>
  );
}
