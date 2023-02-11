import Meowgoose from '@/utils/meowgoose'

interface IAddNoteData {
  username: string
  [key: string]: any
}

class NoteService {
  private connect: Meowgoose

  constructor() {
    this.connect = new Meowgoose({
      table: 'note',
    })
  }

  public async addNoteData(params: IAddNoteData) {
    const res = await this.connect.insert(params)
    return res
  }

  public async getNoteList(_params: Record<string, any>) {
    const { pageNum = 1, pageSize = 1, ...others } = _params
    const res = await this.connect.select(others)
    return {
      data: res.slice((pageNum - 1) * pageSize, pageNum * pageSize),
      total: res.length,
    }
  }

  public async editNoteData(params: IAddNoteData) {
    const res = await this.connect.update(params)
    return res
  }

  public async deleteNote(_id: string) {
    const res = await this.connect.delete(_id)
    return res
  }
}

export default NoteService
