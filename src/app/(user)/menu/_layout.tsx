import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {backgroundColor: '#e17b48'}, 
      headerTintColor: 'black',
      headerTitle: 'Menu',
      // headerShown: false,
      // tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
      headerRight: () => (
        <Link href="/cart" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name='shopping-cart'
                size={25}
                color='#000'
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
              />
            )}
          </Pressable>
        </Link>
      ),
    }}/>
  )
}