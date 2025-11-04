// Simple token management helpers for frontend auth

const TOKEN_KEY = 'auth_token'

export function getToken() {
  try {
    const value = localStorage.getItem(TOKEN_KEY)
    if (!value) return null
    if (value === 'null' || value === 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      return null
    }
    return value
  } catch (_) {
    return null
  }
}

export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
  } catch (_) {
    // ignore
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (_) {
    // ignore
  }
}

export function isAuthenticated() {
  return !!getToken()
}

export function setUserProfile(profile) {
  try {
    if (profile) {
      localStorage.setItem('auth_user', JSON.stringify(profile))
    }
  } catch (_) {}
}

export function getUserProfile() {
  try {
    const raw = localStorage.getItem('auth_user')
    if (!raw) return null
    return JSON.parse(raw)
  } catch (_) {
    return null
  }
}

export function clearUserProfile() {
  try {
    localStorage.removeItem('auth_user')
  } catch (_) {}
}
