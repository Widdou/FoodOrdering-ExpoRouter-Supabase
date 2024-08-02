import { ActivityIndicator, FlatList, View, Text, } from 'react-native';
import ProductListItem from '@/components/ProductListItem';
import { useProductList } from '@/api/products';

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList()

  if(isLoading) {
    return <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
        <Text>Loading Products...</Text>
      </View>
  }

  if(error) {
    return <Text>Faled to fetch products</Text>
  }

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductListItem product={item}/>}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
}
