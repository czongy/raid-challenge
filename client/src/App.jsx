import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Order from "./components/Order";

export default function App() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 800px)").matches
  );

  // useEffect hook to add a listener for changes in screen width
  useEffect(() => {
    window
      .matchMedia("(min-width: 800px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  // useEffect hook to fetch product data from the server on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        // Check for error
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        // If no error, parse JSON response and return
        return response.json();
      })
      .then((json) => {
        // For each product, convert price to Float and add qty property
        json.products.forEach((product) => {
          product.price = parseFloat(product.price);
          product.qty = 1;
        });
        // Set products state variable
        setProducts(json.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to add item to existing order
  function toAdd(addItem) {
    const existingIndex = order.findIndex((item) => item.id === addItem.id);
    // If addItem is a duplicate, update qty
    if (existingIndex !== -1) {
      setOrder((prevOrder) => {
        const updateOrder = [...prevOrder];
        const currentQty = updateOrder[existingIndex].qty;
        updateOrder[existingIndex] = {
          ...updateOrder[existingIndex],
          qty: currentQty + 1,
        };
        return updateOrder;
      });
    } else {
      // If addItem not a duplicate, add to order
      setOrder((prevOrder) => {
        return [...prevOrder, addItem];
      });
    }
    // Update total bill
    setTotal((prevTotal) => {
      prevTotal += addItem.price;
      return Math.abs(prevTotal);
    });
  }

  // Function to remove one qty of item from order
  function toMinus(minusItem) {
    const existingIndex = order.findIndex((item) => item.id === minusItem.id);
    // Subtract price of minusItem from total bill
    setTotal((prevTotal) => {
      prevTotal -= minusItem.price;
      return Math.abs(prevTotal);
    });

    setOrder((prevOrder) => {
      const updateOrder = [...prevOrder];
      // Remove item from order if qty = 1
      if (updateOrder[existingIndex].qty === 1) {
        updateOrder.splice(existingIndex, 1);
        return updateOrder;
      } else {
        // Subtract qty by 1 if qty > 1
        const currentQty = updateOrder[existingIndex].qty;
        updateOrder[existingIndex] = {
          ...updateOrder[existingIndex],
          qty: currentQty - 1,
        };
        return updateOrder;
      }
    });
  }

  // Function to remove all qty of item
  function toRemove(removeItem) {
    const existingIndex = order.findIndex((item) => item.id === removeItem.id);
    // Subtract (price of removeItem * qty of removeItem) from total bill
    setTotal((prevTotal) => {
      prevTotal -= removeItem.price * removeItem.qty;
      return Math.abs(prevTotal);
    });

    // Remove item from order
    setOrder((prevOrder) => {
      const updateOrder = [...prevOrder];
      updateOrder[existingIndex] = {
        ...updateOrder[existingIndex],
        qty: 1,
      };
      updateOrder.splice(existingIndex, 1);
      return updateOrder;
    });
  }

  // Function to send POST request to server
  function toSubmit() {
    fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: order }),
    })
      .then((response) => {
        // Check for error
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        } else {
          // If no error, reset state of order and total to original state
          setOrder([]);
          setTotal(0);
        }
        return response.json();
      })
      // Response message from server when order added to database
      .then((json) => console.log(json.message))
      .catch((err) => console.log("Fetch error", err));
  }

  // Function to toggle rendering of Products and Order component (for screen width < 800px)
  function toggleInactive() {
    setIsActive(!isActive);
  }

  return (
    <div>
      <Header total={total} />

      {matches ? (
        <div className="components-container">
          <Products products={products} toAdd={toAdd} />
          <Order
            order={order}
            toAdd={toAdd}
            toMinus={toMinus}
            toRemove={toRemove}
            toSubmit={toSubmit}
          />
        </div>
      ) : null}

      {!matches &&
        (isActive ? (
          <Products
            products={products}
            toAdd={toAdd}
            toggleInactive={toggleInactive}
          />
        ) : (
          <Order
            order={order}
            toAdd={toAdd}
            toMinus={toMinus}
            toRemove={toRemove}
            toSubmit={toSubmit}
            toggleInactive={toggleInactive}
          />
        ))}
    </div>
  );
}
