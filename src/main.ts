import './style.css'

const { init, material } = (window as any).CCLowcodeEngine

const container = document.querySelector('#app')

init(container)

material.loadIncrementalAssets({
  "version": "0.1.0",
  "packages": [
    {
      "package": "lowcode-material-ant-vue",
      "version": '0.1.1',
      "library": "LowcodeMaterialAntVue",
      "urls": [
        "https://cdn.jsdelivr.net/npm/lowcode-material-ant-vue@0.1.1/dist/index.js",
        "https://cdn.jsdelivr.net/npm/lowcode-material-ant-vue@0.1.1/dist/index.css"
      ]
    }
  ],
  "components": [
    {
      "exportName": "LowcodeMaterialAntVueMeta",
      "npm": {
        "package": "lowcode-material-ant-vue",
        "version": "0.1.1"
      },
      "url": "https://cdn.jsdelivr.net/npm/lowcode-material-ant-vue@0.1.1/dist/meta.js",
      "urls": {
        "default": "https://cdn.jsdelivr.net/npm/lowcode-material-ant-vue@0.1.1/dist/meta.js"
      }
    }
  ],
  "sort": {
    "groupList": ["精选组件", "原子组件"],
    "categoryList": ["通用", "导航", "信息输入", "信息展示", "信息反馈"]
  },
  "groupList": ["精选组件", "原子组件"]
})