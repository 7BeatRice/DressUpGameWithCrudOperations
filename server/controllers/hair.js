import {pool} from '../config/database.js'


const getHairs = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM hairs ORDER BY id ASC')
        res.status(200).json(result.rows)
    }
    catch(error){
        res.status(409).json({error: error.message})

    }
}

const getHairById = async (req, res) => {
    try{
        const selectQuery = 'SELECT * FROM hairs WHERE id=$1'
           const id = req.params.id
            const result = await pool.query(selectQuery, [id])
            res.status(200).json(result.rows[0] )
            }
    catch (error){
        res.status(400).json({error: error.message})

    }
  
}
export default {getHairs, getHairById}