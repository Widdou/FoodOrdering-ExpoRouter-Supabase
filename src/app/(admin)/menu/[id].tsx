import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'

import { FontAwesome } from '@expo/vector-icons'
import { useProduct } from '@/api/products'
import { defaultPizzaImage } from '@/constants/Images'
import RemoteImage from '@/components/RemoteImage'

export default function ProductsDetailsScreen() {

  const {id : idString} = useLocalSearchParams()

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const {data: product, isLoading, error} = useProduct(id)

  if(isLoading) {
    return <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
        <Text>Loading Product Details...</Text>
      </View>
  }

  if(error || !product) {
    return <Text>Faled to fetch product information</Text>
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
      
      {/* <Image source={{uri: product?.image || defaultPizzaImage}} style={styles.image}/> */}

      <RemoteImage
          fallback={defaultPizzaImage}
          path={product.image}
          style={styles.image}
          resizeMode="contain"
        />

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