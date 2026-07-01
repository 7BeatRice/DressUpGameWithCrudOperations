const getAllBottoms= async() =>{
    try{
          const response = await fetch("/bottoms/")
          const data =await response.json()
          console.log("Successfully fetched bottoms ")
          return data
    }
    catch(error){
        console.log({error: error.message})
    }
   

}


const getBottomById = async(id) =>{
    try{
        const response = await fetch(`/bottoms/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched bottom with id: ${id}`)
        return data
    }
    catch(error){
        console.error("Error: Could not fetch bottom by id")
    }
}

export default{
    getAllBottoms,
    getBottomById
}