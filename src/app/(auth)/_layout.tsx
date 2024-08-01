import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/AuthProvider'

export default function LoginTabLayout() {

  const {session} = useAuth()

  if(session) {
    return <Redirect href={'/'}/>
  }

  return (
    <Stack/>
  )
}