import { TOPIC_LIST } from '@/constants/topic'
import { IFieldConfig, FieldType } from '@/types/form'

export const fields: IFieldConfig[] = [
  {
    type: FieldType.Input,
    label: '',
    name: 'title',
    placeholder: '填写标题，可能会有更多赞哦~',
  },
  {
    type: FieldType.Textarea,
    label: '',
    name: 'content',
    placeholder: '请填写正文',
    extra: {
      rows: 4,
    },
  },
]

export const config = {
  inline: false,
  labelWidth: '0px',
}

export const subFields: IFieldConfig[] = [
  {
    type: FieldType.Switch,
    label: '笔记是否仅自己可见',
    name: 'isPrivate',
  },
  {
    type: FieldType.Select,
    label: '参与的话题',
    name: 'topic',
    placeholder: '请选择话题',
    extra: {
      options: TOPIC_LIST,
    },
  },
]

export const subConfig = {
  inline: false,
  labelWidth: '150px',
}
