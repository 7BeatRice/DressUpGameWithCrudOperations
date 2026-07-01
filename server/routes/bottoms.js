import express from 'express'
import bottomController from '../controllers/bottom.js'

const router = express.Router()

router.get('/', bottomController.getBottoms )
router.get('/:id', bottomController.getBottomById)

export default router