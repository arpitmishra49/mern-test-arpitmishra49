import api from './axios'

// POST /api/auth/register
export const registerUser = (data) => api.post('/auth/register', data)

// POST /api/auth/login
export const loginUser = (data) => api.post('/auth/login', data)
