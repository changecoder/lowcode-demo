import { ElButton } from 'element-plus'
import {
  saveSchema
} from '../../services/mockService'

// 保存功能示例
const SavePlugin = (ctx: any) => {
  return {
    async init() {
      const { skeleton, config } = ctx
      const scenarioName = config.get('scenarioName')

      skeleton.add({
        name: 'save',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: (
          <ElButton onClick={() => saveSchema(scenarioName)}>
            保存到本地
          </ElButton>
        )
      })
    }
  }
}
SavePlugin.pluginName = 'SavePlugin'

export default SavePlugin