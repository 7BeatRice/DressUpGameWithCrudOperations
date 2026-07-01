import {pool} from '../config/database.js'


const getDresses = async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM dresses ORDER BY id ASC')
        res.status(200).json(result.rows)
    }
    catch(error){
        res.status(409).json({error: error.message})

    }
}

const getDressById = async (req, res) => {
    try{
        const selectQuery = 'SELECT * FROM Dresses WHERE id=$1'
           const id = req.params.id
            const result = await pool.query(selectQuery, [id])
            res.status(200).json(result.rows[0] )
            }
    catch (error){
        res.status(400).json({error: error.message})

    }
  
}
export default {getDresses, getDressById}