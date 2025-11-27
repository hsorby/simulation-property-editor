<template>
  <Toolbar class="mb-2">
    <template #center>
      <Button
        icon="pi pi-list"
        class="mr-2"
        severity="primary"
        text
        label="Add List Input"
        @click="addListInput"
      />
      <Button
        icon="pi pi-sliders-h"
        severity="primary"
        text
        label="Add Range Input"
        @click="addRangeInput"
      />
    </template>
  </Toolbar>
  <Message v-if="modelValue.length === 0" severity="info" class="mb-4"
    >No inputs defined. Add one using the buttons above.</Message
  >

  <InputItem
    v-for="(item, index) in modelValue"
    :key="item.id || index"
    v-model="modelValue[index]"
    @remove="removeInput(index)"
  />
</template>

<script setup>
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toolbar from 'primevue/toolbar'
import InputItem from './InputItem.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// --- INPUTS ---
const addListInput = () => {
  const newList = [
    ...props.modelValue,
    {
      name: 'New List Input',
      id: 'input_' + (props.modelValue.length + 1),
      defaultValue: 10,
      possibleValues: [
        { name: 'Option A', value: 10 },
        { name: 'Option B', value: 20 },
      ],
      visible: '',
    },
  ]
  emit('update:modelValue', newList)
}

const addRangeInput = () => {
  const newList = [
    ...props.modelValue,
    {
      name: 'New Range Input',
      id: 'input_' + (props.modelValue.length + 1),
      defaultValue: 50,
      minimumValue: 0,
      maximumValue: 100,
      stepValue: 1,
      visible: '',
    },
  ]
  emit('update:modelValue', newList)
}

const removeInput = (index) => {
  const newList = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newList)
}
</script>
