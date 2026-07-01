import {pool} from '../config/database.js'

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
        const selectQuery = 'SELECT * FROM characters WHERE id=$1'
        const characterId = req.params.id
        const result = await pool.query(selectQuery, [characterId])
        res.status(200).json(result.rows[0])
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const createCharacter = async(req, res) => {
    try{
        const {name, skin_id, hair_id, dress_id, top_id, bottom_id} = req.body
        const createQuery = 'INSERT INTO characters (name, skin_id, hair_id, dress_id, top_id, bottom_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
        const result = await pool.query(createQuery, [name, skin_id, hair_id, dress_id, top_id, bottom_id])
        res.status(200).json(result.rows[0])
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const updateCharacter = async(req, res) => {
    try{
        const id = req.params.id
        const {name, skin_id, hair_id, dress_id, top_id, bottom_id} = req.body
        const updateQuery = 'UPDATE characters SET name=$1, skin_id=$2, hair_id=$3, dress_id=$4, top_id=$5, bottom_id=$6 WHERE id=$7 RETURNING *'
        const result = await pool.query(updateQuery, [name, skin_id, hair_id, dress_id, top_id, bottom_id, id])
        res.status(200).json(result.rows[0])
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const deleteCharacter = async(req, res) => {
    try{
        const id = req.params.id
        const deleteQuery = 'DELETE FROM characters WHERE id = $1 RETURNING *'
        const result = await pool.query(deleteQuery, [id])
        res.status(200).json(result.rows[0])
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

export default {getCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter}