<template>
  <SimulationConfiguration v-model="formData"/>
  <Card>
    <template #title> Resulting JSON </template>
    <template #content>
      <pre>{{ prettyJson }}</pre>
    </template>
  </Card>
</template>

<script setup>
import { computed, ref } from 'vue'
import Card from 'primevue/card'
import SimulationConfiguration from './SimulationConfiguration.vue'

const formData = ref({
  input: [],
  output: {
    data: [],
    plots: [],
  },
  parameters: [],
})

// --- HELPERS ---
const prettyJson = computed(() => {
  return JSON.stringify(formData.value, null, 2)
})
</script>
