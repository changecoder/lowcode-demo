import ComponentsPane from './pane/index.vue'

const ComponentPanelPlugin = ctx => {
  return {
    async init() {
      const { skeleton, project } = ctx
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        contentProps: {},
        props: {
          align: 'top',
          icon: 'Wallet',
          description: '组件库'
        }
      })
      componentsPane?.disable?.()
      project.onSimulatorRendererReady(() => {
        componentsPane?.enable?.()
      })
    }
  }
}

ComponentPanelPlugin.pluginName = 'ComponentPanelPlugin'

export default ComponentPanelPlugin