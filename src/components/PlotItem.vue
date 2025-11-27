<template>
  <Card class="mb-2 pa-2">
    <template #title>
      <div class="flex justify-between items-center">
        <span>Plot {{ index + 1 }}</span>
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
          <Select
            :id="`o-plot-x-${index}`"
            v-model="plot.xValue"
            :options="dataOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select X Data"
            class="w-full"
          />
          <label :for="`o-plot-x-${index}`">X Value</label>
        </IftaLabel>

        <IftaLabel class="flex-1">
          <Select
            :id="`o-plot-y-${index}`"
            v-model="plot.yValue"
            :options="dataOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select Y Data"
            class="w-full"
          />
          <label :for="`o-plot-y-${index}`">Y Value</label>
        </IftaLabel>

        <IftaLabel class="flex-1">
          <InputText
            :id="`x-title-${index}`"
            v-model="plot.xAxisTitle"
            class="w-full"
          />
          <label :for="`x-title-${index}`">X-Axis Title</label>
        </IftaLabel>

        <IftaLabel class="flex-1">
          <InputText
            :id="`y-title-${index}`"
            v-model="plot.yAxisTitle"
            class="w-full"
          />
          <label :for="`y-title-${index}`">Y-Axis Title</label>
        </IftaLabel>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

defineProps({
  plot: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  dataOptions: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['remove'])
</script>
