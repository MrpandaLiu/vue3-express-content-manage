import { Request, Response } from 'express'
import jwt from '@/utils/jwt'
import NoteService from '@/service/note.service'
import { getDate } from '@/utils/day'

const noteService = new NoteService()

const enum Status {
  Fail = -1,
  Success = 0,
  Pending = 1,
}

export const handleUploadPic = async (req: Request) => {
  if (!req.file) throw Error('no such file')
  const file = req.file
  return `https://localhost:8000/` + file?.filename
}

export const handleAddNote = async (req: Request) => {
  const token = req.headers.authorization || ''
  const { username } = jwt.getPayload(token)
  const ret = await noteService.addNoteData({
    username,
    ...req.body,
    date: getDate(),
    status: Status.Pending,
    interactNum: 0,
    viewNum: new Date().getSeconds(), // 随机生成一个
  })
  if (ret === 0) {
    return ret
  } else {
    throw new Error('添加笔记失败')
  }
}

export const handleGetNoteList = async (req: Request) => {
  const token = req.headers.authorization || ''
  const { username } = jwt.getPayload(token)
  const _params: any = req.query
  if (_params.isPrivate)
    _params.isPrivate = _params.isPrivate === '1' ? true : false
  if (_params.status) _params.status = Number(_params.status)
  const ret = await noteService.getNoteList({
    username,
    ..._params,
  })
  if (ret.total > 0) {
    return ret
  } else {
    throw new Error('获取用户笔记失败')
  }
}

export const handleEditNote = async (req: Request) => {
  const token = req.headers.authorization || ''
  const { username } = jwt.getPayload(token)
  const ret = await noteService.editNoteData({
    username,
    ...req.body,
  })
  if (ret === 0) {
    return ret
  } else {
    throw new Error('修改笔记失败')
  }
}

export const handleDeleteNote = async (req: Request) => {
  const ret = await noteService.deleteNote(req.body._id)
  if (ret === 0) {
    return ret
  } else {
    throw new Error('修改笔记失败')
  }
}
