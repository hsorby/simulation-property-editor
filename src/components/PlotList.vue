<template>
  <Card class="mb-6">
    <template #title>Plots</template>
    <template #content>
      <Message v-if="modelValue.length === 0" severity="info" class="mb-6">
        No plots.
      </Message>
      <Card
        v-for="(item, index) in modelValue"
        :key="index"
        class="mb-2 pa-2"
      >
        <template #title>
          <div class="flex justify-between items-center">
            <span>Plot {{ index + 1 }} </span>
            <Button
              icon="pi pi-trash"
              size="small"
              @click="removeOutputPlot(index)"
              severity="danger"
              text
            />
          </div>
        </template>
        <template #content>
          <div class="flex items-center gap-2">
            <IftaLabel class="flex-1">
              <Select
                :id="'o-plot-x-' + index"
                v-model="item.xValue"
                :options="dataOptions"
                optionLabel="name"
                optionValue="id"
                placeholder="Select X Data"
                class="w-full"
              />
              <label :for="'o-plot-x-' + index">X Value</label>
            </IftaLabel>
            <IftaLabel class="flex-1">
              <Select
                :id="'o-plot-y-' + index"
                v-model="item.yValue"
                :options="dataOptions"
                optionLabel="name"
                optionValue="id"
                placeholder="Select Y Data"
                class="w-full"
              />
              <label :for="'o-plot-y-' + index">Y Value</label>
            </IftaLabel>
            <IftaLabel class="flex-1">
              <InputText
                :id="'x-title-' + index"
                v-model="item.xAxisTitle"
                class="w-full"
              />
              <label :for="'x-title-' + index">X-Axis Title</label>
            </IftaLabel>
            <IftaLabel class="flex-1">
              <InputText
                :id="'y-title-' + index"
                v-model="item.yAxisTitle"
                class="w-full"
              />
              <label :for="'y-title-' + index">Y-Axis Title</label>
            </IftaLabel>
          </div>
        </template>
      </Card>
    </template>
  </Card>
</template>

<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Select from 'primevue/select'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  dataOptions: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const removeOutputPlot = (index) => {
  const newPlots = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newPlots)
}
</script>
