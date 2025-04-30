<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import '@mdi/font/css/materialdesignicons.min.css'

// 
import { ref, onMounted } from 'vue';
import { getTopBorrowedBooks, borrowBook } from '@/services/libraryService';

const topBooks = ref([]);

onMounted(async () => {
  const { data } = await getTopBorrowedBooks();
  topBooks.value = data;
  console.log('topBooks:', data);
  
});

const borrow = async () => {
  await borrowBook('user123', 'book456');
};
</script>


