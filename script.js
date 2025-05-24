const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const libraryDisplay = document.getElementById('libraryDisplay');
  libraryDisplay.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <p><strong>${book.title}</strong> by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
      <button class="toggleReadBtn">Toggle Read</button>
      <button class="removeBtn">Remove</button>
    `;

    // Remove
    card.querySelector('.removeBtn').addEventListener('click', () => {
      removeBook(book.id);
    });

    // Toggle Read
    card.querySelector('.toggleReadBtn').addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });

    libraryDisplay.appendChild(card);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Setup form and modal
const dialog = document.getElementById('bookDialog');
document.getElementById('newBookBtn').addEventListener('click', () => dialog.showModal());
document.getElementById('closeDialogBtn').addEventListener('click', () => dialog.close());

document.getElementById('bookForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = parseInt(formData.get('pages'), 10);
  const read = formData.get('read') === 'on';

  addBookToLibrary(title, author, pages, read);
  dialog.close();
  event.target.reset();
});

// Optional: Add some sample books
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
