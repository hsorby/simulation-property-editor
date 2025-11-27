<template>
  <Toolbar class="mb-2">
    <template #center>
      <Button
        icon="pi pi-sparkles"
        size="small"
        severity="primary"
        @click="addParameter"
        label="Add Parameter"
        text
      />
    </template>
  </Toolbar>

  <Message v-if="modelValue.length === 0" severity="info" class="mb-12">
    No parameters.
  </Message>

  <ParameterItem
    v-for="(item, index) in modelValue"
    :key="index"
    :index="index"
    :parameter="item"
    @remove="removeParameter(index)"
  />
</template>

<script setup>
import Button from 'primevue/button'
import Message from 'primevue/message'
import Toolbar from 'primevue/toolbar'
import ParameterItem from './ParameterItem.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const addParameter = () => {
  const newParams = [
    ...props.modelValue,
    {
      name: 'New parameter',
      value: '',
    },
  ]
  emit('update:modelValue', newParams)
}

const removeParameter = (index) => {
  const newParams = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newParams)
}
</script>
