<template>
  <Card class="mb-6">
    <template #title>Data</template>
    <template #content>
      <Message v-if="modelValue.length === 0" severity="info" class="mb-6">
        No data items.
      </Message>

      <DataItem
        v-for="(item, index) in modelValue"
        :key="index"
        :index="index"
        :item="item"
        @remove="removeOutputData(index)"
      />
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card'
import Message from 'primevue/message'
import DataItem from './DataItem.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const removeOutputData = (index) => {
  const newData = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newData)
}
</script>
