import { FlatList, View, Text, ActivityIndicator } from 'react-native';

import { Stack } from 'expo-router';
import OrderListItem from '@/components/OrderListItem';

import { useOrders } from '@/providers/OrderProvider';
import { useMyOrderList } from '@/api/orders';

export default function OrdersScreen() {

  // const {orders} = useOrders()

  const {data: orders, error, isLoading} = useMyOrderList()

  if(isLoading) return <ActivityIndicator/>

  if(error) return <Text>Failed to fetch the orders</Text>

  if(!orders) {
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
