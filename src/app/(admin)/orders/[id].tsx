import { View, Text, FlatList, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

import OrderItemListItem from '@/components/OrderItemListItem';
import OrderListItem from '@/components/OrderListItem';

import { Stack, useLocalSearchParams } from 'expo-router'
import { Order, OrderStatusList } from '@/types';
import Colors from '@/constants/Colors';
import { useOrderDetails } from '@/api/orders';

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

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => <OrdersStatusButtons order={order}/>}
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

type OrdersStatusButtonsProps = {
  order : Order
}

const OrdersStatusButtons = ({order} : OrdersStatusButtonsProps) => {
  return <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {OrderStatusList.map((status) => (
      <Pressable
        key={status}
        onPress={() => console.warn('Update status')}
        style={{
          borderColor: Colors.light.tint,
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === status
              ? Colors.light.tint
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === status ? 'white' : Colors.light.tint,
          }}
        >
          {status}
        </Text>
      </Pressable>
    ))}
  </View>
</>

}