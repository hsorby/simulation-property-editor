import SimulationConfiguration from './components/SimulationConfiguration.vue'

// Export the component as a Vue plugin
export default {
  install: (app, options) => {
    app.component('SimulationConfiguration', SimulationConfiguration)
  },
}
