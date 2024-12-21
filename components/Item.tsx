import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useMutation, useQueryClient } from "react-query";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cardHearder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  author: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  authorName: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

type Item = {
  id: number;
  content: string;
  created: string;
  user: { id: number; name: string };
};

async function deleteItem(id: number) {
  const res = await fetch(`http://192.168.100.74:8080/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Network res was not ok");
  }

  return res.json;
}

export default function Item({ item }: { item: Item }) {
  const queryClient = useQueryClient();

  const remove = useMutation(deleteItem, {
    onMutate: async (id) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData<Item[] | undefined>("posts", (old) => {
        return old?.filter((item) => item.id !== id);
      });
    },
  });
  return (
    <View style={styles.card}>
      <View style={styles.cardHearder}>
        <View style={styles.author}>
          <Ionicons name="person-circle" size={32} color="#F72C5B" />
          <Text style={styles.authorName}>{item.user.name}</Text>
          <Text>4h</Text>
        </View>

        <TouchableOpacity onPress={() => remove.mutate(item.id)}>
          <Ionicons name="trash" color="gray" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        //heart
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={18} color={"red"} />
          </TouchableOpacity>
          <Text>122</Text>
        </View>
        //comment
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity>
            <Ionicons name="chatbubble" size={18} color={"red"} />
          </TouchableOpacity>
          <Text>12</Text>
        </View>
        //share
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={18} color={"red"} />
          </TouchableOpacity>
          <Text>12</Text>
        </View>
      </View>
    </View>
  );
}
