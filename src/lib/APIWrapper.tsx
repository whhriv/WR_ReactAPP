import axios from 'axios';
import PostType from '../types/post';
import SkiType from '../pages/skis'
import SurfType from '../pages/surf'
import UserType from '../types/auth';


const base: string = 'http://localhost:5000/api';
// const base: string = 'http://localhost:8080/api';
const SkiEndpoint: string = '/skis';
const SurfEndpoint: string = '/surf';
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


async function getAllSkis(): Promise<APIResponse<SkiType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(SkiEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}
async function getAllSurf(): Promise<APIResponse<SurfType[]>> {
  let error;
  let data;
  try{
      const response = await apiClientNoAuth().get(SurfEndpoint);
      data = response.data
  } catch(err) {
      if (axios.isAxiosError(err)){
          error = err.message
      } else {
          error = 'Something went wrong'
      }
  }
  return {error, data}
}

async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let error;
    let data;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getMe(token:string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function createSki(token:string, newSki: Partial<SkiType>): Promise<APIResponse<SkiType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).post(SkiEndpoint, newSki);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong';
        }
    }
    return {error, data}
}

async function createSurf(token:string, newSurf: Partial<SurfType>): Promise<APIResponse<SurfType>> {
  let error;
  let data;
  try {
      const response = await apiClientTokenAuth(token).post(SurfEndpoint, newSurf);
      data = response.data
  } catch(err) {
      if (axios.isAxiosError(err)){
          error = err.response?.data.error
      } else {
          error = 'Something went wrong';
      }
  }
  return {error, data}
}

async function getSkiById(postId:string): Promise<APIResponse<SkiType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(SkiEndpoint + '/' + postId);
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

async function editSkiById(token:string, SkiId:string|number, editedSkiData:SkiType): Promise<APIResponse<SkiType>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(SkiEndpoint + '/' + SkiId, editedSkiData);
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

async function deleteSkiById(token:string, SkiId:string|number): Promise<APIResponse<string>>{
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(SkiEndpoint + '/' + SkiId);
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
    getAllSkis,
    register,
    login,
    getMe,
    createSki,
    getSkiById,
    editSkiById,
    deleteSkiById,
}