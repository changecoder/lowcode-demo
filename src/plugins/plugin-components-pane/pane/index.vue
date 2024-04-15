<template>
  <div v-if="hasContent" class="lowcode-component-panel">
    <div class="header"></div>
    <el-tabs>
      <el-tab-pane 
        v-for="group in filter" 
        :label="group.name" 
        :key="group.name"
      >
      <div>
        <Category 
          v-for="category in group.categories"
          :name="category.name"
          :key="category.name"
        >
        <List>
          <template v-for="component in category.components">
            <CustomComponent 
              v-for="snippet in component.snippets.filter(item => item.id)" 
              :data="{ 
                title: snippet.title || component.title,
                icon: snippet.screenshot || component.icon
              }"
              :key="`${group.name}_${component.componentName}_${snippet.title}`"
            />
          </template>
        </List>
        </Category>
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

import Category from '../components/category.vue'
import List from '../components/list.vue'
import CustomComponent from '../components/component.vue'

import transform from '../utils/transform'

const { material } = window.CCLowCodeEngine || {}

const isNewEngineVersion = !!material

const props = defineProps({
  editor: Object
})

const filter = ref([])

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

</script>
