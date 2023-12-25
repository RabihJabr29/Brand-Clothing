import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, ItemToBeRemoved, removeAll) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === ItemToBeRemoved.id
  );
  if (removeAll || existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== ItemToBeRemoved.id);
  }

  return cartItems.map((item) =>
    item.id === ItemToBeRemoved.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
  removeItemFromCart: () => {},
  handleDecreaseQuantityByOne: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setItemsCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (ItemToBeRemoved, removeAll) => {
    setCartItems(removeCartItem(cartItems, ItemToBeRemoved, removeAll));
  };

  const handleDecreaseQuantityByOne = (item) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    itemsCount,
    removeItemFromCart,
    handleDecreaseQuantityByOne,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
