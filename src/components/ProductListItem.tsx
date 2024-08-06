import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';

import type { Tables } from '../types';

type ProductListItemProps = {
  product : Tables<'products'>
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({product} : ProductListItemProps) => {
  const segments = useSegments()  // Return the relative segments of the URL Screens 

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image}/>

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>

      </Pressable>
    </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFF'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 12,
    color: Colors.light.text,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});
