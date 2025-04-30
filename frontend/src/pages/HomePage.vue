<template>
    <MainLayout>


        <v-card elevation="0" rounded="md" class="pa-5" style="background-color: cadetblue;">
            <div class="d-flex justify-space-between align-center mb-6">
                <h1 class="text-h5 font-weight-bold">📋 5 Most Borrowed Books</h1>
            </div>
            <div class="d-flex">
                <!-- cards -->
                <div class="cards">
                    <article v-for="(item, index) in books" :key="item.id" class="card">
                        <div class="card__info-hover">
                            <!-- Like Icon -->
                            <svg class="card__like" viewBox="0 0 24 24">
                                <path fill="#000000"
                                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                            </svg>
                            <!-- Clock Icon -->
                            <div class="card__clock-info">
                                <svg class="card__clock" viewBox="0 0 24 24">
                                    <path
                                        d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                                </svg>
                                <span class="card__time">8 Days</span>
                            </div>
                        </div>

                        <!-- Book Image -->
                        <div class="card__img" :style="{ backgroundImage: 'url(' + item.coverImage + ')' }"></div>

                        <!-- Book Title and Author -->
                        <div class="card__info">
                            <span class="card__category">Book Category</span>
                            <h3 class="card__title">{{ item.title }}</h3>
                            <span class="card__by">
                                by <a href="#" class="card__author">{{ item.author }}</a>
                            </span>
                        </div>

                        <!-- Borrow/Return Button -->
                        <div class="card__actions">
                            <v-btn v-if="!item.isBorrowed" color="green" text @click="borrowBook(item)">Borrow</v-btn>

                            <v-btn v-else color="red" text @click="returnBook(item)">Return</v-btn>
                        </div>
                    </article>
                </div>
            </div>
        </v-card>
        <v-divider class="w-full my-10"></v-divider>
        <div class="w-full my-1" style="background-color: #cfbda9;">
            <v-img src="https://i.pinimg.com/736x/fb/10/c1/fb10c194e42cb8e4767e4f447759ef43.jpg" max-height="300"></v-img>

        </div>
        <v-divider class="w-full my-10"></v-divider>

        <v-card elevation="0" rounded="md" class="pa-5">
            <div class="d-flex justify-space-between align-center mb-6">
                <h1 class="text-h5 font-weight-bold">📋 All Books</h1>
            </div>
            <div class="d-flex ">
                <!-- cards -->
                <div class="cards">
                    <article v-for="(item, index) in books" :key="item.id" class="card">
                        <div class="card__info-hover">
                            <!-- Like Icon -->
                            <svg class="card__like" viewBox="0 0 24 24">
                                <path fill="#000000"
                                    d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                            </svg>
                            <!-- Clock Icon -->
                            <div class="card__clock-info">
                                <svg class="card__clock" viewBox="0 0 24 24">
                                    <path
                                        d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                                </svg>
                                <span class="card__time">8 Days</span>
                            </div>
                        </div>

                        <!-- Book Image -->
                        <div class="card__img" :style="{ backgroundImage: 'url(' + item.coverImage + ')' }"></div>

                        <!-- Book Title and Author -->
                        <div class="card__info">
                            <span class="card__category">Book Category</span>
                            <h3 class="card__title">{{ item.title }}</h3>
                            <span class="card__by">
                                by <a href="#" class="card__author">{{ item.author }}</a>
                            </span>
                        </div>

                        <!-- Borrow/Return Button -->
                        <div class="card__actions">
                            <v-btn v-if="!item.isBorrowed" color="green" text @click="borrowBook(item)">Borrow</v-btn>

                            <v-btn v-else color="red" text @click="returnBook(item)">Return</v-btn>
                        </div>
                    </article>
                </div>
            </div>
        </v-card>

    </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

// Dummy data for books
const books = ref([
    {
        id: 1,
        title: 'Crisp Spanish tortilla Matzo brei',
        author: 'Celeste Mills',
        description: 'A delicious Spanish dish with a modern twist.',
        coverImage: 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
        isBorrowed: false
    },
    {
        id: 2,
        title: 'Discover the sea',
        author: 'John Doe',
        description: 'A journey to the world’s most beautiful seas.',
        coverImage: 'https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        isBorrowed: false
    },
    {
        id: 3,
        title: 'The Magic of the Mountains',
        author: 'Jane Doe',
        description: 'An adventure through the peaks and valleys of the world.',
        coverImage: 'https://images.pexels.com/photos/343073/pexels-photo-343073.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        isBorrowed: false
    },
    {
        id: 4,
        title: 'Exploring the Unknown',
        author: 'Mark Smith',
        description: 'A thrilling adventure into the heart of uncharted territories.',
        coverImage: 'https://images.pexels.com/photos/1867417/pexels-photo-1867417.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        isBorrowed: false
    },

])

// Borrow a book
const borrowBook = (book) => {
    book.isBorrowed = true
    alert(`You borrowed "${book.title}"`)
}

// Return a book
const returnBook = (book) => {
    book.isBorrowed = false
    alert(`You returned "${book.title}"`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700');
@import url('https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

* {
    box-sizing: border-box;
}

body,
html {
    font-family: 'Roboto Slab', serif;
    margin: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #D2DBDD;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cards {
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    min-width: 350px;
    /* margin-right: 25px; */
    transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
    background-color: #fff;
    /* width: 100%; */
    /* position: relative; */
    border-radius: 12px;
    overflow: hidden;
    padding-bottom: 1rem;
    box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}

.card:hover {
    box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.10, 1.10);
}

.card__img {
    visibility: hidden;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.card__info-hover {
    position: absolute;
    padding: 16px;
    width: 100%;
    opacity: 0;
    top: 0;
}

.card__info {
    z-index: 2;
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 16px 24px 24px 24px;
}

.card__category {
    font-family: 'Raleway', sans-serif;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    font-weight: 500;
    color: #868686;
}

.card__title {
    margin-top: 5px;
    margin-bottom: 10px;
    font-family: 'Roboto Slab', serif;
}

.card__by {
    font-size: 12px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.card__author {
    font-weight: 600;
    text-decoration: none;
    color: #AD7D52;
}

.card__time {
    font-size: 12px;
    color: #AD7D52;
    vertical-align: middle;
    margin-left: 5px;
}

.card__like {
    width: 18px;
}

.card__clock {
    width: 15px;
    vertical-align: middle;
    fill: #AD7D52;
}

.card__clock-info {
    float: right;
}

.card__img--hover {
    transition: 0.2s all ease-out;
    background-size: cover;
    background-position: center;
    width: 100%;
    position: absolute;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    top: 0;
}

.card:hover .card__img--hover {
    height: 100%;
    opacity: 0.3;
}

.card:hover .card__info {
    background-color: transparent;
    position: relative;
}

.card:hover .card__info-hover {
    opacity: 1;
}

.card__actions {
    margin-top: 10px;
    text-align: center;
}
</style>