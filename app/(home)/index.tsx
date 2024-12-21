import { Text } from "react-native";
import { ScrollView } from "react-native";
import Item from "@/components/Item";
import { useQuery } from "react-query";

type Item = {
  id: number;
  content: string;
  created: string;
  user: { id: number; name: string };
};

async function fetchItems(): Promise<Item[]> {
  const res = await fetch("http://192.168.100.74:8080/posts");

  if (!res.ok) {
    throw new Error("Network res was not ok");
  }

  return res.json();
}

export default function Index() {
  const { data, error, isLoading } = useQuery<Item[], Error>("posts", fetchItems);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>No data</Text>;
  return (
    <ScrollView>
      {data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}
