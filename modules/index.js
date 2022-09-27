const displayBooks = document.querySelector('.list-books');

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.books = new Array([]);
  }

  // Storing content into local storage
  //Based on the add or remove method call
  populateFields = () => {
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  };

  // A method to add books
  addBook = (newBook) => {
    this.books.push(newBook);
    this.populateFields();
    this.itemsDisplay();
  };

  // A method to remove books  
  removeBook(book) {
    const result = this.books.filter((b) => b !== book);
    this.books = result;
    this.populateFields();
  };

// Dynamic script to display items on the screen
// Based on actions by the user.
// A table format is been  used
  itemsDisplay = () => {
    displayBooks.innerHTML = '';
    this.books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      elementBook.textContent = `"${book.title}" by ${book.author}`;
      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);
      displayBooks.appendChild(bookDiv);
      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        displayBooks.removeChild(bookDiv);
      });
      return displayBooks;
    });
  };
};

export default Book;