import express from 'express'
import multer from 'multer'
import { commonRes, errorRes } from '@/utils/commonRes'
import handleError from '@/utils/handleError'
import {
  handleUploadPic,
  handleAddNote,
  handleGetNoteList,
  handleEditNote,
  handleDeleteNote,
} from '@/controller/note.controller'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/') // 保存图片路径
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  },
})

const router = express.Router()
const upload = multer({ storage })

/** 上传图片 */
router.post('/upload', upload.single('file'), async (req, res) => {
  const [model, error] = await handleError(handleUploadPic, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

router.get('/getnote', async (req, res) => {
  const [model, error] = await handleError(handleGetNoteList, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

router.post('/addNewNote', async (req, res) => {
  const [model, error] = await handleError(handleAddNote, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

router.post('/editNote', async (req, res) => {
  const [model, error] = await handleError(handleEditNote, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

router.post('/deleteNote', async (req, res) => {
  const [model, error] = await handleError(handleDeleteNote, req, res)
  return error
    ? errorRes(res, {}, JSON.stringify(error))
    : commonRes(res, { model })
})

export default router
