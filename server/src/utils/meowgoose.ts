import fs from 'fs'
import path from 'path'
import cryptoRandomString from 'crypto-random-string'
import log from './logger'

const readTable = (tableName: string) => {
  try {
    const fileStr = fs.readFileSync(
      path.resolve(process.cwd(), `./db/${tableName}.json`),
      'utf-8'
    )
    return JSON.parse(fileStr) as any[]
  } catch (e) {
    log.error('read table error', e)
    return []
  }
}

const writeTable = (tableName: string, list: any[]) => {
  try {
    fs.writeFileSync(
      path.resolve(process.cwd(), `./db/${tableName}.json`),
      JSON.stringify(list)
    )
    return 0
  } catch (e) {
    log.error('read table error', e)
    return -1
  }
}

interface IProps {
  table: string
}

class Meowgoose {
  private table = ''

  constructor(props: IProps) {
    const { table } = props
    this.table = table
  }

  public async select(params: Record<string, any>) {
    const list = readTable(this.table)
    return list.filter((item) => {
      const isOk = Object.keys(params).every((key) => {
        if (params[key]) {
          return item[key] === params[key]
        } else {
          return true
        }
      })
      return isOk
    })
  }

  public async insert(params: Record<string, any>) {
    const list = readTable(this.table)
    list.unshift({
      _id: cryptoRandomString({ length: 16 }),
      ...params,
    })
    return writeTable(this.table, list)
  }

  public async update(params: Record<string, any>) {
    const list = readTable(this.table)
    const res = list.map((item) => {
      if (item._id === params._id) {
        item = {
          ...item,
          ...params,
        }
      }
      return item
    })
    return writeTable(this.table, res)
  }

  public async delete(_id: string) {
    const list = readTable(this.table)
    const res = list.filter((item) => {
      return item._id !== _id
    })
    return writeTable(this.table, res)
  }
}

export default Meowgoose
