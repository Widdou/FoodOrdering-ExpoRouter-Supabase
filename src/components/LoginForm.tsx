import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { Link, router, Stack } from 'expo-router'

type LoginFormProps = {
  action: 'signin' | 'signup'

}

export default function LoginForm({action} : LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <View style={styles.container}>

      <View style={styles.formControl}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} 
          placeholder='example@email.com' 
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View style={styles.formControl}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} 
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* <Link href={'/(user)'} asChild> */}
        <Button text={action == 'signin' ? 'Sign in' : 'Create account'} onPress={() => router.replace('/(user)')}/>
      {/* </Link> */}
      <Link href='/(auth)/sign-up'><Text>{action == 'signin' ? 'Create an account' : 'Sign in'}</Text></Link>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
    gap: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    // marginVertical: 10,
  },
  label: {
    color: 'gray'
  }
})