# Simulation Property Editor

[![license](https://img.shields.io/badge/license-Apache--2.0-green)](https://choosealicense.com/licenses/apache-2.0/)

A lightweight, flexible Vue 3 component designed to edit simulation properties for OpenCOR.
This component facilitates the creation of dynamic simpluation parameters, inputs, and outputs.
Allowing a user to dynamically adjust the OpoenCOR simulation view.

## Features

- **Vue 3 Compatible:** Built using the Composition API.
- **Reactivity:** Seamless two-way data binding.

## Installation

Install the package via npm or yarn:

```bash
npm install simpropertyeditor
# or
yarn add simpropertyeditor
```

## Usage

Import the component and the necessary styles in your Vue component.

## Basic Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  SimulationConfiguration,
  CellMLVariablePickerDialog,
} from 'simpropertyeditor'
import 'simpropertyeditor/simpropertyeditor.css' // Ensure styles are imported

// The data object to be edited.
const simulationData = ref({
  input: [],
  output: {
    data: [],
    plots: [],
  },
  parameters: [],
})

// CellML integration.
const cellmlModelData = ref([])
const isPickerOpen = ref(false)
const variablePickerCallback = ref(null)

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

<template>
  <div class="container">
    <h2>Edit Simulation Parameters</h2>

    <SimulationConfiguration v-model="simulationData" />
  </div>

  <Dialog
    v-model:visible="isPickerOpen"
    modal
    header="Select CellML Variable"
    class="w-full max-w-lg mx-7"
  >
    <CellmlVariablePickerDialog
      :model-data="cellmlModelData"
      @variable-selected="onVariableSelected"
    />
  </Dialog>
</template>
```

## API Reference

### Props

| Prop       | Type   | Required | Description                                                     |
| ---------- | ------ | -------- | --------------------------------------------------------------- |
| modelValue | Object | Yes      | The data object containing the simulation properties (v-model). |

### Events

| Event             | Arguments       | Description                                                 |
| ----------------- | --------------- | ----------------------------------------------------------- |
| update:modelValue | (value: Object) | Emitted when any property changes (standard v-model event). |

## Development

If you wish to contribute or modify the source code locally:

### Clone the repository

```bash
git clone https://github.com/hsorby/simulation-property-editor.git
cd simulation-property-editor
```

### Install dependencies

```bash
yarn
```

### Run the development server

```bash
yarn dev
```

### Build for production

```bash
yarn build-lib
```

### License

Apache-2.0
