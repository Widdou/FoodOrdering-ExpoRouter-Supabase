import { router, Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import products from 'assets/data/products'
import { useState } from 'react'

import Button from '@/components/Button'

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const sizes = ['S', 'M', 'L', 'XL']
const priceModifier = [.8, 1, 1.2, 1.3]

export default function ProductsDetailsScreen() {

  const [selectedSize, setSelectedSize] = useState('M')

  const {id} = useLocalSearchParams()

  const product = products.find((p) => p.id.toString() === id)

  const addToCart = () => {
    console.warn('Adding to cart, size: ', selectedSize)
  }

  if(!product) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{title: 'Error'}}/>
      <Text>Product not found</Text>
    </View>
  }

  const price = Math.floor(product.price * priceModifier[sizes.findIndex(x => x == selectedSize)]) + .99

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}}/>
      
      <Image source={{uri: product?.image || defaultPizzaImage}} style={styles.image}/>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>$ {price}</Text>

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable 
            key={size} 
            onPress={() => setSelectedSize(size)}
            style={[styles.size, {backgroundColor: selectedSize === size ? 'orange' : 'white'}]}
          >
              <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'gray'}]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio odit totam nobis deserunt facere, necessitatibus repellendus reiciendis a eaque beatae quos. Vero pariatur non perspiciatis fugiat provident.</Text>

      <Button text='Add to Cart' onPress={addToCart}/>

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
  sizes: {
    flex: 1,
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  size: {
    borderRadius: 100,
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: 500,
  }
})