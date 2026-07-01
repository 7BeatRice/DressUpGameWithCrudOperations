import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

import characterRouter from './routes/character.js'
import bottomRouter from './routes/bottoms.js'
import dressRouter from './routes/dress.js'
import hairRouter from './routes/hair.js'
import topRouter from './routes/top.js'
import skinRouter from './routes/skin.js'



dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/characters', characterRouter)
app.use('/skins', skinRouter)
app.use('/hairs', hairRouter)
app.use('/tops', topRouter)
app.use('/bottoms', bottomRouter)
app.use('/dresses', dressRouter)


if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})