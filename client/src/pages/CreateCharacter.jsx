import React, { useState, useEffect } from 'react'
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

const CreateCharacter = () => {
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


    //inform User about slection rules
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false)
        }, 10000) 

        return () => clearTimeout(timer) 
    }, [])

    // load the default base body on first render
    useEffect(() => {
        const displayCharacter = async () => {
            const defaultSkin = await SkinApi.getSkinById('base_body')
            if (defaultSkin) {
                setDefaultBodyImage(defaultSkin.image)
            }
        }

        displayCharacter()
    }, [])

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

    const handleSave = async () => {
        const character = {
            name: characterName,
            skin_id: selections.skin ? selections.skin.id : 'base_body',
            hair_id: selections.hair ? selections.hair.id : null,
            dress_id: selections.dress ? selections.dress.id : null,
            top_id: selections.top ? selections.top.id : null,
            bottom_id: selections.bottom ? selections.bottom.id : null
        }

        await CharacterApi.createCharacter(character)
    }

  

    // skin choice swaps the body itself, everything else stacks on top of it
    const currentBodyImage = selections.skin ? selections.skin.image : defaultBodyImage

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
                <button id="bottom-button"  onClick={() => handleCategoryClick('bottom')}>
                    <div className='image'>👖</div>
                    <div className="image-name">Bottoms</div>
                </button>
                <button id="dress-button"  onClick={() => handleCategoryClick('dress')}>
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
                <img className="layer" src={currentBodyImage} />
                {selections.bottom && <img className="layer" src={selections.bottom.image} />}
                {selections.top && <img className="layer" src={selections.top.image} />}
                {selections.dress && <img className="layer" src={selections.dress.image} />}
                {selections.hair && <img className="layer" src={selections.hair.image} />}
            </div>

            <button onClick={handleSave}>save character</button>
        </div>
    )
}

export default CreateCharacter