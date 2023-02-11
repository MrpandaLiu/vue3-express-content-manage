import { TOPIC_LIST } from '@/constants/topic'
import { IFieldConfig, FieldType } from '@/types/form'

export const fields: IFieldConfig[] = [
  {
    type: FieldType.Input,
    label: '内容 ID',
    name: '_id',
    placeholder: '请输入内容ID',
  },
  {
    type: FieldType.Select,
    label: '参与话题',
    name: 'topic',
    placeholder: '请选择话题',
    extra: {
      options: TOPIC_LIST,
    },
  },
  {
    type: FieldType.DatePicker,
    label: '创建日期',
    name: 'date',
    placeholder: '请选择创建日期',
  },
  {
    type: FieldType.Select,
    label: '是否隐私',
    name: 'isPrivate',
    placeholder: '请选择是否隐私',
    extra: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '0',
        },
      ],
    },
  },
  {
    type: FieldType.Select,
    label: '审核状态',
    name: 'status',
    placeholder: '请选择审核状态',
    extra: {
      options: [
        {
          label: '未审核',
          value: 1,
        },
        {
          label: '已通过',
          value: 0,
        },
        {
          label: '未通过',
          value: -1,
        },
      ],
    },
  },
]

export const config = {
  inline: true,
  labelWidth: '120px',
}
