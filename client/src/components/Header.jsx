import React from "react";

// Function to show total bill of order in header
export default function Header(props) {
  return (
    <header>
      <h1>Total: ${props.total.toFixed(2)}</h1>
    </header>
  );
}
