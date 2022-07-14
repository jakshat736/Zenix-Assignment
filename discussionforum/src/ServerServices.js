import axios from "axios";
const serverURL='http://localhost:5000'

export const postData=async(url,body,isfile)=>{
try{
var response= await axios.post(`${serverURL}/${url}`,body)
 var result=await response.data 
 return(result)
}
catch(error)
{
return(false)

}
}


export const getData=async(url)=>{
     try{
        var response= await axios.get(`${serverURL}/${url}`)
        var result=await response.data
        return (result)
     }
     catch(error)
     {
        return(false)
     }
}

