import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {backgroundColor: 'blue'}, 
      headerTintColor: 'white',
    }}>
      <Stack.Screen name="index" options={{
          title: 'Menu',
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='plus-square-o'
                    size={25}
                    color='white'
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          ),
      }}/>

      {/* <StatusBar style="auto" /> */}
    </Stack>
  )
}