import { View, Text, SafeAreaView, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'
import { router } from 'expo-router'

export default function CartScreen() {

  const {items, total} = useCart()

  // Don't open cart if empty
  if(items.length == 0) {
    router.back() 
    return
  }

  return (
    <SafeAreaView style={{backgroundColor: 'ivory', flex: 1}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 32}}>Cart items: {items.length}</Text>

        <FlatList
          data={items}
          renderItem={({item}) => <CartListItem cartItem={item} key={item.id}/>}
          contentContainerStyle={{gap: 10, padding: 10, overflow: 'hidden'}}
          showsVerticalScrollIndicator={false}
        />


      </View>

      <View style={{position: 'absolute', bottom: 0, padding: 20, width: '100%', borderColor: 'orange', borderStyle: 'solid', borderTopWidth: 1}}>
        
        <Text style={{fontSize: 24, fontWeight: 600,}}>Total: $ {Math.ceil(total)}</Text>
        <Button text='Checkout'/>

      </View>


      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
    </SafeAreaView>

    
  )
}