import { Stack } from "expo-router";
import { Text } from "react-native";

export default function MenuLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: {backgroundColor: '#e17b48'}, 
      headerTintColor: 'black'
    }}/>
  )
}