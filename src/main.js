import ComponentPanelPlugin from '@/plugins/plugin-components-pane'
import EditorInitPlugin from '@/plugins/plugin-editor-init'

const { init, plugins } = window.CCLowcodeEngine

const registerPlugins = async () => {
  await plugins.register(EditorInitPlugin)

  await plugins.register(ComponentPanelPlugin)
}

(async function main() {
  await registerPlugins()

  init(document.getElementById('app'))
})()

