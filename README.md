# Run the app on your local machine

## Start Up React App
Navigate to the /client directory:
 ### `cd to /client`

Install dependencies:
 ### `npm install`

Start the React app:
 ### `npm start`

## Start Up Node Environment
Navigate to the /server directory:
 ### `cd to /server`

Install dependencies:
 ### `npm install`

Start the Node.js server:
 ### `npm start`



# Run the App Using Docker

## React-app
Navigate to the /client directory:
 ### `cd to /client`

Install dependencies:
 ### `npm install`


## Node environment
Navigate to the /server directory:
 ### `cd to /server`

Install dependencies:
 ### `npm install`


## Run Docker Compose
Navigate to the root directory:
 ## `cd to /`

Build and start the Docker containers:
 ## `docker-compose up -d`



# Run Unit Test for Server Side
Navigate to the /server directory:
 ### `cd to /server`

Run Jest:
 ### `npm jest`


The basic functionalities of the app are:
      
      Fetching Products:
    - App.jsx initiates a GET request to Server.js, querying the products table from the PostgreSQL database.
    - The retrieved products are stored in the state variable (products) and passed to the Products component for rendering.

      Handling Product Selection:
    - The Products component's handleAdd function forwards the selected item object to App.jsx, triggering the toAdd function.
    - toAdd function set (add on) the selected item to the state variable (order) and pass it to the Order component.

      Managing Order State:
    - The Order component is responsible for rendering and manipulating the quantity (qty) property of each item in the order.
    - Functions like handleAdd, handleMinus, and handleRemove pass the selected item object to App.jsx, triggering the respective 
      functions to update the state variable. The modified state is then passed back to the Order component.

      Order Submission:
    - The handleSubmit function is triggered in the Order component, prompting the toSubmit function in App.jsx.
    - App.jsx sends a POST request to the server with the order object.
    - The server generates an order_id based on the last order_id in the database and associates it with each order object.
    - Each order object is then inserted into the orders table, and a success message is logged to the console.

      Responsive Design:

    - The handleToggle function triggers the toggleInactive function in App.jsx, controlling the rendering visibility of the 
      Products and Orders components for screen-widths below 800px.