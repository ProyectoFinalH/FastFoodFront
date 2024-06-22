import axios from "axios";


const axiosInstance=axios.create();

const configureAxios = (token) => {
    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['token'] = `${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  
  export { axiosInstance, configureAxios };

