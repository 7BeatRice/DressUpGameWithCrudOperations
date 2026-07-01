import express from 'express'
import topController from '../controllers/top.js'

const router = express.Router()

router.get('/', topController.getTops )
router.get('/:id', topController.getTopById)

export default router