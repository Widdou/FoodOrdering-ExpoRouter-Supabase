import { View, Text, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function CartScreen() {
  return (
    <SafeAreaView style={{backgroundColor: 'ivory', flex: 1}}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 40}}>Cart</Text>

        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
      </View>
    </SafeAreaView>

    
  )
}