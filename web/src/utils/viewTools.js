import {
  ElMessage,
  ElMessageBox
} from 'element-plus'
export const successTip = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'success',
    showClose: show || false
  })
}
export const errorTip = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'warning',
    showClose: show || false
  })
}
export const infoTip = (msg, show) => {
  ElMessage({
    message: msg,
    type: 'info',
    showClose: show || false
  })
}

export const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const h = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${y}-${m} ${h}:${mm}:${ss}`
}