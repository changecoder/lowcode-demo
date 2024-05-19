import EditorInitPlugin from '@/plugins/plugin-editor-init'
import ComponentPanelPlugin from '@/plugins/plugin-components-pane'

import './main.less'

const { init, plugins } = (window as any).CCLowcodeEngine

async function registerPlugins() {
  await plugins.register(EditorInitPlugin)

  await plugins.register(ComponentPanelPlugin)
}

(async function main() {
  await registerPlugins()

  init(document.getElementById('lce-container'))
})()
