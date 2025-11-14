import http from '@/services/http.js'

export default {
  list(params = {}) {
    return http.get('/v1/projects', { params })
  },

  create(payload) {
    return http.post('/v1/projects', payload)
  },

  update(id, payload) {
    return http.put(`/v1/projects/${id}`, payload)
  },

  remove(id) {
    return http.delete(`/v1/projects/${id}`)
  },
}
