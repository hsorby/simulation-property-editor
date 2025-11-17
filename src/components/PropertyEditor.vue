<template>
  <Panel header="Simulation Configuration">
    <Accordion :value="['0']" multiple>
      <AccordionPanel value="0">
        <AccordionHeader>Inputs</AccordionHeader>
        <AccordionContent>
          <Toolbar>
            <template #center>
              <Button
                icon="pi pi-plus"
                class="mr-2"
                severity="primary"
                
                label="Add List Input"
                @click="addListInput"
              />
              <Button
                icon="pi pi-plus"
                severity="primary"
                
                label="Add Range Input"
                @click="addRangeInput"
              />
            </template>
          </Toolbar>
          <Message
            v-if="formData.input.length === 0"
            severity="info"
            class="mb-4"
            >No inputs defined. Add one using the buttons above.</Message
          >
          <InputItem
            v-for="(item, index) in formData.input"
            :key="item.id || index" 
            v-model="formData.input[index]"
            @remove="removeInput(index)"
          />
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>Outputs</AccordionHeader>
        <AccordionContent>
          <DataList v-model="formData.output.data" />
          <PlotList v-model="formData.output.plots" :data-options="formData.output.data"/>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="2">
        <AccordionHeader>Parameters</AccordionHeader>
        <AccordionContent>
          <ParameterList v-model="formData.parameters" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </Panel>
  <Card>
    <template #title> Resulting JSON </template>
    <template #content>
      <pre>{{ prettyJson }}</pre>
    </template>
  </Card>
</template>

<script setup>
import { computed, ref } from 'vue'

// PrimeVue components for the main layout
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import Panel from 'primevue/panel'
import Toolbar from 'primevue/toolbar'

// Import the new child components
import InputItem from './InputItem.vue'
import DataList from './DataList.vue'
import PlotList from './PlotList.vue'
import ParameterList from './ParameterList.vue'

const formData = ref({
  input: [],
  output: {
    data: [],
    plots: [],
  },
  parameters: [],
})

// --- INPUTS ---
// We still keep the logic for adding/removing from the main array here
const addListInput = () => {
  formData.value.input.push({
    name: 'New List Input',
    id: 'input_' + (formData.value.input.length + 1),
    defaultValue: 10,
    possibleValues: [
      { name: 'Option A', value: 10 },
      { name: 'Option B', value: 20 },
    ],
    visible: '',
  })
}

const addRangeInput = () => {
  formData.value.input.push({
    name: 'New Range Input',
    id: 'input_' + (formData.value.input.length + 1),
    defaultValue: 50,
    minimumValue: 0,
    maximumValue: 100,
    stepValue: 1,
    visible: '',
  })
}

const removeInput = (index) => {
  formData.value.input.splice(index, 1)
}

// All other add/remove logic has been moved to the child components.

// --- HELPERS ---
const prettyJson = computed(() => {
  return JSON.stringify(formData.value, null, 2)
})
</script>
