import React from "react";

export default function Items(props) {
  // Pass selected item object to App
  function handleAdd(product) {
    props.toAdd(product);
  }

  // Toggle Products & Order component onClick
  function handleToggle() {
    props.toggleInactive();
  }

  return (
    <div className="product-container">
      <div className="product-grid">
        {props.products.map((product) => {
          return (
            <button
              key={product.id}
              onClick={() => handleAdd(product)}
              className="product-item"
            >
              <img src={product.img_url} alt={product.product_name} />
              <div className="product-text">
                <h2>{product.product_name}</h2>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </button>
          );
        })}
      </div>
      <button className="toggle-btn order-btn" onClick={handleToggle}>
        <img src="https://i.ibb.co/zryx4Xq/purchase-order.png" alt="Order" />
      </button>
    </div>
  );
}
