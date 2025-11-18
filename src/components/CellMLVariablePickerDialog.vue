<template>
  <div>
    <InputText 
      v-model="filterText" 
      placeholder="Filter components or variables..." 
      class="w-full mb-2" 
    />
    
    <div class="border-1 border-gray-300 rounded-lg" style="max-height: 40vh; overflow-y: auto;">
      <Tree
        :value="treeData"
        v-model:selectionKeys="selectedKey"
        :filter="true"
        :filterValue="filterText"
        filterMode="strict"
        selectionMode="single"
        @node-select="onNodeSelect"
        :expandedKeys="expandedKeys"
      />
      <!--
        NOTES:
        - :value="treeData" -> Uses our new computed property
        - :filter="true" & :filterValue="filterText" -> Enables built-in filtering
        - @node-select="onNodeSelect" -> Lets us know when a user clicks an item
      -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Tree from 'primevue/tree' // Import the Tree component

const props = defineProps({
  modelData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['variable-selected'])

const filterText = ref('')
const selectedKey = ref(null)
const expandedKeys = ref({}) // Used to auto-expand on filter

// This computed property transforms your object into the format PrimeVue Tree needs
const treeData = computed(() => {
  const tree = []
  let componentIndex = 0
  
  // Iterate over components (e.g., 'main', 'sodium_channel')
  for (const componentName in props.modelData) {
    const componentKey = `${componentIndex}`
    const variableNodes = []
    
    const variables = props.modelData[componentName]
    let variableIndex = 0
    
    // Iterate over variables for that component
    for (const variable of variables) {
      // *** This is the filter you asked for: only show if 'id' is present ***
      if (variable.id && variable.id.trim() !== '') {
        const variableKey = `${componentIndex}-${variableIndex}`
        variableNodes.push({
          key: variableKey,
          label: variable.name,
          // Store the full variable data here, including component name
          data: { ...variable, component: componentName }, 
          icon: 'pi pi-fw pi-variable', // Custom icon
        })
        variableIndex++
      }
    }
    
    // Only add the component to the tree if it has selectable variables
    if (variableNodes.length > 0) {
      tree.push({
        key: componentKey,
        label: componentName, // Component name
        icon: 'pi pi-fw pi-folder', // Custom icon
        children: variableNodes,
      })
      componentIndex++
    }
  }
  return tree
})

// This event handler is simple: if a node is selected, check if it's
// a variable (it has 'data') and emit it.
const onNodeSelect = (node) => {
  // Check if node.data exists - this means it's a variable (child)
  // and not a component (parent)
  if (node.data) {
    emit('variable-selected', node.data)
    
    // Deselect the key so it can be selected again
    selectedKey.value = null 
  }
}

// This 'watch' auto-expands all nodes when the user types
// in the filter, so they can see the results.
watch(filterText, (newVal) => {
  if (newVal) {
    const allKeys = {}
    treeData.value.forEach(node => {
      allKeys[node.key] = true
    })
    expandedKeys.value = allKeys
  } else {
    expandedKeys.value = {}
  }
})
</script>

<style>
/* Custom style to make variable icons more distinct */
.pi-variable {
  color: var(--secondary-color);
  font-size: 0.9rem !important;
}
</style>
