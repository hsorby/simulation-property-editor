<template>
  <Card class="mb-6">
    <template #title>Data</template>
    <template #content>
      <Message v-if="modelValue.length === 0" severity="info" class="mb-6">
        No data items.
      </Message>
      <Card
        v-for="(item, index) in modelValue"
        :key="index"
        class="mb-2 pa-2"
      >
        <template #title>
          <div class="flex justify-between items-center">
          <span>{{ item.name }}</span>
          <Button
            icon="pi pi-trash"
            @click="removeOutputData(index)"
            severity="danger"
            text
          />
          </div>
        </template>
        <template #content>
          <div class="flex items-center gap-2">
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

            <Button
              icon="pi pi-link"
              label="Link"
              text
              size="small"
              @click="launchPicker(item)"
            />
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup>
import { inject } from 'vue'

import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

// Inject the function provided by the parent.
const openVariablePicker = inject('openVariablePicker')

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

const launchPicker = (itemToUpdate) => {
  // Pass a callback that knows which item to update
  openVariablePicker((selectedVariable) => {
    itemToUpdate.name = selectedVariable.name
    itemToUpdate.id = selectedVariable.id || selectedVariable.name
  })
}
</script>
