import {useEffect,useState} from "react";

export function useFetch(cbfun,...argu){
  
    let [data,setData]=useState({});
    let[errors,setErrors]=useState(null);
    //  let[loading,setloading]=useState(null);

     const fetchData=async()=>{ 
        try{
            const response=await cbfun(argu);
            setData(response.data);
        }catch(error){
            setErrors(error)
        }
     }

     useEffect(()=>{
        fetchData()
     },[cbfun])
return {data,errors}
}