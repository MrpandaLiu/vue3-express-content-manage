<template>
  <div class="login-wrapper">
    <el-card class="box-card">
      <h2 class="login-text">🐻🐱🐱内容管理平台</h2>
      <CommonForm :form="form" :fields="fields" :config="config" />
      <div class="login-bottom">
        <el-button type="primary" size="large" round @click="onSubmit"
          >登录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import CommonForm from '@/components/CommonForm.vue'
import { Toast } from '@/utils/toast'
import useCounterStore from '@/hooks/useUser'
import { fields, config } from './config'
import { login } from './api'

const form = reactive({
  username: '',
  password: '',
})
const router = useRouter()
const store = useCounterStore()

const onSubmit = async () => {
  if (!form.username || !form.password) {
    Toast.show('信息填写不全')
    return
  }
  const res = await login(form)
  if (res.code === 0) {
    Toast.success('登录成功')
    store.setUserInfo(res.data.model)
    store
    setTimeout(() => {
      router.push('/admin/index')
    }, 1000)
  } else {
    Toast.error('登录失败')
  }
}
</script>

<style scoped lang="less">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, skyblue, white);

  .box-card {
    width: 480px;
    height: 300px;
    padding: 0 30px;

    .login-text {
      text-align: center;
      margin-bottom: 30px;
    }

    .login-bottom {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .el-form-item {
    background: pink;
  }
}
</style>
