import express from 'express'
import dressController from '../controllers/dress.js'

const router = express.Router()

router.get('/:alldresses', dressController.getDresses )
router.get('/dress/:id', dressController.getDressById)

export default router