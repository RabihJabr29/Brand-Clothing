import { CartContext } from "../../contexts/cart.context";
import "./checkout-list-item.styles.scss";
import React, { useContext } from "react";

const CheckoutListItem = ({ item }) => {
  const { name, imageUrl, quantity, price } = item;

  const {
    removeItemFromCart,
    handleIncreaseQuantityByOne,
    handleDecreaseQuantityByOne,
  } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    handleDecreaseQuantityByOne(item);
  };

  const handleIncreaseQuantity = () => {
    handleIncreaseQuantityByOne(item);
  };

  const handleRemoveItem = () => {
    removeItemFromCart(item);
  };

  return (
    <div className="list-item-container">
      <img src={imageUrl} alt={name} />
      <span>{name}</span>
      <span>
        <button type="button" onClick={handleDecreaseQuantity}>
          &lt;
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={handleIncreaseQuantity}>
          &gt;
        </button>
      </span>
      <span>{price}</span>
      <button type="button" onClick={handleRemoveItem}>
        X
      </button>
    </div>
  );
};

export default CheckoutListItem;
