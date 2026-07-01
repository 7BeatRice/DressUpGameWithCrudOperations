const getAllSkins= async() =>{
    try{
          const response = await fetch("/skins/")
          const data =await response.json()
          console.log("Successfully fetched skins ")
          return data
    }
    catch(error){
        console.log({error: error.message})
    }
   

}


const getSkinById = async(id) =>{
    try{
        const response = await fetch(`/skins/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched skin with id: ${id}`)
        return data
    }
    catch(error){
        console.error("Error: Could not fetch Skin by id")
    }
}

export default{
    getAllSkins,
    getSkinById
}