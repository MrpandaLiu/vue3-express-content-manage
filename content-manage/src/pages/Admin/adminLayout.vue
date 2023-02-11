<template>
  <div class="admin-layout-wrapper">
    <div class="header">
      <h2>🐻🐱🐱创作者平台</h2>
      <div class="header-content">
        <el-popover
          ref="popover"
          placement="bottom"
          :width="140"
          trigger="click"
        >
          <template #reference>
            <div class="user-info">
              <img class="avatar" :src="store.userInfo.avatar" alt="" />
              <p class="username">{{ store.userInfo.nickName }}</p>
              <el-icon><ArrowDown /></el-icon>
            </div>
          </template>
          <div class="admin-layout-pop-over" @click="quit">
            <el-icon><BellFilled /></el-icon>
            <div class="text">退出登录</div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="container">
      <div class="left-side">
        <div class="btn-wrapper">
          <el-button class="pb-btn" type="primary" @click="gotoPub"
            >发布笔记</el-button
          >
        </div>
        <el-menu
          class="left-side"
          :default-active="currentActive"
          @select="onChangeMenu"
        >
          <el-menu-item
            v-for="item in menu"
            :key="item.index"
            :index="item.index"
          >
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view class="right-side"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Menu as IconMenu,
  ArrowDown,
  BellFilled,
} from '@element-plus/icons-vue'
import { menu } from '@/utils/menu'
import useCounterStore from '@/hooks/useUser'
import { setItem } from '@/utils/storage'
import { STORAGE } from '@/constants'
import { getUserInfo } from '@/api/user'

const router = useRouter()
const route = useRoute()
const store = useCounterStore()
const currentActive = ref('')
const onChangeMenu = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
}

onMounted(async () => {
  currentActive.value = route.path
  const res = await getUserInfo()
  store.setUserInfo(res.data.model)
})

const gotoPub = () => {
  router.push('/admin/note')
}

const quit = () => {
  setItem(STORAGE.TOKEN, '')
  setTimeout(() => {
    router.push('/login')
  }, 1000)
}
</script>

<style scoped lang="less">
.admin-layout-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    box-shadow: 2px 2px 5px #ddd;
    padding: 12px 30px;
    display: flex;
    justify-content: space-between;
    z-index: 100;
    position: sticky;
    top: 0;
    background: white;

    .header-content {
      display: flex;
      align-items: center;
      cursor: pointer;

      .user-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username {
          margin-left: 12px;
          margin-right: 6px;
          font-size: 14px;
        }
      }
    }
  }

  .container {
    display: flex;
    flex: 1;

    .left-side {
      box-sizing: border-box;
      padding-top: 1px;
      width: 180px;
      height: 100%;

      .btn-wrapper {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #ddd;

        .pb-btn {
          width: 86%;
          height: 40px;
          font-size: 16px;
        }
      }

      .el-menu {
        border-right: none;
      }
    }

    .right-side {
      flex: 1;
      overflow-x: hidden;
      // overflow-y: auto;
    }
  }
}
.admin-layout-pop-over {
  display: flex;
  align-items: center;
  cursor: pointer;

  .text {
    margin-left: 12px;
  }
}
</style>
