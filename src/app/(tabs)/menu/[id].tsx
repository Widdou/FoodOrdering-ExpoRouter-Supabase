import { Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, Image } from 'react-native'

import products from 'assets/data/products'
import type { Product } from '@/types'


export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export default function ProductsDetailsScreen() {
  const {id} = useLocalSearchParams()

  const product = products[Number(id) - 1]

  return (
    <View>
      <Stack.Screen options={{title: 'Details: '+id}}/>

      <Text>ProductsDetailsScreen - {id}</Text>
      
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>

      <Text>{product.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
  }
})