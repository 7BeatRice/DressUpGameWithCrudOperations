import {pool} from '../config/database'

const getCharacters = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM characters ORDER BY id ASC')
        res.status(200).json(result.rows)
    }
    catch(error){
        res.status(409).json({error: error.message})

    }
}

const getCharacterById = async (req, res) => {
    try{
        const selectQuery = 'SELECT * FROM gifts WHERE id=$1'
           const characterId = req.params.id
            const result = await pool.query(selectQuery, [characterId])
            res.status(200).json(result.rows[0] )
            }
    catch (error){
        res.status(400).json({error: error.message})

    }
  
}
const createCharacter = async(req, res) => {
     try{
            const {id, name, skin_id, hair_id, dress_id, top_id, bottom_id} = req.body 
            const createQuery = 'INSERT INTO characters (id, name, skin_id, hair_id, dress_id, top_id, bottom_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *'
            const characterId = req.params.id
            const result = await pool.query(createQuery, [id, name, skin_id, hair_id, dress_id, top_id, bottom_id])
            res.status(200).json(result.rows[0])
            }
    catch (error){
        res.status(400).json({error: error.message})

    }

}

const updateCharacter = async(req, res) => {
     try{
            const  id = req.params.id 
            const updateQuery = ' UPDATE characters SET (name, skin_id, hair_id, dress_id, top_id, bottom_id) VALUES ($1, $2, $3, $4, $5, $6, $7) WHERE id = $8'
            const result = await pool.query(updateQuery, [name, skin_id, hair_id, dress_id, top_id, bottom_id, id])
            res.status(200).json(result.rows[0])
            }
    catch (error){
        res.status(400).json({error: error.message})

    }

}

const deleteCharacter = async(req, res) => {
     try{
            const  id = req.params.id 
            const deleteQuery = 'DELETE FROM characters WHERE id = $1'
            const result = await pool.query(updateQuery, [id])
            res.status(200).json(result.rows[0])
            }
    catch (error){
        res.status(400).json({error: error.message})

    }

}

export default {getCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter}