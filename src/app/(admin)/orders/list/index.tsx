import { FlatList, View, Text, ActivityIndicator } from 'react-native';

import OrderListItem from '@/components/OrderListItem';

import { useAdminOrderList } from '@/api/orders';

export default function OrdersScreen() {

  const {data: orders, error, isLoading} = useAdminOrderList({archived: false})

  if(isLoading) {
    return <ActivityIndicator/>
  }

  if(error) {
    return <Text>Failed to fetch the orders</Text>
  }

  if(!orders) {
    return <View>
      <Text style={{textAlign: 'center', padding: 50, fontSize: 20, fontWeight: 'medium'}}>No items in the order yet</Text>
    </View>
  }
  
  return (
    <>
      <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}}
        // ListHeaderComponent={() => }
        />
    </>
  );
}
