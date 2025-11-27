<template>
  <Card class="mb-6" :color="modelValue.possibleValues ? 'blue' : 'green'">
    <template #title>
      <div class="flex justify-between items-center">
        <span>
          {{ modelValue.name || 'New Input' }}
          <span class="value-type-text"
            >({{ modelValue.possibleValues ? 'List' : 'Range' }})</span
          >
        </span>
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          @click="emit('remove')"
        />
      </div>
    </template>
    <template #content>
      <div class="flex items-center gap-2">
        <IftaLabel class="mb-4">
          <InputText
            :id="'name-' + modelValue.id"
            v-model="modelValue.name"
            class="w-full"
          />
          <label :for="'name-' + modelValue.id">Name</label>
        </IftaLabel>
        <IftaLabel class="mb-4">
          <InputText
            :id="'id-' + modelValue.id"
            v-model="modelValue.id"
            class="w-full"
          />
          <label :for="'id-' + modelValue.id">ID (Optional)</label>
        </IftaLabel>
        <IftaLabel class="mb-4">
          <InputText
            :id="'vis-' + modelValue.id"
            placeholder="e.g., 'mode == &quot;advanced&quot;'"
            v-model="modelValue.visible"
            class="w-full"
          />
          <label :for="'vis-' + modelValue.id">Visibility (Optional)</label>
        </IftaLabel>
      </div>
      <!-- List Input Fields -->
      <div v-if="modelValue.possibleValues">
        <div class="flex items-center gap-2">
          <Select
            v-model="modelValue.defaultValue"
            :options="modelValue.possibleValues"
            optionLabel="name"
            optionValue="value"
            placeholder="Select a default value"
            class="w-full mb-4"
          />
        </div>
        <Accordion :value="'-1'">
          <AccordionPanel value="0">
            <AccordionHeader>Possible Values</AccordionHeader>
            <AccordionContent>
              <Toolbar class="mb-2">
                <template #center>
                  <Button
                    label="Add Value"
                    icon="pi pi-objects-column"
                    size="small"
                    text
                    severity="primary"
                    @click="addPossibleValue" /></template
              ></Toolbar>
              <div
                v-for="(
                  possibleValue, possibleValueIndex
                ) in modelValue.possibleValues"
                :key="possibleValueIndex"
                class="flex items-center gap-2 mb-2"
              >
                <InputText
                  v-model="possibleValue.name"
                  placeholder="Display Name"
                  class="flex-1"
                ></InputText>
                <InputNumber
                  v-model="possibleValue.value"
                  placeholder="Numeric Value"
                  class="flex-1"
                ></InputNumber>
                <Button
                  icon="pi pi-trash"
                  size="small"
                  severity="danger"
                  text
                  @click="removePossibleValue(possibleValueIndex)"
                ></Button>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>

      <!-- Range Input Fields -->
      <div v-else>
        <div class="flex items-center gap-2">
          <Slider
            v-model.number="modelValue.defaultValue"
            :min="modelValue.minimumValue"
            :max="modelValue.maximumValue"
            :step="modelValue.stepValue"
            class="w-full mb-4"
          />
          <IftaLabel class="mb-4">
            <InputNumber
              :id="'default-' + modelValue.id"
              v-model="modelValue.defaultValue"
              :min="modelValue.minimumValue"
              :max="modelValue.maximumValue"
              :step="modelValue.stepValue"
            />
            <label :for="'default-' + modelValue.id">Default Value</label>
          </IftaLabel>
        </div>

        <div class="flex gap-2">
          <IftaLabel class="flex-1">
            <InputNumber
              :id="'min-' + modelValue.id"
              v-model="modelValue.minimumValue"
              class="w-full"
            />
            <label :for="'min-' + modelValue.id">Min Value</label>
          </IftaLabel>
          <IftaLabel class="flex-1">
            <InputNumber
              :id="'max-' + modelValue.id"
              v-model="modelValue.maximumValue"
              class="w-full"
            />
            <label :for="'max-' + modelValue.id">Max Value</label>
          </IftaLabel>
          <IftaLabel class="flex-1">
            <InputNumber
              :id="'step-' + modelValue.id"
              v-model="modelValue.stepValue"
              class="w-full"
            />
            <label :for="'step-' + modelValue.id">Step (Optional)</label>
          </IftaLabel>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import Card from 'primevue/card'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Slider from 'primevue/slider'
import Toolbar from 'primevue/toolbar'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

// And emit 'remove' when the delete button is clicked
const emit = defineEmits(['update:modelValue', 'remove'])

const addPossibleValue = () => {
  // We can directly mutate the prop's properties because it's
  // a reactive object from the parent's ref.
  props.modelValue.possibleValues.push({ name: 'New', value: 0 })
}

const removePossibleValue = (index) => {
  props.modelValue.possibleValues.splice(index, 1)
}
</script>

<style scoped>
.value-type-text {
  font-size: 0.8rem;
  color: var(--p-iftalabel-color);
}
</style>
