export const enum FieldType {
  Input = 'input',
  Password = 'password',
  Select = 'select',
  Textarea = 'textarea',
  Switch = 'switch',
  DatePicker = 'date-picker',
}

export interface IFieldConfig {
  type: FieldType
  label: string
  name: string
  placeholder?: string
  extra?: {
    options?: {
      label: string
      value: string | number
    }[]
    rows?: number
  }
}

export interface IConfig {
  inline?: boolean
  labelWidth?: string
}
