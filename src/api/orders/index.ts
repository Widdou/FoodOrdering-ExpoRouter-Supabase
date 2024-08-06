import { TablesInsert } from "@/database.types"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { Order } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type useAdminOrderListProps = {
  archived: false
} 

export const useAdminOrderList = ({archived = false}) => {
  // returns ALL the orders

  // Filter based on Active or Archived statuses
  const statuses = archived ? ['Canceled', 'Delivered'] : ['New', 'Cooking', 'Delivering']

  return useQuery({
    queryKey: ['orders', archived],
    queryFn: async () => {
      const {data, error} = await supabase
        .from('orders')
        .select('*')
        .in('status', statuses)

      if(error) { throw new Error(error.message) }

      return data
    }
  })
}

export const useMyOrderList = () => {
  // Return ONLY the current user's orders

  const {session} = useAuth()
  const id = session?.user.id

  
  return useQuery({
    queryKey: ['orders', {userId: id}],
    queryFn: async () => {
      if(!id) return null

      const {data, error} = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', id)

      if(error) {throw new Error(error.message)}

      return data
    }
  })

}

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ['orderDetails', id],
    queryFn: async () => {
      const {data: details, error} = await supabase
        .from('orders')
        .select()
        .eq('id', id)
        .single()

      if(error) {throw new Error(error.message)}

      return details
    }

  })
}

export const useInsertOrder = () => {
  const queryClient = useQueryClient() 
  const {session} = useAuth()
  const userId = session?.user.id

  return useMutation({
    mutationFn: async (data : TablesInsert<'orders'>) => {
      const {error} = await supabase
        .from('orders')
        .insert({...data, user_id: userId})
        .single()

      if(error) {throw new Error(error.message)}
    },
    async onSuccess() {
      // Invalidate the 'products' query so it re-fetches the data after creating a new item
      await queryClient.invalidateQueries({queryKey: ['orders', true]})
      await queryClient.invalidateQueries({queryKey: ['orders', false]})
    },
    onError(error) {
      console.log(error)
    }
  })
}