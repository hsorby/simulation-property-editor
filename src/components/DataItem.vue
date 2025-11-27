<template>
  <Card class="mb-2 pa-2">
    <template #title>
      <div class="flex justify-between items-center">
        <span>{{ item.name }}</span>
        <Button
          icon="pi pi-trash"
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
            :id="`o-data-name-${index}`"
            v-model="item.name"
            class="w-full"
          />
          <label :for="`o-data-name-${index}`">Name</label>
        </IftaLabel>

        <IftaLabel class="flex-1">
          <InputText
            :id="`o-data-id-${index}`"
            v-model="item.id"
            class="w-full"
          />
          <label :for="`o-data-id-${index}`">ID</label>
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
import { inject } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

defineEmits(['remove'])

const openVariablePicker = inject('openVariablePicker')

const launchPicker = () => {
  openVariablePicker((selectedVariable) => {
    props.item.name = selectedVariable.name
    props.item.id = selectedVariable.id || selectedVariable.name
  })
}
</script>
