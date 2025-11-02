import axios from "axios";

const baseUrl= `http://localhost:3000/`
console.log(baseUrl);


 async function getALL(resource){ //*//
  console.log(resource);
const token = localStorage.getItem("token");
console.log(token);

 return await axios.get(`${baseUrl}${resource}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
 })
}

  async function getMenu(resource){
    console.log(resource);
    
    const token = localStorage.getItem("token");
    console.log(`${baseUrl}breakfast`);
    
 return await axios.get(`${baseUrl}/${resource}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
 })

}
export {getMenu,getALL}
