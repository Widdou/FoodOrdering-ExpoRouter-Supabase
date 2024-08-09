import { View, Text, StyleSheet, TextInput, Image, 
  Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Platform,
  Alert,
  ActivityIndicator,
} from 'react-native'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import Button from '@/components/Button'

import { router, Stack, useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto'

import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'

import { defaultPizzaImage } from '@/constants/Images'
import Colors from '@/constants/Colors'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/api/products'
import { Product } from '@/types'
import { TablesInsert } from '@/database.types'

export default function CreateProductScreen() {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])

  const isUpdating = !!id

  const {mutate: insertProduct, isPending: isPendingCreate} = useInsertProduct()
  const {mutate: updateProduct, isPending: isPendingUpdate} = useUpdateProduct()
  const {data: updatingProduct} = useProduct(id)
  const {mutate: deleteProduct, } = useDeleteProduct()

  // Update the Update Form with the selected product
  useEffect(() => {
    if(updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const onCreate = async () => {

    if(!validateInput()) {return}

    const imagePath = await uploadImage()

    const newProduct: TablesInsert<'products'> = { name, price: parseFloat(price) }

    if(imagePath) { newProduct.image = imagePath }

    insertProduct(newProduct, {
      onSuccess: () => {
        resetFields()
        router.back()
        console.warn('Going back?')
      }
    })

  }

  const onUpdate = async () => {
 
    if(!validateInput()) {return}

    const imagePath = await uploadImage()

    const updatedProduct: TablesInsert<'products'> = { name, price: parseFloat(price) }

    if(imagePath) { updatedProduct.image = imagePath }

    updateProduct(updatedProduct, {
      onSuccess: () => {
        resetFields()
        router.back()
      }
    })

  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      }
    ])
  }

  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields()
        router.replace('/(admin)')
      }
    })
  }

  const onSubmit = () => {

    if(!validateInput()) return false

    if(isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
    
    // resetFields()
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


  // TO-DO: Move to some lib/utils.ts
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }
  
    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
  
    if (data) {
      return data.path;
    }

    if(error) {return console.error(`Couldn't upload image. ${error.message}`)}
  };





  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.innertContent}>
          <Stack.Screen options={{
            title: isUpdating ? 'Edit Product Details' : 'Create New Product',
            headerBackTitle: 'Back'
          }}/>

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

          <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit} disabled={isPendingCreate || isPendingUpdate}/>
          {isUpdating && <Text style={styles.textBottom} onPress={confirmDelete}>Delete Product</Text>}
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