import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import LoginForm from '@/components/LoginForm'
import { Stack } from 'expo-router'

export default function SignInScreen() {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{title: 'Sign in'}}/>
      <Text style={{fontSize: 40, textAlign: 'center', margin: 20,}}>Login</Text>
      <LoginForm action='signin'/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    paddingTop: 100,
    padding: 10,
  },
})