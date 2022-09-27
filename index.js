import { DateTime } from './modules/luxon.js';
import Book from './modules/index.js';

const form = document.querySelector('.form-input');
const allBooks = document.querySelector('.all-books');
const addBook = document.querySelector('.add-book');
const contact = document.querySelector('.contact');
const divTime = document.querySelector('.date-time');
const [title, author] = form.elements;
const [navList, navAdd, navContact] = document.querySelectorAll('.list-item');

// TIMER DISPLAY, BASED ON LUXON LIBRARAY IN REAL TIME.
setInterval(() => {
  const dt = DateTime.now();
  divTime.textContent = dt.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}, 1000);

// Array initiation from book class to store entries from user.
const inputBook = {};
const objBook = new Book();

if (localStorage.savedBooks) {
  objBook.books = JSON.parse(localStorage.getItem('savedBooks'));
}

// Events based on actions of the user on display page
// The three pages will display indipendently, 
// based on user actions.
navList.addEventListener('click', () => {
  allBooks.classList.remove('hidden');
  addBook.classList.add('hidden');
  contact.classList.add('hidden');
});

navAdd.addEventListener('click', () => {
  addBook.classList.remove('hidden');
  allBooks.classList.add('hidden');
  contact.classList.add('hidden');
});

navContact.addEventListener('click', () => {
  contact.classList.remove('hidden');
  allBooks.classList.add('hidden');
  addBook.classList.add('hidden');
});

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(objBook.books));
};

// Form action based on user actions
form.addEventListener('submit', (e) => {
  e.preventDefault();
  objBook.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

objBook.itemsDisplay();
populateFields();