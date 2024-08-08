
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';

export const useInsertOrderSubscription = () => {
  // Subscribe to ORDERS table change events in Real-Time
  
/**
 * This custom hook subscribes to real-time changes (insertions) in the orders table in your Supabase database. 
 * When a new order is inserted, it logs the change and invalidates the related React Query cache, triggering a refetch to update the data. 
 * The subscription is cleaned up when the component unmounts to prevent memory leaks.
 */

  const queryClient = useQueryClient()

  useEffect(() => {
    const ordersSubscription = supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Change received!', payload)
          queryClient.invalidateQueries({queryKey: ['orders']})   // This will force the queries with key 'orders' to re-run
        }
      )
      .subscribe()

    // Clean function to unsubscribe from the real-time channel
    //// To prevent memory leaks and stop receiving updates for a components that's not longer in the DOM
    return () => {
      ordersSubscription.unsubscribe()
    }

  }, [])

}



export const useUpdateOrderSubscription = (orderId : number) => {

  // We pass an argument to not be listening to all orders, only an specific one
  const queryClient = useQueryClient()

  useEffect(() => {
      
    const channels = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}`},  // Here the filter criteria is to listen that order
        (payload) => {
          console.log('Change received!', payload)
          queryClient.invalidateQueries({queryKey: ['orders']})             // This will force that specific query to re-run
          queryClient.invalidateQueries({queryKey: ['orders', orderId]})    // This will force that specific query to re-run
        }
      )
      .subscribe()
  })
}


