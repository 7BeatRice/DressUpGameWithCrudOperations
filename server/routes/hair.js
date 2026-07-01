import express from 'express'
import hairController from '../controllers/hair.js'

const router = express.Router()

router.get('/:allhairs', hairController.getHairs )
router.get('/hair/:id', hairController.getHairById)

export default router