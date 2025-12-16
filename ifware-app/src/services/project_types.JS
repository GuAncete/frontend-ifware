import http from '@/services/http.js'

export default {
  list(params = {}) {
    return http.get('/v1/project-types', { params })
  },

  create(payload) {
    return http.post('/v1/project-types', payload)
  },

  update(id, payload) {
    return http.put(`/v1/project-types/${id}`, payload)
  },

  remove(id) {
    return http.delete(`/v1/project-types/${id}`)
  },
}
