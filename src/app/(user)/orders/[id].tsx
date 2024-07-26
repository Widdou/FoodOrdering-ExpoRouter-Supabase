import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React from 'react'

import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';

import { Stack, useLocalSearchParams } from 'expo-router'
import { useOrders } from '@/providers/OrderProvider'

type OrderDetailsScreenParams = {
  id: string
}


export default function OrderDetailsScreen() {
  // const {id} = useLocalSearchParams<OrderDetailsScreenParams>()
  const {id} = useLocalSearchParams()

  const {orders} = useOrders()

  // const order : Order | undefined = orders.find(o => o.id == Number(params.id))
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Order #'+id}}/>

      <OrderListItem order={order}/>

      <Text>Items:</Text>

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
})