import { reactive } from 'vue'

interface IProps {
  getData: (params: Record<string, any>) => Promise<void>
  DefaultForm: Record<string, any>
  DefaultPagination: Record<string, any>
}

export default function useQuery({
  getData,
  DefaultForm,
  DefaultPagination,
}: IProps) {
  const form = reactive<Record<string, any>>({ ...DefaultForm })
  const paginationInfo = reactive({ ...DefaultPagination })

  const onSubmit = async () => {
    await getData(form)
  }

  const onReset = async () => {
    Object.assign(form, DefaultForm)
    await getData(form)
  }

  const handleCurrentChange = async (val: number) => {
    paginationInfo.pageNum = val
    await onSubmit()
  }

  return {
    form,
    paginationInfo,
    onSubmit,
    onReset,
    handleCurrentChange,
  }
}
