import axios from 'axios'

import { ACCESS_TK_STORAGE } from '@/constants/local-storage'

export const protectedApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

export const publicApi = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

protectedApi.interceptors.request.use((request) => {
  const tokenLocal = localStorage.getItem(ACCESS_TK_STORAGE)
  if (!tokenLocal) {
    return request
  }
  request.headers.Authorization = `Bearer ${tokenLocal}`
  return request
})

// protectedApi.interceptors.response.use((request)=>{request}, (error)=>{
//   const request = error.config
//   const tokenLocal = localStorage.getItem(ACCESS_TK_STORAGE)
// })
