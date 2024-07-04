<template>
  <div v-if="hasContent" class="lowcode-component-panel">
    <div class="header"></div>
    <el-tabs v-model="activeGroup" @tab-change="onTabChange">
      <el-tab-pane 
        v-for="group in filter" 
        :label="group.name"
        :name="group.name"
        :key="group.name"
      >
      <div class="container" :ref="registerAdditive">
        <el-collapse v-model="expandItems">
          <el-collapse-item 
            v-for="category in group.categories"
            :title="category.name"
            :name="category.name"
            :key="category.name"
          >
            <List>
              <template v-for="component in category.components">
                <CustomComponent 
                  v-for="snippet in component.snippets.filter(item => item.id)" 
                  :data="{ 
                    title: snippet.title || component.title,
                    icon: snippet.screenshot || component.icon,
                    snippet
                  }"
                  :key="`${group.name}_${component.componentName}_${snippet.title}`"
                />
              </template>
            </List>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else class="empty">
    <div class="content">暂无组件，请在物料站点添加</div>
  </div>
</template>
<script setup>
import './index.scss'
import { onMounted, ref, computed } from 'vue'

import List from '../components/list.vue'
import CustomComponent from '../components/component.vue'
import transform from '../utils/transform'
import ComponentManager from '../store'

const { material, common } = window.CCLowCodeEngine || {}

const isNewEngineVersion = !!material

const props = defineProps({
  editor: Object
})

const filter = ref([])
const expandItems = ref([])
const activeGroup = ref('')
const store = new ComponentManager()
const hasContent = computed(() => !!filter.value.filter(item => {
  return item?.categories?.filter(category => {
    return category?.components?.length
  }).length
}).length)

const initComponentList = () => {
  const { editor } = props
  const rawData = isNewEngineVersion ? material.getAssets() : editor.get('assets')

  const meta = transform(rawData)

  const { groups, snippets } = meta

  store.setSnippets(snippets)

  filter.value = groups
  if (groups[0]) {
    activeGroup.value = groups[0].name
    expandItems.value = groups[0].categories.map(item => item.name)
  }
}

const onTabChange = (val) => {
  expandItems.value = filter.value.find(item => item.name === val).categories.map(item => item.name)
}

onMounted(() => {
  const { editor } = props
  if (!editor) {
    initComponentList()
    return
  }
  const assets = isNewEngineVersion ? material.getAssets() : editor.get('assets')
  if (assets) {
    initComponentList()
  } else {
    console.warn('[ComponentsPane]: assets not ready, wait for assets ready event.')
  }
})

const registerAdditive = (shell) => {
  if (!shell || shell.dataset.registered) {
    return
  }

  function getSnippetId(elem) {
    if (!elem) {
      return null
    }
    while (shell !== elem) {
      if (elem.classList.contains('snippet')) {
        return elem.dataset.id
      }
      elem = elem.parentNode
    }
    return null
  }

  const designer = props.editor?.get('designer')
  const _dragon = designer?.dragon
  if (!_dragon || !designer) {
    return
  }

  _dragon.from(shell, (e) => {
    const doc = designer?.currentDocument
    const id = getSnippetId(e.target)
    if (!doc || !id) {
      return false
    }

    const dragTarget = {
      type: 'nodedata',
      data: store.getSnippetById(id)
    }

    return dragTarget
  })

  shell.dataset.registered = 'true'
}
</script>
<style scoped>
.container {
  width: 100%;
  height: calc(100vh - 160px);
  overflow-y: overlay;
}
</style>