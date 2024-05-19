import ComponentsPane from './pane/index.vue'

const ComponentPanelPlugin = (ctx: any) => {
  return {
    async init() {
      const { skeleton, project } = ctx
      // 注册组件面板
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        contentProps: {},
        props: {
          align: 'top',
          icon: 'Wallet',
          description: '组件库',
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