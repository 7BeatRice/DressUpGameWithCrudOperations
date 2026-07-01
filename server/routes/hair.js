import express from 'express'
import hairController from '../controllers/hair.js'

const router = express.Router()

router.get('/', hairController.getHairs )
router.get('/:id', hairController.getHairById)

export default router