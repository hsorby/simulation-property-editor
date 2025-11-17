<template>
  <SimulationConfiguration v-model="formData"/>
  <Card>
    <template #title> Resulting JSON </template>
    <template #content>
      <pre>{{ prettyJson }}</pre>
    </template>
  </Card>

  <Dialog 
    v-model:visible="isPickerOpen" 
    modal 
    header="Select CellML Variable" 
    class="w-full max-w-lg"
  >
    <CellmlVariablePickerDialog
      :variables="pickableVariables"
      @variable-selected="onVariableSelected"
    />
  </Dialog>
</template>

<script setup>
import { computed, ref, provide, onMounted } from 'vue'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import SimulationConfiguration from './SimulationConfiguration.vue'
import CellmlVariablePickerDialog from './CellmlVariablePickerDialog.vue'

const formData = ref({
  input: [],
  output: {
    data: [],
    plots: [],
  },
  parameters: [],
})

const prettyJson = computed(() => {
  return JSON.stringify(formData.value, null, 2)
})

const cellmlVariables = ref([])
const isPickerOpen = ref(false)
const variablePickerCallback = ref(null)

// Function to load CellML data (using vue-libcellml.js)
const loadCellmlModel = () => {
  // Mock data for this example.
  // In a real app, you'd use your library here.
  cellmlVariables.value = [
    { id: 'v', name: 'v', component: 'membrane' },
    { id: 'I_Na', name: 'I_Na', component: 'sodium_channel' },
    { id: 'I_K', name: 'I_K', component: 'potassium_channel' },
    { id: 'm_gate', name: 'm', component: 'sodium_channel.m_gate' },
  ]
}

const pickableVariables = computed(() => {
  // Only return variables that have a non-empty id
  return cellmlVariables.value.filter(v => v.id && v.id.trim() !== '')
})

// The 'open' function that children will call.
// It accepts a callback to run on selection.
const openVariablePicker = (callback) => {
  variablePickerCallback.value = callback // Store the callback
  isPickerOpen.value = true // Open the dialog
}

// The 'handler' that the dialog calls.
const onVariableSelected = (variable) => {
  if (variablePickerCallback.value) {
    variablePickerCallback.value(variable) // Execute the stored callback
  }
  isPickerOpen.value = false // Close the dialog
  variablePickerCallback.value = null // Clear the callback
}

// Load the model on mount
onMounted(() => {
  loadCellmlModel()
})

// PROVIDE the 'open' function to all children
provide('openVariablePicker', openVariablePicker)

</script>
