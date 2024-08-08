
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';


export const useInsertOrderSubscriptions = () => {
  // Subscribe to ORDERS table change events in Real-Time

  const queryClient = useQueryClient()

  useEffect(() => {
    const ordersSubscription = supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        console.log('Change received!', payload)
        queryClient.invalidateQueries({queryKey: ['orders']})   // This will force the queries with key 'orders' to re-run
      }
    )
    .subscribe()

    return () => {
      ordersSubscription.unsubscribe()
    }

  }, [])

}