import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import products from 'assets/data/products'
import { useState } from 'react'

import Button from '@/components/Button'
import { PizzaSize } from '@/types'
import { useCart } from '@/providers/CartProvider'
import { FontAwesome } from '@expo/vector-icons'

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
      {/* <Stack.Screen options={{title: product.name}}/> */}
      <Stack.Screen options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${product.id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='pencil'
                    size={25}
                    color='white'
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          ),
      }}/>
      
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