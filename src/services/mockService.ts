import { ElMessage } from 'element-plus'
import schema from './schema.json'

const { project, material } = (window as any).CCLowCodeEngine

export const saveSchema = async (scenarioName: string = 'unknown') => {
  setProjectSchemaToLocalStorage(scenarioName);
  await setPackagesToLocalStorage(scenarioName);
  ElMessage({
    message: '成功保存到本地',
    type: 'success'
  })
}

const setProjectSchemaToLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!')
    return
  }
  window.localStorage.setItem(
    getLSName(scenarioName),
    JSON.stringify(project.exportSchema('save'))
  );
}

export const getProjectSchemaFromLocalStorage = (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!')
    return
  }
  return JSON.parse(window.localStorage.getItem(getLSName(scenarioName)) || '{}')
}

const getLSName = (scenarioName: string, ns: string = 'projectSchema') => `${scenarioName}:${ns}`

const setPackagesToLocalStorage = async (scenarioName: string) => {
  if (!scenarioName) {
    console.error('scenarioName is required!');
    return;
  }
  const packages = await material.getAssets().packages
  window.localStorage.setItem(
    getLSName(scenarioName, 'packages'),
    JSON.stringify(packages)
  )
}

export const getPageSchema = async (scenarioName: string = 'unknown') => {
  const pageSchema = getProjectSchemaFromLocalStorage(scenarioName).componentsTree?.[0]

  if (pageSchema) {
    return pageSchema
  }

  return schema
}