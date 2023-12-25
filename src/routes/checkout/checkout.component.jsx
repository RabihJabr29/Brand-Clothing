import "./checkout.styles.scss";

import CheckoutListItem from "../../components/checkout-list-item/checkout-list-item.component";
import { CartContext } from "../../contexts/cart.context";

import React, { useContext } from "react";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutListItem key={cartItem.id} item={cartItem} />
      ))}
      <span className="total">Total is: {totalPrice}</span>
    </div>
  );
};

export default Checkout;
