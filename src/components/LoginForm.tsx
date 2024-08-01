import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import { Link, router, Stack } from 'expo-router'


import { supabase } from '@/lib/supabase'


type LoginFormProps = {
  action: 'signin' | 'signup'

}

export default function LoginForm({action} : LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)

  async function signUpWithEmail() {
    setLoading(true)
    const {error} = await supabase.auth.signUp({email, password})

    if(error) setErrors(error.message) //Alert.alert(error.message)
    setLoading(false)
  }

  async function signInWithPassword() {
    setLoading(true)
    const {data, error} = await supabase.auth.signInWithPassword({email, password})

    if(error) setErrors(error.message) // Alert.alert(error.message)

    // if(data) Alert.alert(`Successfully logged in as User: ${data.user?.email}`)
    setLoading(false)
  }

  return (
    <View style={styles.container}>

      <View style={styles.formControl}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} 
          placeholder='example@email.com' 
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
      </View>
      
      <View style={styles.formControl}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} 
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Text style={styles.errorMessage}>{errors}</Text>


      {action == 'signup' ? 
        // Sign up screen
        <>
          <Button text={loading ? 'Creating account...' : 'Create account'} onPress={() => signUpWithEmail()} disabled={loading}/>
          <Link href='/sign-in'><Text>Sign in</Text></Link>
        </>
        : null
      }
      
      {action == 'signin' ? 
        // Login screen
        <>
          <Button text={loading ? 'Singing in...' : 'Sign in'} onPress={() => signInWithPassword()} disabled={loading}/>
          <Link href='/sign-up'><Text>Create an account</Text></Link>
        </>
        : null
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    gap: 5,
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
  },
  errorMessage: {
    marginTop: 10,
    color: 'red'
  }
})