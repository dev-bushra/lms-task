<template>
  <v-dialog v-model="showModal" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ task.id ? 'Edit Task' : 'Add New Task' }}</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="task.title" label="Title" required></v-text-field>
        <v-text-field v-model="task.status" label="Status" required></v-text-field>
        <v-text-field v-model="task.dueDate" label="Due Date" type="date" required></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="closeModal" text>Cancel</v-btn>
        <v-btn @click="saveTask" color="primary">{{ task.id ? 'Save Changes' : 'Add Task' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const data = () => ({
  showModal: false, 
})

const props = defineProps({
  modelValue: Boolean,  
})

const emit = defineEmits(['update:modelValue', 'save'])

const localShowModal = ref(props.modelValue)

const task = ref({
  id: null,
  title: '',
  status: '',
  dueDate: '',
})

const closeModal = () => {
  emit('update:modelValue', false)  
}

const saveTask = () => {
  emit('save', task.value) 
}

</script>

<style scoped>
</style>
