// Custom hook to CRUD the Products table from Supabase

import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useProductList = () => {

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*')

      if(error) {
        throw new Error(error.message)
      }

      return data
    }
  })

}

export const useProduct = (id : number) => {

  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const {data, error} = await supabase.from('products')
        .select('*')
        .eq('id', id)
        .single()

      if(error) {
        throw new Error(error.message)
      }

      return data
    }
  })

}

export const useInsertProduct = () => {

  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data : any) {
      const {data: newProduct, error} = await supabase
        .from('products')
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .single()

      if(error) {
        throw new Error(error.message)
      }

      return newProduct
    },
    async onSuccess() {
      // Invalidate the 'products' query so it re-fetches the data after creating a new item
      await queryClient.invalidateQueries({queryKey: ['products']})
    },
    onError(error) {
      console.log(error)
    }
  })
  
}


export const useUpdateProduct = () => {
  
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data : any) {
      const {data: updatedProduct, error} = await supabase
        .from('products')
        .update({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .eq('id', data.id)
        .select()
        .single()

      if(error) {
        throw new Error(error.message)
      }

      return updatedProduct
    },
    async onSuccess(_, data) {
      // Invalidate the 'products' query so it re-fetches the data after creating a new item
      await queryClient.invalidateQueries({queryKey: ['products']})
      await queryClient.invalidateQueries({queryKey: ['products', data.id]})      
    },
    onError(error) {
      console.log(error)
    }
  })
  
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(id: number) {
      await supabase.from('products').delete().eq('id', id)
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['products']})
    }
  })
}