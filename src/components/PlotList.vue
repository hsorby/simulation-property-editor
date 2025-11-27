<template>
  <Card class="mb-6">
    <template #title>Plots</template>
    <template #content>
      <Message v-if="modelValue.length === 0" severity="info" class="mb-6">
        No plots.
      </Message>

      <PlotItem
        v-for="(item, index) in modelValue"
        :key="index"
        :index="index"
        :plot="item"
        :data-options="dataOptions"
        @remove="removeOutputPlot(index)"
      />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Message from 'primevue/message'
import PlotItem from './PlotItem.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  dataOptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const removeOutputPlot = (index) => {
  const newPlots = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newPlots)
}
</script>
