## To-Do List Web Application
This is a To-Do List web application built using Express.js, MongoDB, and EJS templating engine. The application allows users to create multiple to-do lists, add and delete items from the lists, and reset the lists to their default state.

You can access the website by clicking [here](https://todolistversion2.onrender.com/).

### Features

- **Create Multiple Lists:** Users can create multiple to-do lists by specifying a custom list name in the URL.
- **Add Items:** Users can add new items to their to-do lists by typing them into an input field and clicking the "+" button.
- **Delete Items:** Users can delete items from their lists by clicking on a checkbox associated with each item.
- **Reset Items:** Users can reset the to-do lists to their default state by clicking the "Reset" button.
- **Persistent Data:** The application uses MongoDB to store the to-do lists and items, ensuring that the data is persisted even if the server is restarted.

### Installation

1. Clone the repository.
2. Install the required dependencies by running `npm install`.
3. Set up a MongoDB database and obtain the connection URL.
4. Replace the `mongodb+srv://` connection URL in the code with your own MongoDB connection URL.
5. Run the application using `node app.js` or `npm start`.
6. Open your web browser and visit `http://localhost:3000` to access the application.

### Usage

- **Homepage:** The homepage displays the default to-do list, titled "Today," along with the pre-populated items. Users can add and delete items on this list.
- **Custom Lists:** Users can create custom to-do lists by specifying a custom list name in the URL (e.g., `http://localhost:3000/Work`). Custom lists have the same functionality as the homepage list.
- **Adding Items:** To add a new item, type the item text in the input field and press enter or click the "+" button. The item will be added to the current list.
- **Deleting Items:** To delete an item, click on the checkbox next to the item. The item will be removed from the list.
- **Resetting Items:** To reset the items in a list to their default state, click the "Reset" button. This will remove all user-added items and restore the default items.

### Technologies Used

- **Express.js:** A web application framework for Node.js that provides a robust set of features for web and API development.
- **MongoDB:** A NoSQL document-oriented database used for storing the to-do lists and items.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a higher-level abstraction for interacting with MongoDB.
- **EJS:** A simple and flexible templating engine for rendering dynamic content in HTML files.
- **Body Parser:** A middleware for parsing incoming request bodies.

### License

This project is free to use 

### Acknowledgements

The code in this repository is based on a tutorial by The App Brewery.
