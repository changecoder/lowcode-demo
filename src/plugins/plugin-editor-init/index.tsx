import assets from '../../services/assets.json'
import { getPageSchema } from '../../services/mockService'

const EditorInitPlugin = (ctx: any, options: any) => {
  return {
    async init() {
      const { material, project, config } = ctx
      const scenarioName = options['scenarioName']
      // 保存在config中用于引擎范围其他插件使用
      config.set('scenarioName', scenarioName)
      // 设置物料描述
      await material.setAssets(assets)
      const schema = await getPageSchema(scenarioName)
      // 加载 schema
      project.openDocument(schema)
    }
  }
}

EditorInitPlugin.pluginName = 'EditorInitPlugin'

export default EditorInitPlugin