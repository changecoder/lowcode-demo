const transform = (raw) => {
  let groupList = []
  let categoryList = []
  let ignoreComponents = {}
  let componentList = []

  if (raw?.groupList?.length) {
    groupList = raw.groupList
  } else {
    groupList = ['组件']
  }
  if (raw?.ignoreComponents) {
    ignoreComponents = raw.ignoreComponents
  }

  const snippets = []
  const groups = []
  // 如果 assets 有 sort 属性，则表示为符合新协议规范的 assets
  if (raw?.sort?.groupList && raw?.sort?.categoryList) {
    const map = {}
    groupList = raw.sort.groupList
    categoryList = raw.sort.categoryList
    componentList = raw.components?.filter(component => {
      const ignore = component?.hidden || !component?.snippets?.length || (ignoreComponents[component?.npm?.package]||{})[component.componentName]
      return !ignore
    }).map((component) => {
      component.snippets.forEach(snippet => {
        snippet.id = `${component.group}_${component.category}_${component.componentName}_${snippet.title}`
        snippets.push(snippet)
      });
      const { group = '默认分组', category, priority: componentPriority = 0 } = component
      component.group = group
      component.priority = componentPriority
      const indexOfCategory = categoryList.indexOf(category)
      const categoryPriority = indexOfCategory === -1 ? -1 : categoryList.length - indexOfCategory
      if (!map[group]) {
        const groupIndex = groupList.indexOf(group)
        const groupPriority = groupIndex === -1 ? -1 : (groupList.length - groupIndex)
        const obj = {
          name: group,
          content: {},
          categories: [],
          priority: groupPriority
        }

        map[group] = obj
        groups.push(obj)
      }
      const currentGroup = map[group]
      if (!currentGroup.content[category]) {
        const cateObj = {
          components: [],
          name: category,
          priority: categoryPriority
        }
        currentGroup.content[category] = cateObj
        currentGroup.categories.push(cateObj)
      }
      const currentCategory = currentGroup.content[category]

      currentCategory.components.push(component)
      return component
    })
  }
  groups.sort((a, b) => {
    return b.priority - a.priority
  });
  groups.forEach((group) => {
    if (!group.categories || !group.categories.length) {
      return
    }
    group.categories.sort((a, b) => {
      return b.priority - a.priority
    })
    group.categories = group.categories.map(category => {
      category?.components?.sort((a, b) => {
        return (b.priority || 0) - (a.priority || 0)
      })
      return category
    })
  })

  return {
    groupList,
    componentList,
    groups,
    snippets
  }
}

export default transform