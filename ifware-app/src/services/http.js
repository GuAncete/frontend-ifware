import axios from 'axios'
import { getToken, clearToken } from '@/services/auth.js'

// Base URL configurável via .env.local (VITE_API_BASE_URL) com fallback para Laravel padrão
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const http = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
})

// Attach Authorization header if token exists
http.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
})

// Global 401 handler -> clear token and redirect to login
http.interceptors.response.use(
    (res) => res,
    (error) => {
        // DEBUG: log de 403/401 para facilitar investigação
        try {
            if (error?.response) {
                // eslint-disable-next-line no-console
                console.warn('[http] Response error', {
                    status: error.response.status,
                    url: error.config?.url,
                    data: error.response.data,
                })
            }
        } catch (_) {}

        if (error?.response?.status === 401) {
            clearToken()
            try {
                const redirect = encodeURIComponent(window.location.hash.replace(/^#/, ''))
                window.location.hash = `#/login${redirect ? `?redirect=${redirect}` : ''}`
            } catch (_) {
                window.location.hash = '#/login'
            }
        }
        return Promise.reject(error)
    }
)

export default http