<template>
  <DashboardLayout>

    <v-card elevation="0" rounded="md" class="pa-5">
      <div class="d-flex justify-space-between align-center mb-6">
        <h1 class="text-h5 font-weight-bold">📋 Your Tasks</h1>
        <v-btn color="primary" rounded="md" class="elevation-0" @click="openModal">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <v-data-table :headers="headers" :items="tasks" class="elevation-0" density="comfortable">
        <template #item.actions="{ item }">
          <v-btn icon size="small" color="success" class="ma-1" @click="markTaskAsCompleted(item.id)"
            v-if="item.status !== 'completed'">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn icon size="small" color="error" class="ma-1" @click="deleteTask(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Task</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="newTask.title" label="Title" required></v-text-field>
          <v-text-field v-model="newTask.status" label="Status" required></v-text-field>
          <v-text-field v-model="newTask.dueDate" label="Due Date" type="date" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn text @click="closeModal">Cancel</v-btn>
          <v-btn color="primary" @click="submitTask">Add Task</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AddTaskModal from '@/components/AddTaskModal.vue'

const showModal = ref(false)

const newTask = ref({
  title: '',
  status: '',
  dueDate: '',
})

const tasks = ref([])
const headers = [
  { text: '#', value: 'id' },
  { text: 'Title', value: 'title' },
  { text: 'Status', value: 'status' },
  { text: 'Due Date', value: 'dueDate' },
  { text: 'Actions', value: 'actions', sortable: false },
]

const markTaskAsCompleted = async (taskId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:5000/api/tasks/${taskId}/complete`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const task = tasks.value.find(task => task.id === taskId)
    if (task) {
      task.status = 'completed'
    }
  } catch (error) {
    console.error('Failed to mark task as completed', error)
  }
}

const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/api/tasks', {
      params: {
        userId: 1,
        status: 'pending',
        page: 1,
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    tasks.value = response.data
  } catch (error) {
    console.error('Failed to fetch tasks', error)
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
  newTask.value = {
    title: '',
    status: '',
    dueDate: '',
  }
}

const submitTask = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log('token:', token)
    const response = await axios.post('http://localhost:5000/api/tasks', {
      userId: 1,
      title: newTask.value.title,
      description: 'description',
      due_date: newTask.value.dueDate,
      priority: 'high',
      status: newTask.value.status,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    tasks.value.push(response.data)
    closeModal()
  } catch (error) {
    console.error('Failed to add task', error)
  }
}

const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    tasks.value = tasks.value.filter(task => task.id !== taskId)
  } catch (error) {
    console.error('Failed to delete task', error)
  }
}

onMounted(fetchTasks)
</script>

<style scoped></style>