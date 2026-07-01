const getAllDresses= async() =>{
    try{
          const response = await fetch("/dresses/")
          const data =await response.json()
          console.log("Successfully fetched dresses ")
          return data
    }
    catch(error){
        console.log({error: error.message})
    }
   

}


const getDressById = async(id) =>{
    try{
        const response = await fetch(`/dresses/${id}`)
        const data = await response.json()
        console.log(`Successfully fetched Dress with id: ${id}`)
        return data
    }
    catch(error){
        console.error("Error: Could not fetch dress by id")
    }
}

export default{
    getAllDresses,
    getDressById
}