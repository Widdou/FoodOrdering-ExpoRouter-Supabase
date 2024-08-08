import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React from 'react'

import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';

import { Stack, useLocalSearchParams } from 'expo-router'
import { useOrders } from '@/providers/OrderProvider'
import { useOrderDetails } from '@/api/orders';
import { useOrderItemsDetails } from '@/api/order-items';

type OrderDetailsScreenParams = {
  id: string
}


export default function OrderDetailsScreen() {
  const {id : idString} = useLocalSearchParams()
  const id = Number(typeof idString === 'string' ?idString : idString[0])

  const {data: order, error, isLoading} = useOrderDetails(id)
  
  if(isLoading) return <ActivityIndicator/>

  if(error) return <Text>Failed to fetch the orders</Text>

  if (!order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Order #'+id}}/>

      <OrderListItem order={order}/>

      <Text>Items:</Text>

      {!order || order.order_items.length == 0 ? 
        <Text>Order Items not found!</Text>
      :
        <FlatList
          data={order.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
        />        
      }

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