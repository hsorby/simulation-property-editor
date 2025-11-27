<template>
  <Panel header="Simulation Configuration">
    <Accordion 
      :value="expandedPanels" 
      @update:value="(val) => $emit('update:expandedPanels', val)" 
      multiple
    >
      <AccordionPanel value="0">
        <AccordionHeader>Inputs</AccordionHeader>
        <AccordionContent>
          <InputList v-model="modelValue.input" />
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader>Parameters</AccordionHeader>
        <AccordionContent>
          <ParameterList v-model="modelValue.parameters" />
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="2">
        <AccordionHeader>Outputs</AccordionHeader>
        <AccordionContent>
          <OutputList v-model="modelValue.output"/>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </Panel>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Panel from 'primevue/panel'

import InputList from './InputList.vue'
import OutputList from './OutputList.vue'
import ParameterList from './ParameterList.vue'

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  expandedPanels: {
    type: Array,
    // Default to having all three accordian panels open.
    default: () => ['0', '1', '2'] 
  }
})

defineEmits(['update:modelValue', 'update:expandedPanels'])
</script>
