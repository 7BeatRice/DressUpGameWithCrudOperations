const getAllCharacters = async () => {
    try {
        const response = await fetch("/api/characters/")
        const data = await response.json()
        console.log("Successfully fetched characters ")
        return data
    }
    catch (error) {
        console.log({ error: error.message })
    }
}

const getCharacterById = async (id) => {
    try {
        const response = await fetch(`/api/characters/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched character with id: ${id}`)
        return data
    }
    catch (error) {
        console.error("Error: Could not fetch character by id", error)
    }
}

const createCharacter = async (character) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character),
        }
        const response = await fetch(`/api/characters`, options)
        const data = await response.json()
        console.log(`Successfully created character`)
        return data
    }
    catch (error) {
        console.error("Error: Could not create character")
    }
}

const updateCharacter = async (character) => {
    try {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(character),
        }
        const response = await fetch(`/api/characters/edit/${character.id}`, options)
        const data = await response.json()
        console.log(`Successfully updated character with id ${character.id}`)
        return data
    }
    catch (error) {
        console.error(`Error: Could not update character with id ${character.id}`)
    }
}

const deleteCharacter = async (character) => {
    try {
        const options = { method: 'DELETE' }
        const response = await fetch(`/api/characters/edit/${character.id}`, options)
        const data = await response.json()
        console.log(`Successfully deleted character with id ${character.id}`)
        return data
    }
    catch (error) {
        console.error(`Error: Could not delete character with id ${character.id}`)
    }
}

export default {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    deleteCharacter,
    updateCharacter
}