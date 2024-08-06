import { CartItem, Tables } from "@/types"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { randomUUID } from "expo-crypto"
import { useInsertOrder } from "@/api/orders"
import { router } from "expo-router"

type Product = Tables<'products'>

type CartType = {
  items: CartItem[],
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1|1) => void
  total: number,
  clearCart: () => void,
  checkout: () => void,
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  clearCart: () => {},
  checkout: () => {},
})

const CartProvider = ({children} : PropsWithChildren) => {

  const [items, setItems] = useState<CartItem[]>([])

  const {mutate: insertOrder,} = useInsertOrder()


  const addItem = (product: Product, size: CartItem['size']) => {

    const existingItem = items.find(
      item => item.product == product && item.size == size
    )

    if(existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem : CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }

    setItems([...items, newCartItem])

  }
  
  const updateQuantity = (itemId: string, amount: -1|1) => {
    setItems(
      items.map(item => 
        item.id !== itemId 
          ? item 
          : {...item, quantity: item.quantity + amount}
      ).filter(item => item.quantity > 0)
    )
  }

  const total = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

  const clearCart = () => {setItems([])}

  const checkout = () => {
    insertOrder(
      {total},
      {
        onSuccess: (data) => {
          clearCart()
          router.push(`(user)/orders/${data.id}`)
        }
      }
    )
  }

  return(
    <CartContext.Provider value={{items, addItem, updateQuantity, total, clearCart, checkout}}>
      {children}
    </CartContext.Provider>
  ) 
}

export default CartProvider

export const useCart = () => useContext(CartContext)