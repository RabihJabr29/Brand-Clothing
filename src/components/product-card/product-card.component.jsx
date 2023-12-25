import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import React, { useContext } from "react";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addItemToCart } = useContext(CartContext);

  const handleAddItem = () => {
    addItemToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddItem}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
