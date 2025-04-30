<template>
    <DashboardLayout>
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="text-h5 font-weight-bold">Your Books 📚</h1>
        <v-btn color="primary" rounded="xl" @click="openModal">
          <v-icon start>mdi-plus</v-icon>
          New Book
        </v-btn>
      </div>
  
      <!-- Top 5 Most Borrowed Books -->
      <v-card elevation="2" rounded="xl" class="mb-6 pa-4">
        <h2 class="text-h6 font-weight-bold mb-3">Top 5 Most Borrowed Books 📈</h2>
        <v-list density="compact">
          <v-list-item v-for="(book, index) in topBorrowedBooks" :key="index" class="border-b">
            <v-list-item-content>
              <v-list-item-title>{{ book.title }}</v-list-item-title>
              <v-list-item-subtitle>Borrowed {{ book.borrow_count }} times</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
  
      <!-- Books Table -->
      <v-card elevation="4" rounded="xl">
        <v-data-table :headers="headers" :items="books" class="elevation-1" density="comfortable">
          <template #item.actions="{ item }">
            <v-btn icon size="small" color="primary" @click="editBook(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="deleteBook(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
  
      <!-- Add Book Modal -->
      <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add New Book</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="newBook.title" label="Title" required></v-text-field>
            <v-text-field v-model="newBook.author" label="Author" required></v-text-field>
            <v-text-field v-model="newBook.publishedDate" label="Published Date" type="date" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeModal">Cancel</v-btn>
            <v-btn color="primary" @click="submitBook">Add Book</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Edit Book Modal -->
      <v-dialog v-model="showEditModal" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Book</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="editedBook.title" label="Title" required></v-text-field>
            <v-text-field v-model="editedBook.author" label="Author" required></v-text-field>
            <v-text-field v-model="editedBook.publishedDate" label="Published Date" type="date" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="closeEditModal">Cancel</v-btn>
            <v-btn color="primary" @click="submitUpdatedBook">Update Book</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </DashboardLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import DashboardLayout from '@/layouts/DashboardLayout.vue'

  // import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const role = localStorage.getItem('role')
  if (role !== 'admin') {
    router.push('/home') // Redirect non-admin users
  }
})
  
  const showModal = ref(false)
  const showEditModal = ref(false)
  const newBook = ref({ title: '', author: '', publishedDate: '' })
  const editedBook = ref({})
  
  const books = ref([])
  const topBorrowedBooks = ref([])
  const headers = [
    { text: '#', value: 'id' },
    { text: 'Title', value: 'title' },
    { text: 'Author', value: 'author' },
    { text: 'Published Date', value: 'publishedDate' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]
  
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      })
      books.value = response.data
    } catch (error) {
      console.error('Failed to fetch books', error)
    }
  }
  
  const fetchTopBorrowedBooks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/books/top-borrowed', {
        headers: { Authorization: `Bearer ${token}` }
      })
      topBorrowedBooks.value = response.data
    } catch (error) {
      console.error('Failed to fetch top borrowed books', error)
    }
  }
  
  const openModal = () => {
    showModal.value = true
    resetForm()
  }
  
  const closeModal = () => {
    showModal.value = false
  }
  
  const resetForm = () => {
    newBook.value = { title: '', author: '', publishedDate: '' }
  }
  
  const submitBook = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:5000/api/books', {
        title: newBook.value.title,
        author: newBook.value.author,
        publishedDate: newBook.value.publishedDate,
      }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      })
      books.value.push(response.data)
      closeModal()
    } catch (error) {
      console.error('Failed to add book', error)
    }
  }
  
  const editBook = (book) => {
    editedBook.value = { ...book }
    showEditModal.value = true
  }
  
  const closeEditModal = () => {
    showEditModal.value = false
  }
  
  const submitUpdatedBook = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:5000/api/books/${editedBook.value.id}`, editedBook.value, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const index = books.value.findIndex(b => b.id === editedBook.value.id)
      books.value[index] = response.data
      closeEditModal()
    } catch (error) {
      console.error('Failed to update book', error)
    }
  }
  
  const deleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      books.value = books.value.filter(book => book.id !== bookId)
    } catch (error) {
      console.error('Failed to delete book', error)
    }
  }
  
  // onMounted(() => {
  //   fetchBooks()
  //   fetchTopBorrowedBooks()
  // })
  </script>
  
  <style scoped>
  /* Custom styles */
  </style>
  