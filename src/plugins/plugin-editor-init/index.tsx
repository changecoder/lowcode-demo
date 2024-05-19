import assets from '../../services/assets.json'
import schema from '../../services/schema.json'

const EditorInitPlugin = (ctx: any) => {
  return {
    async init() {
      const { material, project } = ctx
      // 设置物料描述
      await material.setAssets(assets)
      // 加载 schema
      project.importSchema(schema)
    }
  }
}

EditorInitPlugin.pluginName = 'EditorInitPlugin'

export default EditorInitPlugin