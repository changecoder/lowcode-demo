import ComponentsPane from './pane/index.vue'

const ComponentPanelPlugin = ctx => {
  return {
    async init() {
      const { skeleton } = ctx
      skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        contentProps: {},
        props: {
          align: 'top',
          icon: '组件',
          description: '组件库'
        }
      })
    }
  }
}

ComponentPanelPlugin.pluginName = 'ComponentPanelPlugin'

export default ComponentPanelPlugin