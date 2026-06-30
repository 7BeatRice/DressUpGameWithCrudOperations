import {pool} from './database.js'
import dotenv from 'dotenv'
import hairData from '../data/hair_data.js'
import skinToneData from '../data/skin_tone_data.js'
import topsData from '../data/tops_data.js'
import bottomsData from '../data/bottoms_data.js'
import dressesData from '../data/dresses_data.js'

dotenv.config({path:'../.env'})

const createCharactersTable = async()=>{
    const tableQuery = `
    DROP TABLE IF EXISTS characters;

    CREATE TABLE IF NOT EXISTS characters(
        id Serial PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        skin_id VARCHAR(255) NOT NULL,
        hair_id VARCHAR(255),
        dress_id VARCHAR(255),
        top_id VARCHAR(255),
        bottom_id VARCHAR(255),

        CONSTRAINT FK_CharacterSkin
            FOREIGN KEY (skin_id) REFERENCES skins(id),
        
        CONSTRAINT FK_CharacterHair
            FOREIGN KEY (hair_id) REFERENCES hairs(id),
        
        CONSTRAINT FK_CharacterDress
            FOREIGN KEY (dress_id) REFERENCES dresses(id),
        
        CONSTRAINT FK_CharacterTop
            FOREIGN KEY (top_id) REFERENCES tops(id),

        CONSTRAINT FK_CharacterBottom
            FOREIGN KEY (bottom_id) REFERENCES bottoms(id)
    )

    `
    try{
        const reponse = await pool.query(tableQuery)
        console.log("Characters table successfully created!")
    }
    catch(error){
        console.error("Error creating characters table: errors")
    }
}

const createSkinsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS skins;
    
    CREATE TABLE IF NOT EXISTS skins(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL
    )
    `
    
    try{
        const result = await pool.query(createTableQuery)
        console.log("Skins table created successfully!")
    }
    catch(err){
        console.error('Error creating skins table', err)
    } 

}

const createDressesTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS dresses;
    
    CREATE TABLE IF NOT EXISTS dresses(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL
    )
    `
    
    try{
        const result = await pool.query(createTableQuery)
        console.log("Dresses table created successfully!")
    }
    catch(err){
        console.error('Error creating dresses table', err)
    } 

}

const createTopsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS tops;
    
    CREATE TABLE IF NOT EXISTS tops(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL
    )
    `
    
    try{
        const result = await pool.query(createTableQuery)
        console.log("Tops table created successfully!")
    }
    catch(err){
        console.error('Error creating tops table', err)
    } 

}

const createBottomsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS tops;
    
    CREATE TABLE IF NOT EXISTS bottoms(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL
    )
    `
    
    try{
        const result = await pool.query(createTableQuery)
        console.log("Bottoms table created successfully!")
    }
    catch(err){
        console.error('Error creating tops bottoms', err)
    } 

}

const createHairsTable = async() => {

    const createTableQuery = `
    DROP TABLE IF EXISTS hairs;
    
    CREATE TABLE IF NOT EXISTS hairs(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price VARCHAR(10) NOT NULL
    )
    `

    try{
        const result = await pool.query(createTableQuery)
        console.log("Hairs table created successfully!")
    }
    catch(err){
        console.error('Error creating hairs table', err)
    } 

}

const seedDresses= async() =>{
    await createDressesTable()

    dressesData.forEach((dress) =>{
        const insertQuery = {
        text: 'INSERT INTO dresses (id, name, image, price) VALUES ($1, $2, $3, $4)'
    }
    const values =[
        dress.id,
        dress.name,
        dress.image,
        dress.price
    ]
    pool.query(insertQuery, values, (err, res) =>{
         if (err){
                console.error('Errro inserting dress', err)
                return
            }
            console.log(`${dress.name} added successfully`)
    })

    }
)
    
}


const seedSkins = async() =>{
    await createSkinsTable()

    skinToneData.forEach((skin) =>{
        const insertQuery = {
        text: 'INSERT INTO skins (id, name, image, price) VALUES ($1, $2, $3, $4)'
    }
    const values =[
        skin.id,
        skin.name,
        skin.image,
        skin.price
    ]
    pool.query(insertQuery, values, (err, res) =>{
         if (err){
                console.error('Errro inserting skins', err)
                return
            }
            console.log(`${skin.name} added successfully`)
    })

    }
)
    
}

const seedTops= async() =>{
    await createTopsTable()

    topsData.forEach((top) =>{
        const insertQuery = {
        text: 'INSERT INTO tops (id, name, image, price) VALUES ($1, $2, $3, $4)'
    }
    const values =[
        top.id,
        top.name,
        top.image,
        top.price
    ]
    pool.query(insertQuery, values, (err, res) =>{
         if (err){
                console.error('Errro inserting tops', err)
                return
            }
            console.log(`${top.name} added successfully`)
    })

    }
)
    
}


const seedBottoms= async() =>{
    await createBottomsTable()

    bottomsData.forEach((bottom) =>{
        const insertQuery = {
        text: 'INSERT INTO bottoms (id, name, image, price) VALUES ($1, $2, $3, $4)'
    }
    const values =[
        bottom.id,
        bottom.name,
        bottom.image,
        bottom.price
    ]
    pool.query(insertQuery, values, (err, res) =>{
         if (err){
                console.error('Errro inserting bottoms', err)
                return
            }
            console.log(`${bottom.name} added successfully`)
    })

    }
)
    
}


const seedHairs = async() =>{
    await createHairsTable()

    hairData.forEach((hair) =>{
        const insertQuery = {
        text: 'INSERT INTO hairs (id, name, image, price) VALUES ($1, $2, $3, $4)'
    }
    const values =[
        hair.id,
        hair.name,
        hair.image,
        hair.price
    ]
    pool.query(insertQuery, values, (err, res) =>{
         if (err){
                console.error('Errro inserting hairs', err)
                return
            }
            console.log(`${hair.name} added successfully`)
    })

    }
)
    
}

seedBottoms()
seedDresses()
seedHairs()
seedSkins()
seedTops()