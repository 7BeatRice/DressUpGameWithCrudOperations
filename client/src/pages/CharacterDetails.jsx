import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'

import CharacterApi from '../services/CharacterApi.jsx'
import SkinApi from '../services/SkinApi.jsx'
import HairAPI from '../services/HairAPI.jsx'
import DressApi from '../services/DressApi.jsx'
import TopAPI from '../services/TopAPI.jsx'
import BottomAPI from '../services/BottomAPI.jsx'
import '../css/characterDetails.css'

const CharacterDetails = () => {

    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)

    // load the character then look up the name and image of each equipped item
    useEffect(() => {
        const loadCharacter = async () => {
            setLoading(true)
            const base = await CharacterApi.getCharacterById(id)

            if (!base) {
                setLoading(false)
                return
            }

            const skin = base.skin_id ? await SkinApi.getSkinById(base.skin_id) : null
            const hair = base.hair_id ? await HairAPI.getHairById(base.hair_id) : null
            const dress = base.dress_id ? await DressApi.getDressById(base.dress_id) : null
            const top = base.top_id ? await TopAPI.getTopById(base.top_id) : null
            const bottom = base.bottom_id ? await BottomAPI.getBottomById(base.bottom_id) : null

            setCharacter({ ...base, skin, hair, dress, top, bottom })
            setLoading(false)
        }

        loadCharacter()
    }, [id])

    if (loading) {
        return <div>loading</div>
    }

    if (!character) {
        return <div>character not found</div>
    }

    return (
        <div className='character-details'>

            <div className='character-preview'>
            {character.skin && (
                <img 
                    className="layer" 
                    src={character.skin.image.startsWith('/') ? character.skin.image : `/${character.skin.image}`} 
                    alt="skin" 
                />
            )}
            {character.bottom && (
                <img 
                    className="layer" 
                    src={character.bottom.image.startsWith('/') ? character.bottom.image : `/${character.bottom.image}`} 
                    alt="bottom" 
                />
            )}
            {character.top && (
                <img 
                    className="layer" 
                    src={character.top.image.startsWith('/') ? character.top.image : `/${character.top.image}`} 
                    alt="top" 
                />
            )}
            {character.dress && (
                <img 
                    className="layer" 
                    src={character.dress.image.startsWith('/') ? character.dress.image : `/${character.dress.image}`} 
                    alt="dress" 
                />
            )}
            {character.hair && (
                <img 
                    className="layer" 
                    src={character.hair.image.startsWith('/') ? character.hair.image : `/${character.hair.image}`} 
                    alt="hair" 
                />
            )}
        </div>

            <div className='character-attributes'>
                <h2>{character.name}</h2>
                <p>skin tone: {character.skin ? character.skin.name : 'none'}</p>
                <p>hair: {character.hair ? character.hair.name : 'none'}</p>
                <p>dress: {character.dress ? character.dress.name : 'none'}</p>
                <p>top: {character.top ? character.top.name : 'none'}</p>
                <p>bottom: {character.bottom ? character.bottom.name : 'none'}</p>
            </div>

        </div>
    )
}

export default CharacterDetails