import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import products from 'assets/data/products';
import ProductListItem from '@/components/ProductListItem';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function MenuScreen() {


  const {data, error, isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*')

      if(error) {
        throw new Error(error.message)
      }

      return data
    }
  })

  if(isLoading) {
    return <ActivityIndicator/>
  }

  if(error) {
    return <Text>Faled to fetch products</Text>
  }

  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{title: 'Menu'}}/>

      <FlatList
        data={data}
        renderItem={({item}) => <ProductListItem product={item}/>}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10,}}
        columnWrapperStyle={{gap: 10}}
      />
    </View>
  );
}
