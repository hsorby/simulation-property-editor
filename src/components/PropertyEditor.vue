<template>
  <div class="grid">
    <div class="col-12 lg:col-7 xl:col-8">
      <SimulationConfiguration v-model="formData" />
    </div>
    <div class="col-12 lg:col-5 xl:col-4">
      <Card class="sticky-top" style="top: 1rem">
        <template #title> Resulting JSON </template>

        <template #subtitle>
          <div class="flex flex-col gap-2">
            <label for="example-loader">Load an Example</label>
            <Select
              id="example-loader"
              v-model="selectedExample"
              :options="exampleOptions"
              optionLabel="name"
              optionValue="path"
              placeholder="Select an example"
              @change="loadSelectedExample"
            />
            <Message v_if="loadError" severity="error" :closable="false">{{
              loadError
            }}</Message>
          </div>
        </template>

        <template #content>
          <pre>{{ prettyJson }}</pre>
        </template>
      </Card>
    </div>
  </div>

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
import Select from 'primevue/select'
import Message from 'primevue/message'

// The application state (formData)
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

// --- Example Loader Logic ---

const selectedExample = ref(null)
const loadError = ref(null)

const exampleOptions = ref([
  { name: 'Example 1: Basic Inputs', path: './example-1.json' },
  { name: 'Example 2: Full Config', path: './example-2.json' },
])

const loadSelectedExample = async () => {
  if (!selectedExample.value) {
    formData.value = {
      input: [],
      output: { data: [], plots: [] },
      parameters: [],
    }
    return
  }

  try {
    loadError.value = null
    const response = await fetch(selectedExample.value)
    if (!response.ok) {
      throw new Error(`Could not load file: ${response.statusText}`)
    }
    const data = await response.json()

    formData.value = data
  } catch (error) {
    console.error('Failed to load example:', error)
    loadError.value = `Failed to load ${selectedExample.value}.`
  }
}

// --- CellML Integration ---

const cellmlVariables = ref([])
const isPickerOpen = ref(false)
const variablePickerCallback = ref(null)

const pickableVariables = computed(() => {
  return cellmlVariables.value.filter((v) => v.id && v.id.trim() !== '')
})

const loadCellmlModel = () => {
  cellmlVariables.value = [
    { id: 'v', name: 'v', component: 'membrane' },
    { id: 'I_Na', name: 'I_Na', component: 'sodium_channel' },
    { id: 'I_K', name: 'I_K', component: 'potassium_channel' },
    { id: 'm_gate', name: 'm', component: 'sodium_channel.m_gate' },
  ]
}

const openVariablePicker = (callback) => {
  variablePickerCallback.value = callback
  isPickerOpen.value = true
}

const onVariableSelected = (variable) => {
  if (variablePickerCallback.value) {
    variablePickerCallback.value(variable)
  }
  isPickerOpen.value = false
  variablePickerCallback.value = null
}

onMounted(() => {
  loadCellmlModel()
})

provide('openVariablePicker', openVariablePicker)
</script>

<style>
/* Helper style to make the JSON preview stick */
.sticky-top {
  position: sticky;
  top: 1rem;
}
</style>
