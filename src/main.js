import ComponentPanelPlugin from '@/plugins/plugin-components-pane'
import EditorInitPlugin from '@/plugins/plugin-editor-init'
import './global.scss'

const { init, plugins } = window.CCLowcodeEngine

const registerPlugins = async () => {
  await plugins.register(EditorInitPlugin)

  await plugins.register(ComponentPanelPlugin)
}

(async function main() {
  await registerPlugins()

  init(document.getElementById('lce-container'), {
    simulatorUrl: [
      '/js/vue-simulator-renderer.js', 
      '/js/vue-simulator-renderer.css']
  })
})()

