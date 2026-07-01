import express from 'express'
import dressController from '../controllers/dress.js'

const router = express.Router()

router.get('/', dressController.getDresses )
console.log("In dresses routes")
router.get('/:id', dressController.getDressById)

export default router