import express from 'express'
import bottomController from '../controllers/bottom.js'

const router = express.Router()

router.get('/:allbottoms', bottomController.getBottoms )
router.get('/bottom/:id', bottomController.getBottomById)

export default router