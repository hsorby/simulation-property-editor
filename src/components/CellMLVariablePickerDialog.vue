<template>
  <div>
    <InputText vM-model="filterText" placeholder="Filter variables..." class="w-full mb-2" />
    
    <!-- 
      This is a simple list, but you could use a 
      PrimeVue <Tree> or <DataTable> for a richer UI 
      to show components and their variables.
    -->
    <div class.="border-1 border-gray-300 rounded-lg p-2" style="max-height: 40vh; overflow-y: auto;">
      <div 
        v-for="variable in filteredVariables" 
        :key="variable.id"
        class="p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
        @click="selectVariable(variable)"
      >
        <strong>{{ variable.name }}</strong>
        <div class="text-sm text-gray-600">{{ variable.component }}</div>
      </div>
      <div v-if="filteredVariables.length === 0" class="p-2 text-gray-500">
        No variables found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import InputText from 'primevue/inputtext'

const props = defineProps({
  variables: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['variable-selected'])

const filterText = ref('')

const filteredVariables = computed(() => {
  if (!filterText.value) {
    return props.variables
  }
  const lowerFilter = filterText.value.toLowerCase()
  return props.variables.filter(v => 
    v.name.toLowerCase().includes(lowerFilter) ||
    v.component.toLowerCase().includes(lowerFilter)
  )
})

const selectVariable = (variable) => {
  emit('variable-selected', variable)
}
</script>
