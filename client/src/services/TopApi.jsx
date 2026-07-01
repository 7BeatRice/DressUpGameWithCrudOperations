const getAllTops= async() =>{
    try{
          const response = await fetch("/tops/")
          const data =await response.json()
          console.log("Successfully fetched tops ")
          return data
    }
    catch(error){
        console.log({error: error.message})
    }
   

}


const getTopById = async(id) =>{
    try{
        const response = await fetch(`/tops/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched top with id: ${id}`)
        return data
    }
    catch(error){
        console.error("Error: Could not fetch top by id")
    }
}

export default{
    getAllTops,
    getTopById
}