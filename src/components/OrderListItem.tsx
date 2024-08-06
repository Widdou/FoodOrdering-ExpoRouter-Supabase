import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
// import { Order } from '../types';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router'

import { Tables } from '@/database.types';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order : Tables<'orders'> //Order
}

export default function OrderListItem({order} : OrderListItemProps) {

  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderTitle}>Order #{order.id}</Text>
          <Text>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderTime: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  }
})