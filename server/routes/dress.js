import express from 'express'
import dressController from '../controllers/dress.js'

const router = express.Router()

router.get('/', dressController.getDresses )
router.get('/:id', dressController.getDressById)

export default router