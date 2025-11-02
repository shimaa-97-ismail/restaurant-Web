import axios from "axios";

const baseUrl= `http://localhost:3000/menuItem`
console.log(baseUrl);
const token = localStorage.getItem("token");

export function getALL(){  //*//
 const token = localStorage.getItem("token"); 
 return  axios.get(`${baseUrl}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
 })
}

  async function getMenu(resource){ //*//
    console.log(resource);
    
    const token = localStorage.getItem("token");
    console.log(`${baseUrl}/breakfast`);
    
 return await axios.get(`${baseUrl}/${resource}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
 })

}

async function updateMenu(id,resource,data){
   const token = localStorage.getItem("token");
  return await axios.patch(`http://localhost:3000/${resource}/${id}`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

}

async function addMenu(data,resource){
    const token = localStorage.getItem("token");
    console.log(resource);
    
  return await axios.post(`http://localhost:3000/${resource}`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
     })
}

async function GetbyID(endpoint,id){
  const token = localStorage.getItem("token");
  const url=(endpoint=="menuItem")?
   `http://localhost:3000/${endpoint}/getById/${id}`:
 `http://localhost:3000/${endpoint}/${id}`;
  return await axios.get(url,{
  headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
)

}


async function getmenuItemsbyID(edPoint,id){
  
  
  return await axios.get(`http://localhost:3000/${edPoint}/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
     })
    
}
export {getMenu,updateMenu,addMenu,getmenuItemsbyID,GetbyID}
