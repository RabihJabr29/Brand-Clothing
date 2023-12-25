import CheckoutListItem from "../../components/checkout-list-item/checkout-list-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

import React, { useContext } from "react";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="checkout-list-container">
      {cartItems.map((item) => (
        <CheckoutListItem key={item.id} item={item} />
      ))}
      <h3>Total is {totalPrice}</h3>
    </div>
  );
};

export default Checkout;
