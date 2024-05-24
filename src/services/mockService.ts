import { ElMessage } from 'element-plus'
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