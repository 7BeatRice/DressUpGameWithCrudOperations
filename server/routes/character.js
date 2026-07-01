import express from 'express'
import characterController from '../controllers/characters.js'

const router = express.Router()

router.get('/', characterController.getCharacters )
router.get('/:id', characterController.getCharacterById)

router.post('/', characterController.createCharacter)
router.patch('/edit/:id', characterController.updateCharacter)
router.delete('/edit/:id', characterController.deleteCharacter)

export default router