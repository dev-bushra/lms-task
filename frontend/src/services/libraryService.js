// src/services/libraryService.js
import api from '@/axios';

// ===== Users =====
export const createUser = (user) => {
  return api.post('/users', user); // { user_id, name, email }
};

// ===== Books =====
export const createBook = (book) => {
  return api.post('/books', book); // { book_id, title, author }
};

export const getAllBooks = async () => {
  // Assuming you'll add a GET /books route — currently missing in backend
  return api.get('/books');
};

// ===== Loans =====
export const borrowBook = (user_id, book_id) => {
  return api.post('/loans/borrow', { user_id, book_id });
};

export const returnBook = (user_id, book_id) => {
  return api.post('/loans/return', { user_id, book_id });
};

export const getUserLoans = (userId) => {
  return api.get(`/loans/user/${userId}`);
};

export const getUserLoanHistory = (userId) => {
  return api.get(`/loans/history/${userId}`);
};

// ===== Analytics =====
export const getTopBorrowedBooks = () => {
  return api.get('/analytics/top-books');
};
