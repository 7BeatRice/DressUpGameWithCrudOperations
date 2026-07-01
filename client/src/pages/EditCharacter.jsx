import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import '../css/createCharacter.css'

import BottomAPI from '../services/BottomAPI.jsx'
import CharacterApi from '../services/CharacterApi.jsx'
import DressApi from '../services/DressApi.jsx'
import HairAPI from '../services/HairAPI.jsx'
import SkinApi from '../services/SkinApi.jsx'
import TopAPI from '../services/TopAPI.jsx'

import calcPrice from '../utillities/calcPrice.jsx'
import validateInput from '../utillities/validateInput.jsx'

const EditCharacter = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [showDisclaimer, setShowDisclaimer] = useState(true)

    const [defaultBodyImage, setDefaultBodyImage] = useState("")
    const [characterName, setCharacterName] = useState("")

    const [selections, setSelections] = useState({
        skin: null,
        hair: null,
        top: null,
        bottom: null,
        dress: null
    })

    const [openCategory, setOpenCategory] = useState(null)
    const [categoryItems, setCategoryItems] = useState([])
    const [loadingItems, setLoadingItems] = useState(false)

    const [totalPrice, setTotalPrice] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')

    // inform user about selection rules
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDisclaimer(false)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    // load the default base body image once
    useEffect(() => {
        const loadDefaultBody = async () => {
            const defaultSkin = await SkinApi.getSkinById('base_body')
            if (defaultSkin) {
                setDefaultBodyImage(defaultSkin.image)
            }
        }

        loadDefaultBody()
    }, [])

    // load the existing character and rebuild its selections from the foreign keys
    useEffect(() => {
        const loadCharacter = async () => {
            setLoading(true)
            const character = await CharacterApi.getCharacterById(id)

            if (!character) {
                setLoading(false)
                return
            }

            setCharacterName(character.name)

            const skin = character.skin_id ? await SkinApi.getSkinById(character.skin_id) : null
            const hair = character.hair_id ? await HairAPI.getHairById(character.hair_id) : null
            const dress = character.dress_id ? await DressApi.getDressById(character.dress_id) : null
            const top = character.top_id ? await TopAPI.getTopById(character.top_id) : null
            const bottom = character.bottom_id ? await BottomAPI.getBottomById(character.bottom_id) : null

            setSelections({ skin, hair, dress, top, bottom })
            setLoading(false)
        }

        loadCharacter()
    }, [id])

    // fetch items for whichever category panel is open
    useEffect(() => {
        if (!openCategory) {
            setCategoryItems([])
            return
        }

        const fetchItems = async () => {
            setLoadingItems(true)
            let data = []

            if (openCategory === 'skin') data = await SkinApi.getAllSkins()
            if (openCategory === 'hair') data = await HairAPI.getAllHairs()
            if (openCategory === 'top') data = await TopAPI.getAllTops()
            if (openCategory === 'bottom') data = await BottomAPI.getAllBottoms()
            if (openCategory === 'dress') data = await DressApi.getAllDresses()

            setCategoryItems(data || [])
            setLoadingItems(false)
        }

        fetchItems()
    }, [openCategory])

    // recalculate price whenever selections change
    useEffect(() => {
        setTotalPrice(calcPrice(selections))
    }, [selections])

    const handleCategoryClick = (category) => {
        const message = validateInput(category, selections)

        if (message) {
            setErrorMessage(message)
            return
        }

        setErrorMessage('')
        setOpenCategory((prev) => (prev === category ? null : category))
    }

    const handleItemSelect = (category, item) => {
        const message = validateInput(category, selections)

        if (message) {
            setErrorMessage(message)
            return
        }

        setSelections((prev) => ({ ...prev, [category]: item }))
        setOpenCategory(null)
    }

    const handleUpdate = async () => {
        const character = {
            id,
            name: characterName,
            skin_id: selections.skin ? selections.skin.id : 'base_body',
            hair_id: selections.hair ? selections.hair.id : null,
            dress_id: selections.dress ? selections.dress.id : null,
            top_id: selections.top ? selections.top.id : null,
            bottom_id: selections.bottom ? selections.bottom.id : null
        }

        await CharacterApi.updateCharacter(character)
        navigate(`/characters/${id}`)
    }
    const handleDelete = async() => {
        const character = await CharacterApi.getCharacterById(id)
        console.log(character)
        await CharacterApi.deleteCharacter(character)
        navigate(`/characters`)
    }

    // skin choice swaps the body itself, everything else stacks on top of it
    const currentBodyImage = selections.skin ? selections.skin.image : defaultBodyImage

    if (loading) {
        return <div>loading</div>
    }

    return (
        <div className='create-character'>
            {showDisclaimer && (
                <div className="disclaimer-popup">
                    <div className="popup-content">
                        <span>You can not select dress and (top or bottom), its one or the other</span>
                        <button className="close-popup-btn" onClick={() => setShowDisclaimer(false)}>×</button>
                    </div>
                </div>
            )}

            <input
                type="text"
                placeholder="character name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
            />

            <label>
                <input type="checkbox" checked={Boolean(selections.dress)} readOnly />
                Dress
            </label>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="options">
                <button id="skin-tone-button" onClick={() => handleCategoryClick('skin')}>
                    <div className='image'>🖌️</div>
                    <div className="image-name">Skin Tone</div>
                </button>
                <button id="hair-button" onClick={() => handleCategoryClick('hair')}>
                    <div className='image'>✄</div>
                    <div className="image-name">Hair</div>
                </button>
                <button id="top-button" onClick={() => handleCategoryClick('top')}>
                    <div className='image'>👕</div>
                    <div className="image-name">Tops</div>
                </button>
                <button id="bottom-button" onClick={() => handleCategoryClick('bottom')}>
                    <div className='image'>👖</div>
                    <div className="image-name">Bottoms</div>
                </button>
                <button id="dress-button" onClick={() => handleCategoryClick('dress')}>
                    <div className='image'>👗</div>
                    <div className="image-name">Dresses</div>
                </button>
            </div>

            {openCategory && (
                <div className="item-panel">
                    {loadingItems && <div>loading</div>}
                    {!loadingItems && categoryItems.length === 0 && <div>no items found</div>}
                    {!loadingItems && categoryItems.map((item) => (
                        <button
                            key={item.id}
                            className="item-option"
                            onClick={() => handleItemSelect(openCategory, item)}
                        >
                            <img src={item.image} alt={item.name} />
                            <div className="item-name">{item.name}</div>
                            <div className="item-price">{item.price}</div>
                        </button>
                    ))}
                </div>
            )}

            <div className="total-price">total: ${totalPrice}</div>

            <div className='character-preview'>
            {selections.skin && (
                <img 
                    className="layer" 
                    src={selections.skin.image.startsWith('/') ? selections.skin.image : `/${selections.skin.image}`} 
                    alt="skin" 
                />
            )}
            {selections.bottom && (
                <img 
                    className="layer" 
                    src={selections.bottom.image.startsWith('/') ? selections.bottom.image : `/${selections.bottom.image}`} 
                    alt="bottom" 
                />
            )}
            {selections.top && (
                <img 
                    className="layer" 
                    src={selections.top.image.startsWith('/') ? selections.top.image : `/${selections.top.image}`} 
                    alt="top" 
                />
            )}
            {selections.dress && (
                <img 
                    className="layer" 
                    src={selections.dress.image.startsWith('/') ? selections.dress.image : `/${selections.dress.image}`} 
                    alt="dress" 
                />
            )}
            {selections.hair && (
                <img 
                    className="layer" 
                    src={selections.hair.image.startsWith('/') ? selections.hair.image : `/${selections.hair.image}`} 
                    alt="hair" 
                />
            )}
        </div>

            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>save changes</button>
        </div>
    )
}

export default EditCharacter