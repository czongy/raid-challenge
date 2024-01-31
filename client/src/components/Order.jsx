import React from "react";

export default function Order(props) {
  // Increase qty of selected item by 1
  function handleAdd(item) {
    props.toAdd(item);
  }

  // Decrease qty of selected item by 1
  function handleMinus(item) {
    props.toMinus(item);
  }

  // Remove all qty of selected item
  function handleRemove(item) {
    props.toRemove(item);
  }

  // Submit order
  function handleSubmit() {
    props.toSubmit();
  }

  // Toggle Products & Order component onClick
  function handleToggle() {
    props.toggleInactive();
  }

  return (
    <div className="order-container wrapper">
      <div className="order-body">
        {props.order.map((item) => {
          return (
            <div key={item.id} className="order-item">
              <img src={item.img_url} alt={item.product_name} />
              <div className="detail-flex">
                <h4>{item.product_name}</h4>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="qty-flex">
                <button onClick={() => handleMinus(item)}>-</button>
                <p>{item.qty}</p>
                <button onClick={() => handleAdd(item)}>+</button>
              </div>
              <button onClick={() => handleRemove(item)}>x</button>
            </div>
          );
        })}
      </div>
      <div className="order-footer">
        {props.order.length ? (
          <button onClick={handleSubmit} className="submit-btn">
            Proceed to payment
          </button>
        ) : (
          <button onClick={handleToggle} className="submit-btn add-btn">
            Add Item
          </button>
        )}
        <button className="toggle-btn product-btn" onClick={handleToggle}>
          <img src="https://i.ibb.co/4gJnTrM/bar.png" alt="Order" />
        </button>
      </div>
    </div>
  );
}
