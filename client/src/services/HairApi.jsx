const getAllHairs= async() =>{
    try{
          const response = await fetch("/hairs/")
          const data =await response.json()
          console.log("Successfully fetched hairs ")
          return data
    }
    catch(error){
        console.log({error: error.message})
    }
   

}


const getHairById = async(id) =>{
    try{
        const response = await fetch(`/hairs/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched hair with id: ${id}`)
        return data
    }
    catch(error){
        console.error("Error: Could not fetch hair by id")
    }
}

export default{
    getAllHairs,
    getHairById
}