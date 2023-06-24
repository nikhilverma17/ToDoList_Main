const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _=require("lodash");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://iamvermanikhil:burger20@cluster0.q2silce.mongodb.net/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Connected to MongoDB");
    // Start the server after successful connection
    app.listen(3000, function () {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const itemsSchema = {
  itemName: String,
};

const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  itemName: "Welcome to your todolist!",
});
const item2 = new Item({
  itemName: "Hit the + button to add a new item",
});
const item3 = new Item({
  itemName: "Click Checkbox to delete an item",
});
const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);

app.get("/", async function (req, res) {
  try {
    const foundItems = await Item.find();
    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Successfully inserted default items");
    }
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  } catch (err) {
    console.error("Error reading Items:", err);
  }
});

app.post("/", async function (req, res) {
  const item = req.body.newItem;
  const listName = req.body.list;

  try {
    const newItem = new Item({ itemName: item });
    if (listName === "Today") {
      await newItem.save();
      res.redirect("/");
    } else {
      const foundList = await List.findOne({ name: listName }).exec();
      foundList.items.push(newItem);
      await foundList.save();
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error("Error saving item:", err);
    res.redirect("/");
  }
});

app.post("/delete", async function (req, res) {
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;

  try {
    if (listName === "Today") {
      await Item.findByIdAndRemove(checkedItemID);
      console.log("Deleted:", checkedItemID);
      res.redirect("/");
    } else {
      await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: checkedItemID } } }
      );
      res.redirect("/" + listName);
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Error deleting item");
  }
});


app.get("/:customListName", async function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  try {
    const foundList = await List.findOne({ name: customListName }).exec();

    if (!foundList) {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      await list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
    }
  } catch (err) {
    console.error(err);
  }
});


app.post("/reset", async function (req, res) {
  try {
    await Item.deleteMany({});
    console.log("Items reset");
    res.redirect("/");
  } catch (err) {
    console.error("Error resetting items:", err);
    res.redirect("/");
  }
});




