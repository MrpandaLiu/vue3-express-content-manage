import { defineStore } from 'pinia'
import * as storage from '@/utils/storage'
import { STORAGE } from '@/constants'

interface State {
  userInfo: Record<string, any>
}

const useCounterStore = defineStore('counter', {
  state: (): State => ({ userInfo: storage.getItem(STORAGE.USER_INFO) || {} }),
  actions: {
    setUserInfo(payload: Record<string, any>) {
      this.userInfo = payload
      storage.setItem(STORAGE.USER_INFO, payload)
    },
  },
})

export default useCounterStore
