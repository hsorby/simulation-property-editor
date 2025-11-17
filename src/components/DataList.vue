<template>
  <Card class="mb-4">
    <template #title>Data</template>
    <template #content>
      <Button
        icon="pi pi-plus"
        size="small"
        severity="success"
        @click="addOutputData"
        class="mb-2"
        label="Add Data"
      />
      <Message v-if="modelValue.length === 0" severity="info" class="mb-4">
        No data items.
      </Message>
      <Card
        v-for="(item, index) in modelValue"
        :key="index"
        class="mb-2 pa-2 border rounded"
      >
        <template #title
          >{{ item.name }}
          <Button
            icon="pi pi-trash"
            @click="removeOutputData(index)"
            severity="danger"
            text
          />
        </template>
        <template #content>
          <div class="flex align-items-center gap-2">
            <IftaLabel class="flex-1">
              <InputText
                :id="'o-data-name-' + index"
                v-model="item.name"
                class="w-full"
              />
              <label :for="'o-data-name-' + index">Name</label>
            </IftaLabel>
            <IftaLabel class="flex-1">
              <InputText
                :id="'o-data-id-' + index"
                v-model="item.id"
                class="w-full"
              />
              <label :for="'o-data-id-' + index">ID</label>
            </IftaLabel>
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Import components used in this file
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// Logic for adding/removing data items is now here
const addOutputData = () => {
  // To update a v-model array, we emit a *new* array
  const newData = [
    ...props.modelValue,
    {
      id: 'data_' + (props.modelValue.length + 1),
      name: 'New Data Item',
    },
  ]
  emit('update:modelValue', newData)
}

const removeOutputData = (index) => {
  // Create a new array without the item at 'index'
  const newData = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newData)
}
</script>
