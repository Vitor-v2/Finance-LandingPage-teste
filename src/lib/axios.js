import axios from 'axios'

import {
  ACCESS_TK_STORAGE,
  REFRESH_TK_STORAGE,
} from '@/constants/local-storage'

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

protectedApi.interceptors.response.use(
  (request) => request,
  async (error) => {
    const request = error.config
    const refreshToken = localStorage.getItem(REFRESH_TK_STORAGE)
    if (!refreshToken) {
      return Promise.reject(error)
    }
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._retry = true
      try {
        const response = await protectedApi.post('/users/refresh-token', {
          refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newrefreshToken = response.data.refreshToken
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newrefreshToken)
        request.headers.Authorization = `Barear ${newAccessToken}`
        return protectedApi(request)
      } catch (error) {
        console.log(error)
      }
    }
  }
)
