import assets from './assets.json'

const EditorInitPlugin = (ctx) => {
  return {
    async init() {
      const { material } = ctx

      // 设置物料描述

      await material.setAssets(assets)
    }
  }
}
EditorInitPlugin.pluginName = 'EditorInitPlugin'
EditorInitPlugin.meta = {}

export default EditorInitPlugin