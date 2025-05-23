import type { CartItem } from "@/types"

export const addToCart = (product: CartItem) => {
  // Get existing cart from localStorage
  const existingCart = localStorage.getItem("cart")
  let cart: CartItem[] = []

  if (existingCart) {
    try {
      cart = JSON.parse(existingCart)
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
    }
  }

  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex((item) => item.id === product.id)

  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += product.quantity
  } else {
    // Add new item
    cart.push(product)
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Dispatch a custom event so other components can react to cart changes
  window.dispatchEvent(new CustomEvent("cart-updated"))

  return cart
}

// Remove item from cart
export const removeFromCart = (productId: string) => {
  const existingCart = localStorage.getItem("cart")
  if (!existingCart) return []

  try {
    const cart = JSON.parse(existingCart)
    const updatedCart = cart.filter((item: CartItem) => item.id !== productId)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    window.dispatchEvent(new CustomEvent("cart-updated"))
    return updatedCart
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error)
    return []
  }
}

// Update item quantity
export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const existingCart = localStorage.getItem("cart")
  if (!existingCart) return []

  try {
    const cart = JSON.parse(existingCart)
    const updatedCart = cart.map((item: CartItem) => (item.id === productId ? { ...item, quantity } : item))
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    window.dispatchEvent(new CustomEvent("cart-updated"))
    return updatedCart
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error)
    return []
  }
}

// Get cart total
export const getCartTotal = () => {
  const existingCart = localStorage.getItem("cart")
  if (!existingCart) return 0

  try {
    const cart = JSON.parse(existingCart)
    return cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0)
  } catch (error) {
    console.error("Failed to parse cart from localStorage:", error)
    return 0
  }
}
