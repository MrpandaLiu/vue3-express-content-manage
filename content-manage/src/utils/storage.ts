export const getItem = (key: string) => {
  const itemStr = localStorage.getItem(key)
  try {
    if (!itemStr) return null
    return JSON.parse(itemStr)
  } catch (e) {
    return itemStr
  }
}

export const setItem = (key: string, value: any) => {
  let _value = value
  if (typeof value === 'object') {
    _value = JSON.stringify(value)
  }
  localStorage.setItem(key, _value)
  return 0
}
