import { IFieldConfig, FieldType } from '@/types/form'

export const fields: IFieldConfig[] = [
  {
    type: FieldType.Input,
    label: '用户名',
    name: 'username',
    placeholder: '请输入用户名',
  },
  {
    type: FieldType.Password,
    label: '密码',
    name: 'password',
    placeholder: '请输入密码',
  },
]

export const config = {
  inline: false,
  labelWidth: '60px',
}
