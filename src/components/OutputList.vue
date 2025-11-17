<template>
  <Toolbar class="mb-2">
    <template #center>
      <Button
        icon="pi pi-list"
        class="mr-2"
        severity="primary"
        text
        label="Add Data"
        @click="addOutputData"
      />
      <Button
        icon="pi pi-sliders-h"
        severity="primary"
        text
        label="Add Plot"
        @click="addOutputPlot"
      />
    </template>
  </Toolbar>
  <DataList v-model="modelValue.data" />
  <PlotList
    v-model="modelValue.plots"
    :data-options="modelValue.data"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Import components used in this file
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'

import DataList from './DataList.vue'
import PlotList from './PlotList.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// Logic for adding data items
const addOutputData = () => {
  // Create a new 'output' object
  const newOutputObject = {
    ...props.modelValue, // Copy existing properties (like plots)
    data: [ // Create a new data array
      ...props.modelValue.data, // Copy old data items
      { // Add the new data item
        id: 'data_' + (props.modelValue.data.length + 1),
        name: 'New Data Item',
      }
    ]
  };
  // Emit the entire new 'output' object
  emit('update:modelValue', newOutputObject)
}

// Logic for adding plot items
const addOutputPlot = () => {
  // Create a new 'output' object
  const newOutputObject = {
    ...props.modelValue, // Copy existing properties (like data)
    plots: [ // Create a new plots array
      ...props.modelValue.plots, // Copy old plot items
      { // Add the new plot item
        xAxisTitle: 'X-Axis',
        yAxisTitle: 'Y-Axis',
        xValue: null,
        yValue: null,
      }
    ]
  };
  // Emit the entire new 'output' object
  emit('update:modelValue', newOutputObject)
}
</script>