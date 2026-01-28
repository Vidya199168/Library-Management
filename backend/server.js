const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let books = []; // temporary storage

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ADD a book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author required" });
  }

  const book = { id: Date.now(), title, author };
  books.push(book);
  res.status(201).json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(book => book.id !== id);
  res.json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
