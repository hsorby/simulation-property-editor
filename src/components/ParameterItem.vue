<template>
  <Card class="mb-2 pa-2">
    <template #title>
      <div class="flex justify-between items-center">
        <span>{{ parameter.name }}</span>
        <Button
          icon="pi pi-trash"
          size="small"
          @click="$emit('remove')"
          severity="danger"
          text
        />
      </div>
    </template>
    <template #content>
      <div class="flex items-center gap-2">
        <IftaLabel class="flex-1">
          <InputText
            :id="`param-name-${id}`"
            v-model="parameter.name"
            class="w-full"
          />
          <label :for="`param-name-${id}`">Name</label>
        </IftaLabel>

        <IftaLabel class="flex-1">
          <InputText
            :id="`param-val-${id}`"
            v-model="parameter.value"
            class="w-full"
          />
          <label :for="`param-val-${id}`">Value</label>
        </IftaLabel>

        <Button
          icon="pi pi-link"
          label="Link"
          text
          size="small"
          @click="launchPicker"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { inject, computed } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'

const props = defineProps({
  parameter: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

defineEmits(['remove'])

// Generate a unique ID for accessibility labels based on index
const id = computed(() => props.index)

// Inject directly into the child. 
// If the provider is an ancestor of the List, the Item can see it too.
const openVariablePicker = inject('openVariablePicker')

const launchPicker = () => {
  openVariablePicker((selectedVariable) => {
    // We are mutating the object prop directly. 
    // In Vue 3 with Objects, this preserves reactivity and is standard for forms.
    props.parameter.name = selectedVariable.name
    props.parameter.id = selectedVariable.id || selectedVariable.name
    props.parameter.value = selectedVariable.value
  })
}
</script>
