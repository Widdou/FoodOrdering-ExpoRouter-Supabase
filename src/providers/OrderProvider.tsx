import { CartItem, Order, OrderItem } from "@/types"
import orders from "assets/data/orders"

import * as DB from "assets/data/orders"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { randomUUID } from "expo-crypto"

const OrdersDB = orders

type Orders = {
  orders: Order[]
  addOrder: () => void // (order : Order) => void
  // createOrder: (items : CartItem[]) => Order
  createOrder: (id: number) => void
  addOrderItem: (item : CartItem) => void
}

export const OrderContext = createContext<Orders>({
  orders,
  addOrder: () => {},
  createOrder: () => ({id: 0, created_at: '', total: 0, status: 'New', order_items: [], user_id: ''}),
  addOrderItem : () => {}
})

export const OrderProvider = ({children} : PropsWithChildren) => {
  const [orders, setOrders] = useState<Order[]>(OrdersDB)

  const createOrder = (id : number) => {
    console.warn('Creating Order...')
    return ({
      id,//randomUUID(), 
      created_at: '', 
      total: 0, 
      status: 'New', 
      // order_items: orderItems, 
      user_id: ''
    }) 
  }

  // const createOrder = (items : CartItem[]) : Order => {

  //   // const orderItems : OrderItem[] = items.map((item, i) => ({
  //   //   id: i,
  //   //   product_id: item.product_id,
  //   //   products: Product,
  //   //   order_id: number,
  //   //   size: PizzaSize,
  //   //   quantity: number,
  //   // }))

  //   return ({
  //     id: //randomUUID(), 
  //     created_at: '', 
  //     total: 0, 
  //     status: 'New', 
  //     // order_items: orderItems, 
  //     user_id: ''
  //   }) 
  // }

  const addOrderItem = () => {
    console.warn('Adding Order Item')
  }

  const addOrder = () => {  // (order : Order) => {
    // Order Added
    console.warn('Adding order...')

    setOrders([
      ...orders,
    ])
  }

  return <OrderContext.Provider value={{orders, addOrder, createOrder, addOrderItem}}>
    {children}
  </OrderContext.Provider>
}

export const useOrders = () => useContext(OrderContext)