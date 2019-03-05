// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  // insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href = "" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// SHow alert
UI.prototype.showAlert = function(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  //
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // time out after 3 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);
  // Instantiate Ui
  const ui = new UI();

  // validate ui
  if (title === "" || author === "" || isbn === "") {
    // Error
    ui.showAlert("Please Fill in all Fields", "error");
  } else {
    // add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added", "success");
    // Clear Fielts
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete

document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  // Show Alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
