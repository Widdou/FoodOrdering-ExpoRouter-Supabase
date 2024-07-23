import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { Product } from '../types';
import { Link } from 'expo-router';

type ProductListItemProps = {
  product : Product
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({product} : ProductListItemProps) => {
  return (
    <Link href={`/menu/${product.id}`} asChild>
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
