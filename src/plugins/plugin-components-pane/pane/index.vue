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
      <div class="container" ref="shell">
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
import { onMounted, ref, computed, watch } from 'vue'

import List from '../components/list.vue'
import CustomComponent from '../components/component.vue'

import transform from '../utils/transform'

const { material } = window.CCLowCodeEngine || {}

const isNewEngineVersion = !!material

const props = defineProps({
  editor: Object
})

const filter = ref([])
const expandItems = ref([])
const activeGroup = ref('')
const shell = ref()

const hasContent = computed(() => !!filter.value.filter(item => {
  return item?.categories?.filter(category => {
    return category?.components?.length
  }).length
}).length)

const initComponentList = () => {
  const { editor } = props
  const rawData = isNewEngineVersion ? material.getAssets() : editor.get('assets')

  const meta = transform(rawData)

  const { groups } = meta

  filter.value = groups
  if (groups[0]) {
    activeGroup.value = groups[0].name
    expandItems.value = groups[0].categories.map(item => item.name)
  }
}

const onTabChange = (val) => {
  expandItems.value = filter.value.find(item => item.name === val).categories.map(item => item.name)
}

watch(() => shell.value, (newVal, oldVal) => {
  oldVal?.forEach(item => item.removeEventListener('click', onClick))
  newVal.forEach(item => item.addEventListener('click', onClick))
})

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

const getSnippetId = (elem) => {
  if (!elem) {
    return null
  }
  while (shell !== elem && elem.classList) {
    if (elem.classList.contains('snippet')) {
      return elem.dataset.id
    }
    elem = elem.parentNode
  }
  return null
}

const onClick = (e) => {
  const id = getSnippetId(e.target)
  console.log(id)
}

</script>
<style scoped>
.container {
  max-height: 800px;
  overflow-y: overlay;
}
</style>