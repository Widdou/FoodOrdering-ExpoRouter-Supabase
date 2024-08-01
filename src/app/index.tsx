import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {

  const {session, loading} = useAuth()

  if(loading) {
    return <View>
      <Text>Cagaste Puto, hay que cargar el AuthProvider, espera a que se monte</Text>
    </View>//<ActivityIndicator />
  }
  
  if(!session) {
    return <Redirect href={'/sign-in'}/>
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10, }}>

      <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Login & SignUp" />
      </Link>

      <Link replace href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>

      <Link replace href={'/(user)'} asChild>
        <Button text="User" />
      </Link>

      
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      
    </View>
  );
};

export default index;