import Meowgoose from '@/utils/meowgoose'

interface IGetUserInfo {
  username: string
  password?: string
}

class UserService {
  private connect: Meowgoose

  constructor() {
    this.connect = new Meowgoose({
      table: 'user',
    })
  }

  public async getUserInfo(params: IGetUserInfo) {
    const res = await this.connect.select(params)
    return res
  }
}

export default UserService
