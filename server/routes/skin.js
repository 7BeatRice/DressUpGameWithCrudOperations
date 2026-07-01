import express from 'express'
import skinController from '../controllers/skin.js'

const router = express.Router()

router.get('/', skinController.getSkins )
router.get('/:id', skinController.getSkinById)

export default router