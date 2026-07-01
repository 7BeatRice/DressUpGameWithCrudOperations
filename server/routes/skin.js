import express from 'express'
import skinController from '../controllers/skin.js'

const router = express.Router()

router.get('/:allskins', skinController.getSkins )
router.get('/skin/:id', skinController.getSkinById)

export default router