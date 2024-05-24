import EditorInitPlugin from '@/plugins/plugin-editor-init'
import ComponentPanelPlugin from '@/plugins/plugin-components-pane'
import SavePlugin from '@/plugins/plugin-save'

import './main.less'

const { init, plugins } = (window as any).CCLowCodeEngine

async function registerPlugins() {
  await plugins.register(EditorInitPlugin, {
    scenarioName: 'lowcode-demo'
  })

  await plugins.register(SavePlugin)

  await plugins.register(ComponentPanelPlugin)
}

(async function main() {
  await registerPlugins()

  init(document.getElementById('lce-container'))
})()
