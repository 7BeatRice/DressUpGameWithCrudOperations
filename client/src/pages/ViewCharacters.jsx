import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CharacterApi from '../services/CharacterApi.jsx'
import SkinApi from '../services/SkinApi.jsx'
import HairAPI from '../services/HairAPI.jsx'
import DressApi from '../services/DressApi.jsx'
import TopAPI from '../services/TopAPI.jsx'
import BottomAPI from '../services/BottomAPI.jsx'
import '../css/viewCharacter.css'

const ViewCharacters = () => {

    const [characters, setCharacters] = useState([])
    const navigate = useNavigate()

    // load every character then look up the name of each equipped item
    useEffect(() => {
        const loadCharacters = async () => {
            const allCharacters = await CharacterApi.getAllCharacters()
            if (!allCharacters) return

            const detailed = await Promise.all(
                allCharacters.map(async (character) => {
                    const skin = character.skin_id ? await SkinApi.getSkinById(character.skin_id) : null
                    const hair = character.hair_id ? await HairAPI.getHairById(character.hair_id) : null
                    const dress = character.dress_id ? await DressApi.getDressById(character.dress_id) : null
                    const top = character.top_id ? await TopAPI.getTopById(character.top_id) : null
                    const bottom = character.bottom_id ? await BottomAPI.getBottomById(character.bottom_id) : null

                    return { ...character, skin, hair, dress, top, bottom }
                })
            )

            setCharacters(detailed)
        }

        loadCharacters()
    }, [])

    return (
        <div className="view-characters">
            {characters.map((character) => (
                <div className="character-card" key={character.id}>
                    <h3 className="character-name">{character.name}</h3>
                    <button id = "editButton" onClick={() => navigate(`/characters/edit/${character.id}`)}>
                        ⋮
                    </button>
                    <p>skin tone: {character.skin ? character.skin.name : 'none'}</p>
                    <p>hair: {character.hair ? character.hair.name : 'none'}</p>
                    <p>dress: {character.dress ? character.dress.name : 'none'}</p>
                    <p>top: {character.top ? character.top.name : 'none'}</p>
                    <p>bottom: {character.bottom ? character.bottom.name : 'none'}</p>
                    <button onClick={() => navigate(`/characters/${character.id}`)}>details</button>
                </div>
            ))}
        </div>
    )
}

export default ViewCharacters