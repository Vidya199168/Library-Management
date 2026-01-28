const API_URL = "http://localhost:3000/books";

document.addEventListener("DOMContentLoaded", fetchBooks);

function fetchBooks() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => displayBooks(data));
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author })
  })
  .then(() => {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    fetchBooks();
  });
}

function deleteBook(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => fetchBooks());
}
function displayBooks(filteredBooks = null) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  const books = filteredBooks || getBooks();

  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${book.title} - ${book.author}
      <button onclick="editBook(${index})">✏️</button>
      <button class="delete-btn" onclick="deleteBook(${index})">❌</button>
    `;
    bookList.appendChild(li);
  });

  document.getElementById("count").innerText =
    `Total Books: ${books.length}`;
}
function searchBooks() {
  const query = document.getElementById("search").value.toLowerCase();
  const books = getBooks();

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  );

  displayBooks(filtered);
}
function editBook(index) {
  let books = getBooks();

  const newTitle = prompt("Edit Book Title", books[index].title);
  const newAuthor = prompt("Edit Author", books[index].author);

  if (newTitle && newAuthor) {
    books[index] = { title: newTitle, author: newAuthor };
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
  }
}

