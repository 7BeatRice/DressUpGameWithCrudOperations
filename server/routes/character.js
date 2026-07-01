import express from 'express'
import characterController from '../controllers/characters.js'

const router = express.Router()

router.get('/:allCharacters', characterController.getCharacters )
router.get('/character/:id', characterController.getCharacterById)

router.post('/', characterController.createCharacter)
router.patch('/:id', characterController.updateCharacter)
router.delete('/id', characterController.deleteCharacter)

export default router