import createLibCellML from 'libcellml.js'

export const extractVariableInfromationFromModel = async (model_xml) => {
  const libcellml = await createLibCellML()
  let parser = new libcellml.Parser(false)
  let model = parser.parseModel(model_xml)

  if (parser.errorCount() > 0) {
    console.log(`Errors found while parsing model [${parser.errorCount()}]`)
    let i = 0
    while (i < parser.errorCount()) {
      let e = parser.error(i)
      console.log(e.description())
      e.delete()
      i++
    }
  }

  let data = {}

  getVariables(model, data)

  model.delete()
  parser.delete()

  return data
}

const getVariables = (componentEntity, data) => {
  let c = 0
  while (c < componentEntity.componentCount()) {
    let comp = componentEntity.componentByIndex(c)
    const name = comp.name().trim()
    if (name) {
      data[name] = []
      let v = 0
      while (v < comp.variableCount()) {
        let variable = comp.variableByIndex(v)
        data[name].push({'name': variable.name(), 'id': variable.id()})
        variable.delete()
        v++
      }
    }
    let cc = comp.componentCount()
    while (cc < comp.componentCount()) {
      childComp = comp.componentByIndex(cc)
      getVariables(childComp, data)
      childComp.delete()
      cc++
    }
    comp.delete()
    c++
  }
}