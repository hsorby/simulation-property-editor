<template>
  <Card>
    <template #content>
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
            <Button
              icon="pi pi-trash"
              size="small"
              @click="removeParameter(index)"
              severity="danger"
              text
            />
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { Toolbar } from 'primevue'

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
      name: 'New Parameter',
      value: 'default',
    },
  ]
  emit('update:modelValue', newParams)
}

const removeParameter = (index) => {
  const newParams = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newParams)
}
</script>
