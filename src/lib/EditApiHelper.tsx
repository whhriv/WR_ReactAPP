import axios from 'axios';
import SurfType from '../types/surf';
// import UserType from '../types/auth';


const base: string = 'http://127.0.0.1:5000/api';
// const base: string = 'http://localhost:8080/api';
const SurfEndpoint: string = '/surf';
// const userEndpoint: string = '/users';
const tokenEndpoint: string = '/token';
const SurfDeleteEndPoint: string = '/edit'

const tokenRaw = localStorage.getItem('token')
const token = JSON.stringify(tokenRaw)
console.log(token)

const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: 'http://127.0.0.1:5000/api/users/me',
    headers: {
    
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
    }
})
//btoa(`${username}:${password}`)

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base + tokenEndpoint,
    headers: {
        'Authorization': 'Bearer ' + {token}
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
            const response = await apiClientNoAuth().put('http://127.0.0.1:5000/api/surf/edit/' + surfId);
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
            const response = await apiClientTokenAuth(token).put('http://127.0.0.1:5000/api' + '/' + surfId, editedSurfData);
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

        async function deleteSurfById(token: string, SurfId:string|number): Promise<APIResponse<string>>{
        let error;
        let data;
        try {
            const response = await apiClientTokenAuth(token).delete(SurfDeleteEndPoint + '/' + SurfId);
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
        apiClientBasicAuth,
        apiClientTokenAuth 
    }