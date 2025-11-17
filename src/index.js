import PropertyEditor from './components/PropertyEditor.vue'

// Export the component as a Vue plugin
export default {
  install: (app, options) => {
    app.component('PropertyEditor', PropertyEditor)
  },
}
