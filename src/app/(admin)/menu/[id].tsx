import { router, Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import products from 'assets/data/products'
import { useState } from 'react'

import Button from '@/components/Button'
import { PizzaSize } from '@/types'
import { useCart } from '@/providers/CartProvider'

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export default function ProductsDetailsScreen() {

  const {id} = useLocalSearchParams()

  const product = products.find((p) => p.id.toString() === id)

  if(!product) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{title: 'Error'}}/>
      <Text>Product not found</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}}/>
      
      <Image source={{uri: product?.image || defaultPizzaImage}} style={styles.image}/>

      <Text>Nombre:</Text>
      <Text style={styles.name}>{product.name}</Text>
      
      <Text>Precio:</Text>
      <Text style={styles.name}>$ {product.price}</Text>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    gap: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  name: {
    fontSize: 24,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
})