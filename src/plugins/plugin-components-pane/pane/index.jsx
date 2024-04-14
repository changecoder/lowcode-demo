import transform from '../utils/transform'

const { material } = window.CCLowCodeEngine || {}

const isNewEngineVersion = !!material

export default {
  name: 'ComponentPane',
  props: {
    editor: Object
  },
  data() {
    return {
      filter: []
    }
  },
  render() {
    const hasContent = this.filter.filter(item => {
      return item?.categories?.filter(category => {
        return category?.components?.length
      }).length
    }).length
    if (!hasContent) {
      return <div class="empty">
        <div class="content">暂无组件，请在物料站点添加</div>
      </div>
    }
    return (
      <div class="lowcode-component-panel">
        <div class="header"></div>
        <el-tabs>{this.filter.map(group => {
          return <el-tab-pane label={group.name} name={group.name}>{group.name}</el-tab-pane>
        })}</el-tabs>
      </div>
    )
  },
  mounted() {
    const { editor } = this
    if (!editor) {
      this.initComponentList()
      return
    }
    const assets = isNewEngineVersion ? material.getAssets() : editor.get('assets')
    if (assets) {
      this.initComponentList()
    } else {
      console.warn('[ComponentsPane]: assets not ready, wait for assets ready event.')
    }
  },
  methods: {
    initComponentList() {
      const { editor } = this
      const rawData = isNewEngineVersion ? material.getAssets() : editor.get('assets')
  
      const meta = transform(rawData)
  
      const { groups } = meta

      this.filter = groups
    }
  }
}