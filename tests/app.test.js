const request = require('supertest')
const app = require('../src/app')

describe('App', () => {
  describe('GET /', () => {
    test('should return welcome message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)

      expect(response.body).toHaveProperty('message')
      expect(response.body).toHaveProperty('version')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('uptime')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('GET /nonexistent', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404)

      expect(response.body).toHaveProperty('error', 'Ruta no encontrada')
      expect(response.body).toHaveProperty('path', '/nonexistent')
    })
  })
})
