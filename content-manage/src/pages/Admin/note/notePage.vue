<template>
  <div class="admin-note-wrapper">
    <div class="pub-wrapper">
      <sub-title>发布笔记</sub-title>
      <div class="pub-inner">
        <p class="pub-innter-title">封面图编辑</p>
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8000/note/upload"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.imageUrl"
            :src="form.imageUrl.replace('https', 'http')"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <p class="pub-innter-title">内容编辑</p>
        <CommonForm
          class="form"
          :form="form"
          :config="config"
          :fields="fields"
        />
        <p class="pub-innter-title">发布设置</p>
        <CommonForm
          class="form"
          :form="form"
          :config="subConfig"
          :fields="subFields"
        />
      </div>
      <div class="pub-bottom">
        <el-button class="pb-btn" type="primary" @click="onSubmit"
          >发布</el-button
        >
        <el-button class="pb-btn" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import CommonForm from '@/components/CommonForm.vue'
import SubTitle from '@/components/SubTitle.vue'
import { config, fields, subConfig, subFields } from './config'
import { STORAGE } from '@/constants'
import { Toast } from '@/utils/toast'
import { getNoteList, editNote, submitNote } from '@/api/note'

const DefaultForm = {
  _id: undefined,
  title: '',
  content: '',
  imageUrl: '',
  isPrivate: false,
  topic: '',
}

const form = reactive<any>({ ...DefaultForm })
const token = localStorage.getItem(STORAGE.TOKEN)
const headers = { Authorization: token }
const route = useRoute()
const router = useRouter()

watch(
  () => route.fullPath,
  () => {
    console.log(route.query.id)
    if (!route.query.id) {
      setTimeout(() => {
        Object.assign(form, DefaultForm)
      }, 0)
      console.log(form)
    }
  }
)

onMounted(async () => {
  if (!route.query.id) return
  const res = await getNoteList({ _id: route.query.id })
  if (res.code === 0) {
    const data = (res.data.model.data || [])[0]
    Object.keys(form).forEach((key: string) => {
      form[key] = data[key]
    })
  } else {
    Toast.error('获取数据失败')
  }
})

const onSubmit = async () => {
  const isEdit = route.query.id
  if (!form.title || !form.content || !form.imageUrl) {
    Toast.error('填写信息不完整')
    return
  } else {
    const handleFn = isEdit ? editNote : submitNote
    const res = await handleFn(form)
    if (res.code === 0) {
      Toast.success(`${isEdit ? '修改' : '创建'}笔记成功`)
      setTimeout(() => {
        router.push('/admin/content')
      }, 2000)
    }
  }
}

const back = () => {
  router.back()
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  if (!uploadFile.raw) return
  if (response.code !== 0) {
    Toast.error('上传封面图失败')
  }
  form.imageUrl = response.data.model
  console.log('response', response)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    Toast.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    Toast.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>
<style scoped lang="less">
.admin-note-wrapper {
  background: #eef0f6;
  box-sizing: border-box;
  padding: 20px 24px;
  display: flex;
  justify-content: center;

  .pub-wrapper {
    width: 60%;
    height: 740px;
    border-radius: 16px;
    padding: 20px;
    background: white;

    .pub-inner {
      padding: 20px 20px;

      .pub-innter-title {
        margin-bottom: 20px;
      }
    }

    .pub-bottom {
      display: flex;
      margin: 0 20px;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
