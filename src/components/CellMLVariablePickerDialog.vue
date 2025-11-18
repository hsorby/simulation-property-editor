<template>
  <div>

    <div class="flex flex-wrap gap-2 mb-2">
      <Button
        type="button"
        icon="pi pi-plus"
        text
        label="Expand All"
        @click="expandAll"
      />
      <Button
        type="button"
        icon="pi pi-minus"
        text
        label="Collapse All"
        @click="collapseAll"
      />
    </div>
    <div
      class="border-1 border-gray-300 rounded-lg"
      style="max-height: 40vh; overflow-y: auto"
    >
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from 'vue'
import Button from 'primevue/button'
import Tree from 'primevue/tree'

const props = defineProps({
  modelData: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['variable-selected'])

const filterText = ref('')
const selectedKey = ref(null)
const expandedKeys = ref({}) // Used to auto-expand on filter

// This computed property transforms modelData object into the format PrimeVue Tree needs
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
        label: componentName,
        icon: 'pi pi-fw pi-folder',
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

const expandAll = () => {
  const allKeys = {}
  treeData.value.forEach((node) => {
    allKeys[node.key] = true
  })
  expandedKeys.value = allKeys
}

const collapseAll = () => {
  expandedKeys.value = {}
}

// This 'watch' auto-expands all nodes when the user types
// in the filter, so they can see the results.
watch(filterText, (newVal) => {
  if (newVal) {
    expandAll()
  } else {
    collapseAll()
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
