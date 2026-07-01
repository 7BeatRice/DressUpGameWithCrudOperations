import express from 'express'
import topController from '../controllers/top.js'

const router = express.Router()

router.get('/:alltops', topController.getTops )
router.get('/top/:id', topController.getTopById)

export default router