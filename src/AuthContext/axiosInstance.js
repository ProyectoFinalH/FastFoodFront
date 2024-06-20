import axios from "axios";
import { useSelector } from "react-redux";


const axiosInstance=axios.create();

axiosInstance.interceptors.request.use(
    (config)=>{
        const token=useSelector((state)=>state.token);
        if(token){
            config.headers['Authorization']=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;

