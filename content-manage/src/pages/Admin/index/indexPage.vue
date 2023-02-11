<template>
  <div class="admin-index-wrapper">
    <div class="left-side">
      <div class="top-data">
        <img class="avatar" :src="store.userInfo.avatar" alt="" />
        <div class="user-desc">
          <p>{{ store.userInfo.nickName }}</p>
          <p class="sub-text">用户ID：{{ store.userInfo.username }}</p>
          <p class="sub-text">
            {{ store.userInfo.desc }}
          </p>
        </div>
      </div>
      <div class="data-area">
        <sub-title>数据总览</sub-title>
        <div class="data-list">
          <div class="data-list-item">
            <p class="list-item-title">粉丝数</p>
            <h2>{{ store.userInfo.fansNum }}</h2>
          </div>
          <div class="data-list-item">
            <p class="list-item-title">主页访客</p>
            <h2>{{ store.userInfo.vistorNum }}</h2>
          </div>
          <div class="data-list-item">
            <p class="list-item-title">总互动数</p>
            <h2>{{ Number(store.userInfo.interactNum).toLocaleString() }}</h2>
          </div>
        </div>
        <sub-title>最新笔记</sub-title>
        <div class="new-note-list">
          <div v-for="item in data.list" :key="item._id" class="new-note-item">
            <img
              class="note-cover"
              :src="item.imageUrl.replace('https', 'http')"
              alt=""
            />
            <div class="new-note-detail">
              <p>{{ item.title }}</p>
              <p class="sub-info">发布日期：{{ item.date }}</p>
              <p class="sub-info">浏览量：{{ item.viewNum }}</p>
              <p class="sub-info">互动量：{{ item.interactNum }}</p>
            </div>
          </div>
          <!-- <div class="new-note-item">
            <img
              class="note-cover"
              src="https://pica.zhimg.com/v2-cc96b4686e3fe0bea27b397f8f2cb500_1440w.jpg?source=172ae18b"
              alt=""
            />
            <div class="new-note-detail">
              <p>H5前端性能优化图鉴</p>
              <p class="sub-info">发布日期：2022-05-18</p>
              <p class="sub-info">浏览量：12345</p>
              <p class="sub-info">互动量：12</p>
            </div>
          </div> -->
        </div>
      </div>
      <div class="bottom-area">
        <sub-title>广告区</sub-title>
        <div class="bottom-card">
          <h2>🎉🎉🎉这里是熊猫猫！</h2>
          <p>欢迎关注我的小红书频道哦~</p>
        </div>
      </div>
    </div>
    <div class="right-side">
      <sub-title>熊猫猫的作品</sub-title>
      <div class="list">
        <div v-for="(note, index) in notes" :key="note.link" class="list-item">
          <div class="number" :style="index < 3 ? hoterStyle : commonStyle">
            {{ index + 1 }}
          </div>
          <div>
            <a target="_blank" :href="note.link">
              <div class="note-name">{{ note.text }}</div>
            </a>
            <div class="hot-num">热度：{{ note.hot }}+</div>
          </div>
        </div>
      </div>
      <div class="more">更多 ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import useCounterStore from '@/hooks/useUser'
import { notes } from '@/constants/note'
import SubTitle from '@/components/SubTitle.vue'
import { getNoteList } from '@/api/note'
import { Toast } from '@/utils/toast'

const hoterStyle = { background: '#f2b557' }
const commonStyle = { background: '#cbcbcb' }

const store = useCounterStore()
const data = reactive<any>({
  list: [],
})

onMounted(async () => {
  const res = await getNoteList({
    pageNum: 1,
    pageSize: 2,
  })
  if (res.code === 0) {
    data.list = res.data.model.data || []
  } else {
    Toast.show('查询笔记失败')
  }
})
</script>
<style scoped lang="less">
.admin-index-wrapper {
  background: #eef0f6;
  box-sizing: border-box;
  padding: 16px 12px;
  display: flex;

  .left-side {
    flex: 1;
    min-width: 750px;
    margin-right: 12px;

    .top-data {
      width: 100%;
      background: white;
      height: 150px;
      border-radius: 12px;
      padding: 14px 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .avatar {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-right: 24px;
      }

      .user-desc {
        p {
          margin: 6px 0;
        }

        .sub-text {
          font-size: 14px;
          color: #999;
        }
      }
    }

    .data-area {
      margin-top: 24px;
      width: 100%;
      background: white;
      height: 420px;
      border-radius: 12px;
      padding: 14px 20px;
      box-sizing: border-box;

      .data-list {
        width: 100%;
        height: 100px;
        margin: 30px 0;
        display: flex;

        .data-list-item {
          background: #fafafa;
          flex: 1;
          margin-right: 20px;
          padding: 20px;

          .list-item-title {
            font-size: 14px;
            color: #888;
            margin-bottom: 8px;
          }
        }
      }

      .new-note-list {
        width: 100%;
        margin-top: 24px;
        display: flex;

        .new-note-item {
          display: flex;
          flex: 1;

          .note-cover {
            width: 120px;
            height: 120px;
            border-radius: 12px;
            object-fit: cover;
          }

          .new-note-detail {
            margin-left: 24px;

            p {
              margin-bottom: 6px;
            }

            .sub-info {
              font-size: 14px;
              color: #888;
            }
          }
        }
      }
    }

    .bottom-area {
      width: 100%;
      background: white;
      height: 200px;
      margin-top: 24px;
      border-radius: 12px;
      padding: 14px 20px;
      box-sizing: border-box;

      .bottom-card {
        width: 100%;
        margin-top: 16px;
        height: 100px;
        background: #eb5d2a;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 8px;
      }
    }
  }

  .right-side {
    width: 300px;
    background: white;
    border-radius: 12px;
    padding: 20px 20px;

    .list {
      width: 100%;
      margin-top: 24px;

      .list-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;

        a {
          text-decoration: none;
          color: black;
        }

        .number {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          background: #f2b557;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30%;
          font-size: 12px;
          margin-right: 10px;
        }

        .note-name {
          font-size: 14px;
          overflow: hidden;
          width: 275px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .hot-num {
          font-size: 12px;
          margin-top: 6px;
          color: #666;
        }
      }
    }

    .more {
      font-size: 14px;
      color: #cbcbcb;
    }
  }
}
</style>
