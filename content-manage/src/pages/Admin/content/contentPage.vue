<template>
  <div class="admin-content-wrapper">
    <div class="content-inner">
      <el-breadcrumb separator="/" :style="{ marginBottom: '16px' }">
        <el-breadcrumb-item>创作者平台</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <CommonForm class="form" :form="form" :config="config" :fields="fields" />
      <div class="form-bottom">
        <el-button type="primary" size="large" round @click="onSubmit"
          >查询</el-button
        >
        <el-button size="large" round @click="onReset">重置</el-button>
      </div>
      <div ref="wrapperRef" class="table-area">
        <el-table :data="dataSource.list" size="large" :row-style="rowStyle">
          <el-table-column fixed type="index" width="70" />
          <el-table-column prop="_id" label="内容 ID" width="180" />
          <el-table-column prop="title" label="标题" width="180" />
          <el-table-column prop="date" label="创建日期" width="180" />
          <el-table-column prop="topic" label="话题" width="180">
            <template #default="scope">
              <el-tag class="mx-1" size="large">{{ scope.row.topic }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="imageUrl" label="封面图" width="180">
            <template #default="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.imageUrl.replace('https', 'http')"
                :preview-src-list="[
                  scope.row.imageUrl.replace('https', 'http'),
                ]"
                :zoom-rate="1.2"
                :preview-teleported="true"
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column prop="isPrivate" label="是否隐私" width="150">
            <template #default="scope">
              {{ scope.row.isPrivate ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="viewNum" label="浏览数" width="150" />
          <el-table-column prop="interactNum" label="互动数" width="150" />
          <el-table-column fixed="right" label="操作区" width="180">
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-popconfirm
                title="确认要删除这条笔记吗"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-area">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="dataSource.total"
        :page-size="paginationInfo.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import CommonForm from '@/components/CommonForm.vue'
import { getDate } from '@/utils/day'
import { config, fields } from './config'
import { Toast } from '@/utils/toast'
import { deleteNote, getNoteList } from '@/api/note'
import useQuery from '@/hooks/useQuery'

const rowStyle = {
  height: '66px',
}

const DefaultForm = {
  _id: undefined,
  topic: undefined,
  date: undefined,
  isPrivate: undefined,
  status: undefined,
}
const DefaultPagination = {
  pageNum: 1,
  pageSize: 10,
}
const router = useRouter()
const dataSource = reactive({
  list: [] as any[],
  total: 0,
})

const getData = async (params: Record<string, any>) => {
  if (params.date) {
    params.date = getDate(form.date as unknown as Date)
  }
  const res = await getNoteList({ ...params, ...paginationInfo })
  if (res.code === 0) {
    dataSource.list = res.data.model.data || []
    dataSource.total = res.data.model.total || 0
  } else {
    Toast.show('查询失败')
  }
}

const { form, paginationInfo, onSubmit, onReset, handleCurrentChange } =
  useQuery({
    getData,
    DefaultForm,
    DefaultPagination,
  })

onMounted(async () => {
  await getData({})
})

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  router.push(`/admin/note?id=${row._id}`)
}
const handleDelete = async (index: number, row: any) => {
  console.log(index, row)
  const res = await deleteNote({
    _id: row._id,
  })
  if (res.code === 0) {
    Toast.success('笔记删除成功')
    Object.assign(paginationInfo, DefaultPagination)
    await getData({})
  } else {
    Toast.error(res.message)
  }
}
</script>
<style scoped lang="less">
.admin-content-wrapper {
  background: #eef0f6;
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh - 60px);

  .content-inner {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px 12px;
    overflow-y: auto;

    .form {
      width: 100%;
      height: 130px;
      padding: 20px;
      box-sizing: border-box;
      background: white;
    }

    .form-bottom {
      width: 100%;
      padding: 12px 60px;
      box-sizing: border-box;
      display: flex;
      background: white;
      justify-content: flex-end;
    }

    .table-area {
      margin-top: 24px;
      margin-bottom: 90px;
    }
  }

  .bottom-area {
    position: fixed;
    z-index: 10;
    background: white;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 2px -2px 5px #ddd;
    width: 100%;
    height: 86px;
    background: white;
    box-sizing: border-box;
    padding-right: 240px;
  }
}
</style>
