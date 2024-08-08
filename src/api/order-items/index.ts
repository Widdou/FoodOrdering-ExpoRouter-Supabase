import { TablesInsert } from "@/database.types"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useOrderItemsList = (id: number) => {
  // List the items of an order

  return useQuery({
    queryKey: ['order-items', id],
    queryFn: async () => {
      const {data: orderItems, error} = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id)

      if(error) { throw new Error(error.message) }

      return orderItems
    }
  })
}


export const useInsertOrderItems = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (items : TablesInsert<'order_items'>[]) => {
      const {data: orderItems, error} = await supabase
        .from('order_items')
        .insert(items)
        .select()

      if(error) { throw new Error(error.message) }

      console.log(`Order Items for order #${items[0].order_id} created successfully`)

      return orderItems      
    },
    async onSuccess(data) {
      // await queryClient.invalidateQueries(['products'])
      console.log(`Order Items for order #${data[0].order_id} created successfully`)
    },
    onError(error) {
      console.error('Failed to insert Order Items', error)
    }
  })
}

export const useUpdateOrderItems = () => {

}

export const useOrderItemsDetails = (orderId: number) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['orderItemsDetails', orderId],
    queryFn: async () => {
      const {data: orderItemsDetails, error} = await supabase
        .from('order_items')
        .select()
        .eq('order_id', orderId)
      
      if(error) { throw new Error(error.message) }

      return orderItemsDetails
    }
  })
}