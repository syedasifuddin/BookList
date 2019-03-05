class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }
  showAlert(message, className) {
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
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks);

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

    // Add to Ls
    Store.addBook(book);

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

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show Alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});
