import { FlatList, View, Text } from 'react-native';

import { Stack } from 'expo-router';

import { useCart } from '@/providers/CartProvider';


export default function MenuScreen() {

  const {items} = useCart()
  
  return (
    <View>
      <Stack.Screen options={{title: 'Orders'}}/>

      <FlatList
        data={items}
        renderItem={({item}) => <Text>ORDER</Text>}
        // contentContainerStyle={{gap: 10, padding: 10}}
      />
    </View>
  );
}
