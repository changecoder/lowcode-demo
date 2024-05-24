import assets from '../../services/assets.json'
import schema from '../../services/schema.json'

const EditorInitPlugin = (ctx: any, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx
      const scenarioName = options['scenarioName']
      // 保存在config中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName)
      // 设置物料描述
      await material.setAssets(assets)
      // 加载 schema
      project.importSchema(schema)
    }
  }
}

EditorInitPlugin.pluginName = 'EditorInitPlugin'

export default EditorInitPlugin