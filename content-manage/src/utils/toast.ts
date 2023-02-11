import { ElMessage } from 'element-plus'

export const Toast = {
  show: (msg: string) => {
    ElMessage({
      message: msg,
    })
  },
  success: (msg: string) => {
    ElMessage({
      message: msg,
      type: 'success',
    })
  },
  error: (msg: string) => {
    ElMessage({
      message: msg,
      type: 'error',
    })
  },
}
