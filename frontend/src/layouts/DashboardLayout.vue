<template>
  <v-app>
    <v-navigation-drawer app color="primary" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 text-start pa-5">📚 <br />Library <br /> Management <br />
            System</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-5"></v-divider>

      <v-list dense nav>
        <v-list-item to="/tasks" router exact class="">
          <v-list-item-title class="pl-5">📋 LMS</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="text-center" @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
