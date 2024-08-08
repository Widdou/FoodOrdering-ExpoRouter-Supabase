import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Badge } from "react-native-elements";


export default function MenuLayout() {

  const { items } = useCart()

  const itemsCount = items.reduce((total, item) => total+item.quantity, 0)

  return (
    <Stack screenOptions={{
      headerStyle: {backgroundColor: '#e17b48'}, 
      headerTintColor: 'black',
      headerTitle: 'Menu',
      // headerShown: false,
      // tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
      headerRight: () => (
        // <Link href="/cart" asChild>
        <View>
          <Badge status='success' value={itemsCount} containerStyle={{position: 'absolute', top: -5, right: 5, zIndex: 10}}/>
          <Pressable onPress={() => items.length > 0 ? router.push('/cart') : null}>
            {({ pressed }) => (
              <FontAwesome
                name='shopping-cart'
                size={25}
                color='#000'
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
              />
            )}
          </Pressable>
        </View>
        // </Link>
      ),
    }}/>
  )
}