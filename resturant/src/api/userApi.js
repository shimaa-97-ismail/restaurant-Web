import axios from "axios";

const baseUrl= `http://localhost:3000/user`
console.log(baseUrl);


// async function userLogin(user){
//   const token = localStorage.getItem("token");
//  return await axios.post(`${baseUrl}/login`,user, {
//       headers:  {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     })
// }



async function getAll(resource){
  const token = localStorage.getItem("token");
 return await axios.get(`http://localhost:3000/${resource}`, {
      headers:  {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    })
}
async function getUserById(id){
  const token = localStorage.getItem("token");
 return await axios.get(`${baseUrl}/${id}`, {
      headers:  {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    })
}

// async function AddUser(data){
//    const token = localStorage.getItem("token");
//  return await axios.post(`${baseUrl}`,data, {
//       headers:  {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     })
// }

async function updateUser(id,data){
   const token = localStorage.getItem("token");
 return await axios.patch(`${baseUrl}/${id}`,data, {
      headers:  {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    })
}
async function deleteUser(endpoint,id){
  const token = localStorage.getItem("token");
 return await axios.delete(`http://localhost:3000/${endpoint}/${id}`, {
      headers:  {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    })
}
export {getAll,getUserById,updateUser,deleteUser}
