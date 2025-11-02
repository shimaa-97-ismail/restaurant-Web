import axios from 'axios';

 const api=axios.create({
    baseURL:'http://localhost:3000/'
});

api.interceptors.request.use(
    (req)=>{
        const token=localStorage.getItem('token');
        if(token){
            req.headers.Authorization=`Bearer ${token}`;
        }
        return req;

    },(error)=>{
        return  Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response)=>{
        console.log(response);
        
        return response
    },
    (error)=>{
       return Promise.reject(error)
    }
)
export {api} ;