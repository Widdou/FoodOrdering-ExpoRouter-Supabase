import { View, Text, Button } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'

export default function UserProfile() {

  const {session} = useAuth()

  return (
    <View>
      <Text>Profile</Text>

      <Text>{session?.user.email}</Text>


      <Button
        title='Sign out'
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  )
}