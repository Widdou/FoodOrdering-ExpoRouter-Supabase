import { FlatList, View, Text } from 'react-native';

import { Stack } from 'expo-router';
import OrderListItem from '@/components/OrderListItem';

import { useOrders } from '@/providers/OrderProvider';

export default function OrdersScreen() {

  const {orders} = useOrders()

  if(orders.length == 0) {
    return <View>
      <Text style={{textAlign: 'center', padding: 50, fontSize: 20, fontWeight: 'medium'}}>No items in the order yet</Text>
    </View>
  }
  
  return (
    <>
      <Stack.Screen options={{title: 'Orders'}}/>

      <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}}
        />
    </>
  );
}
