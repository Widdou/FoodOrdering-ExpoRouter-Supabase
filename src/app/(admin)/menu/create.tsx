import { View, Text, StyleSheet, TextInput, Image, 
  Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform,
} from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import Button from '@/components/Button'
import { Stack } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

import { defaultPizzaImage } from './[id]'
import Colors from '@/constants/Colors'

export default function CreateProductScreen() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const [errors, setErrors] = useState('')

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const onCreate = () => {
    if(!validateInput()) {
      return false
    }
    
    console.warn('Creating Product...', name, price)
    // Save in Database

    resetFields()
  }

  const validateInput = () => {
    setErrors('')
    if(!name) {
      setErrors('Name is required')
      return false
    }

    if(!price) {
      setErrors('Price is required')
      return false
    }

    if(isNaN(parseFloat(price))) {
      setErrors('Price is not number')
      return false
    }

    return true
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [16,9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.innertContent}>
        <Stack.Screen options={{title: 'Create New Product'}}/>

        <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
        <Text onPress={pickImageAsync} style={styles.textBottom}>Select Image</Text>

        <Text style={styles.label}>Name: </Text>
        <TextInput 
          placeholder='Name of Product'
          style={styles.input} 
          onChangeText={setName}
          value={name}
        />

        <Text style={styles.label}>Price: ($)</Text>
        <TextInput 
          placeholder='9.99' 
          style={styles.input} 
          keyboardType='numeric'
          onChangeText={setPrice}
          value={price}
        />

        <Text style={{color: 'red'}}>{errors}</Text>

        <Button text='Create' onPress={onCreate}/>
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innertContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    // gap: 10,
  },
  label: {
    color: 'gray'
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 20
  },
  image: {
    width: '90%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 1000,
  },
  textBottom: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  }
})

const DismissKeyboard = ({ children } : PropsWithChildren) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  );