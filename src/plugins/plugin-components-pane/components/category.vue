<template>
  <div class='category'>
    <div class="header">
      <div class="title">{{ name }}</div>
      <div :class="['icon', { expand: !!expand }]" @click="handleToggle">
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const expand = ref(true)

const handleToggle = () => {
  expand.value = !expand.value
}

const { name } = defineProps({
  name: String
})
</script>
<style lang="scss" scoped>
.category {
  .header {
    height: 42px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #dfdfdf;
    border-top: 1px solid #dfdfdf;
    margin-top: -1px;
  }

  .title {
    flex: 1;
    padding-left: 16px;
    font-size: 12px;
    color: black;
    font-weight: 600;
  }

  .icon {
    width: 40px;
    flex-grow: 0;
    flex-shrink: 0;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &.expand {
      transform: rotate(180deg);
    }
  }
}
</style>