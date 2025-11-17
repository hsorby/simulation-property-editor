<template>
  <Card>
    <template #content>
      <Toolbar class="mb-2">
        <template #center>
          <!-- 
            MODIFIED: This button now opens the picker 
            instead of just adding a blank parameter.
          -->
          <Button
            icon="pi pi-sparkles"
            size="small"
            severity="primary"
            @click="launchPicker"
            label="Add Parameter from CellML"
            text
          />
        </template>
      </Toolbar>
      <Message v-if="modelValue.length === 0" severity="info" class="mb-4">
        No parameters.
      </Message>
      <Card
        v-for="(item, index) in modelValue"
        :key="index"
        class="mb-2 pa-2 border rounded"
      >
        <template #title>
          {{ item.name }}
          <Button
            icon="pi pi-trash"
            size="small"
            @click="removeParameter(index)"
            severity="danger"
            text
          />
        </template>
        <template #content>
          <div class="flex align-items-center gap-2">
            <IftaLabel class="flex-1">
              <InputText
                :id="'parameter-name-' + index"
                v-model="item.name"
                class="w-full"
              />
              <label :for="'parameter-name-' + index">Name</label>
            </IftaLabel>
            <IftaLabel class="flex-1">
              <InputText
                :id="'parameter-value-' + index"
                v-model="item.value"
                class="w-full"
              />
              <label :for="'parameter-value-' + index">Value</label>
            </IftaLabel>
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits, inject } from 'vue' // 1. Import inject
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Toolbar from 'primevue/toolbar' // Corrected import

// 2. Inject the function
const openVariablePicker = inject('openVariablePicker')

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

// 3. This is the callback for adding a NEW parameter
const addParameter = (selectedVariable) => {
  const newParams = [
    ...props.modelValue,
    {
      name: selectedVariable.name,
      value: `[${selectedVariable.component}.${selectedVariable.name}]`, // Or some default
    },
  ]
  emit('update:modelValue', newParams)
}

// 4. Launch the picker, passing the 'addParameter' function as the callback
const launchPicker = () => {
  openVariablePicker(addParameter)
}

// This function remains the same
const removeParameter = (index) => {
  const newParams = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newParams)
}
</script>
