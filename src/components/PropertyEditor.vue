<template>
  <div class="pf-grid">
    <div class="pf-col-12 lg:pf-col-7 xl:pf-col-8">
      <SimulationConfiguration v-model="formData" v-model:expandedPanels="activePanels"/>
    </div>
    <div class="pf-col-12 lg:pf-col-5 xl:pf-col-4">
      <Card class="sticky-top" style="top: 1rem">
        <template #title> Resulting JSON </template>

        <template #subtitle>
          <div class="flex flex-pf-col gap-2">
            <label for="example-loader">Load an Example</label>
            <Select
              id="example-loader"
              v-model="selectedExample"
              :options="exampleOptions"
              optionLabel="name"
              placeholder="Select an example"
              @change="loadSelectedExample"
            />
            <Message v_if="loadError" severity="error" :closable="false">{{
              loadErrorExample
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
    class="w-full max-w-lg mx-16"
  >
    <CellMLVariablePickerDialog
      :model-data="cellmlModelData"
      @variable-selected="onVariableSelected"
    />
  </Dialog>
</template>

<script setup>
import { computed, ref, provide } from 'vue'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import SimulationConfiguration from './SimulationConfiguration.vue'
import CellMLVariablePickerDialog from './CellMLVariablePickerDialog.vue'
import Select from 'primevue/select'
import Message from 'primevue/message'

import { extractVariableInfromationFromModel } from '../services/cellml.js'

// The application state (formData)
const formData = ref({
  input: [],
  output: {
    data: [],
    plots: [],
  },
  parameters: [],
})
const activePanels = ref(['0', '1', '2'])

const prettyJson = computed(() => {
  return JSON.stringify(formData.value, null, 2)
})

// --- Example Loader Logic ---

const selectedExample = ref(null)
const loadErrorExample = ref(null)

const exampleOptions = ref([
  {
    name: 'Example 1: Basic Inputs',
    json: './example-1.json',
    cellml: './model-01.cellml',
  },
  {
    name: 'Example 2: Full Config',
    json: './example-2.json',
    cellml: './model-02.cellml',
  },
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

  await loadSimulationConfiguration()
  await loadCellmlModel()
}
const loadSimulationConfiguration = async () => {
  try {
    loadErrorExample.value = null
    const response = await fetch(selectedExample.value.json)
    if (!response.ok) {
      throw new Error(`Could not load file: ${response.statusText}`)
    }
    const data = await response.json()

    formData.value = data
  } catch (error) {
    loadErrorExample.value = `Failed to load ${selectedExample.value.json}.`
  }
}

// --- CellML Integration ---

const cellmlModelData = ref([])
const isPickerOpen = ref(false)
const variablePickerCallback = ref(null)

const pickableVariables = computed(() => {
  return cellmlVariables.value.filter((v) => v.id && v.id.trim() !== '')
})

const loadCellmlModel = async () => {
  if (!selectedExample?.value?.cellml) {
    cellmlVariables.value = []
    return
  }

  try {
    loadErrorExample.value = null
    const response = await fetch(selectedExample.value.cellml)
    if (!response.ok) {
      throw new Error(`Could not load file: ${response.statusText}`)
    }
    const data = await response.text()

    cellmlModelData.value = await extractVariableInfromationFromModel(data)
  } catch (error) {
    loadErrorExample.value = `Failed to load ${selectedExample.value.cellml}.`
  }
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

provide('openVariablePicker', openVariablePicker)
</script>

<style>
/* Helper style to make the JSON preview stick */
.sticky-top {
  position: sticky;
  top: 1rem;
}
</style>
