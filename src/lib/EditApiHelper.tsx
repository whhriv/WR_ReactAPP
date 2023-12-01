import axios from 'axios';
import SurfType from '../types/surf';
// import UserType from '../types/auth';


const base: string = 'http://localhost:5000';
// const base: string = 'http://localhost:8080/api';
const SurfEndpoint: string = '/posts';
const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    error?: string,
    data?: T
}

type TokenType = {
    token: string,
    tokenExpiration: string
}   
   
   async function getSurfById(surfId:string): Promise<APIResponse<SurfType>> {
        let error;
        let data;
        try{
            const response = await apiClientNoAuth().get(SurfEndpoint + '/' + surfId);
            data = response.data;
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.response?.data.error
            } else {
                error = 'Something went wrong';
            }
        }
        return {error, data}
    }

        async function editSurfById(token:string, surfId:string|number, editedSurfData:SurfType): Promise<APIResponse<SurfType>>{
        let error;
        let data;
        try {
            const response = await apiClientTokenAuth(token).put(SurfEndpoint + '/' + surfId, editedSurfData);
            data = response.data
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.response?.data.error
            } else {
                error = 'Something went wrong';
            }
        }
        return {error, data}
    }

        async function deleteSurfById(token:string, SurfId:string|number): Promise<APIResponse<string>>{
        let error;
        let data;
        try {
            const response = await apiClientTokenAuth(token).delete(SurfEndpoint + '/' + SurfId);
            data = response.data.success
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.response?.data.error
            } else {
                error = 'Something went wrong';
            }
        }
        return {error, data}
    }

    export {
        deleteSurfById,
        editSurfById,
        getSurfById,
    }