<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form
    :inline="config.inline"
    :model="form"
    :label-width="config.labelWidth"
    label-position="left"
    size="large"
  >
    <el-form-item
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
    >
      <el-input
        v-if="field.type === FieldType.Input"
        v-model="form[field.name]"
        :placeholder="field.placeholder"
      />
      <el-input
        v-if="field.type === FieldType.Password"
        v-model="form[field.name]"
        :placeholder="field.placeholder"
        type="password"
        show-password
      />
      <el-input
        v-if="field.type === FieldType.Textarea"
        v-model="form[field.name]"
        :rows="field?.extra?.rows"
        :placeholder="field.placeholder"
        type="textarea"
      />
      <el-select
        v-if="field.type === FieldType.Select"
        v-model="form[field.name]"
        :placeholder="field.placeholder"
      >
        <el-option
          v-for="item in field?.extra?.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-switch
        v-if="field.type === FieldType.Switch"
        v-model="form[field.name]"
      />
      <el-date-picker
        v-if="field.type === FieldType.DatePicker"
        v-model="form[field.name]"
        type="date"
        :placeholder="field.placeholder"
      />
    </el-form-item>
    <el-form-item v-if="onSubmit">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { FieldType, IFieldConfig, IConfig } from '@/types/form'

interface IProps {
  form: Record<string, any>
  fields: IFieldConfig[]
  config: IConfig
  onSubmit?: () => void
}

defineProps<IProps>()
</script>
