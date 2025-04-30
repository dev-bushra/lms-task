<template>
  <v-container class="register-page" fluid>
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="4" lg="3">
        <v-card class="pa-6" elevation="10" rounded="xl">
          <v-card-title class="text-h5 font-weight-bold text-center mb-4">
            Create Account 🚀
          </v-card-title>

          <v-card-subtitle class="text-center mb-6 text-grey-darken-1">
            Join us and manage your tasks easily
          </v-card-subtitle>

          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="form.name"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              color="primary"
              density="comfortable"
              required
            />

            <v-text-field
              v-model="form.username"
              label="Username"
              prepend-inner-icon="mdi-account-circle"
              variant="outlined"
              color="primary"
              density="comfortable"
              required
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              color="primary"
              density="comfortable"
              required
            />

            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              variant="outlined"
              color="primary"
              density="comfortable"
              required
            />

            <v-btn
              type="submit"
              color="primary"
              class="mt-4"
              block
              size="large"
              rounded="xl"
            >
              Register
            </v-btn>

            <div class="text-center mt-4">
              <span>Already have an account?</span>
              <RouterLink to="/login" class="text-primary font-weight-bold ml-1">
                Login
              </RouterLink>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
})

const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: form.value.name,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
    })
    
    console.log('Registration successful:', response.data)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error.response.data)
    alert(error.response.data.message || 'Registration failed.')
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

@media (max-width: 600px) {
  .register-page {
    padding: 10px;
  }
}
</style>
