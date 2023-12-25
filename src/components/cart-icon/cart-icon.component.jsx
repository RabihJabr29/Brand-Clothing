import "./cart-icon.styles.scss";

import React, { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemsCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <span className="item-count">{itemsCount}</span>
    </div>
  );
};

export default CartIcon;
