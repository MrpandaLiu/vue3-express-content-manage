const CNArr = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]

const getZero = (num: number) => (num < 10 ? `0${num}` : `${num}`)

export function getDate(time: string | Date) {
  const date = new Date(time)
  console.log(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dates = date.getDate()
  return `${year}-${month}-${dates}`
}
