import { CommonRes } from '@/types/request'
import { get, post } from '@/utils/request'

interface GetNoteListRequest {
  [key: string]: any
}

interface GetNoteListResponse {
  data: any[]
  total: number
}

export const getNoteList = async (params: GetNoteListRequest) => {
  return get<GetNoteListRequest, CommonRes<GetNoteListResponse>>(
    '/note/getnote',
    params
  )
}

interface submitNoteRequest {
  title: string
  content: string
  imageUrl: string
  isPrivate: boolean
}

interface submitNoteResponse {
  result: number
}

export const submitNote = async (data: submitNoteRequest) => {
  return post<submitNoteRequest, CommonRes<submitNoteResponse>>(
    '/note/addNewNote',
    data
  )
}

export const editNote = async (data: submitNoteRequest) => {
  return post<submitNoteRequest, CommonRes<submitNoteResponse>>(
    '/note/editNote',
    data
  )
}

interface deleteNoteRequest {
  _id: string
}

interface submitNoteResponse {
  result: number
}

export const deleteNote = async (data: deleteNoteRequest) => {
  return post<deleteNoteRequest, CommonRes<submitNoteResponse>>(
    '/note/deleteNote',
    data
  )
}
