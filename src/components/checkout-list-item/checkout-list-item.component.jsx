import { CartContext } from "../../contexts/cart.context";
import "./checkout-list-item.styles.scss";
import React, { useContext } from "react";

const CheckoutListItem = ({ item }) => {
  const { name, imageUrl, quantity, price } = item;

  const { removeItemFromCart, addItemToCart } = useContext(CartContext);

  const handleDecreaseQuantity = () => {
    removeItemFromCart(item, false);
  };

  const handleIncreaseQuantity = () => {
    addItemToCart(item);
  };

  const handleRemoveItem = () => {
    removeItemFromCart(item, true);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecreaseQuantity}>
          &#10094;
        </div>
        <span className="value"> {quantity}</span>
        <div className="arrow" onClick={handleIncreaseQuantity}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleRemoveItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutListItem;
