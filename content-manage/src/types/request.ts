export const enum Code {
  Success = 0,
  Error = -1,
  Denied = 1,
}

export interface CommonRes<Data = any> {
  code: Code
  data: {
    model: Data
  }
  message: string
}
