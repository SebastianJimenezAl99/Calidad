const request = require('supertest')
const app = require('../../src/app')

describe('Users API', () => {
  const validToken = 'Bearer valid-token'

  describe('GET /api/users', () => {
    test('should return all users with valid token', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', validToken)
        .expect(200)

      expect(response.body).toHaveProperty('users')
      expect(response.body).toHaveProperty('total')
      expect(response.body).toHaveProperty('count')
      expect(Array.isArray(response.body.users)).toBe(true)
    })

    test('should return 401 without token', async () => {
      await request(app)
        .get('/api/users')
        .expect(401)
    })

    test('should handle limit parameter', async () => {
      const response = await request(app)
        .get('/api/users?limit=1')
        .set('Authorization', validToken)
        .expect(200)

      expect(response.body.count).toBe(1)
    })
  })

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .set('Authorization', validToken)
        .expect(200)

      expect(response.body).toHaveProperty('id', 1)
      expect(response.body).toHaveProperty('name')
      expect(response.body).toHaveProperty('email')
    })

    test('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/999')
        .set('Authorization', validToken)
        .expect(404)
    })
  })

  describe('POST /api/users', () => {
    test('should create new user', async () => {
      const newUser = {
        name: 'Nuevo Usuario',
        email: 'nuevo@example.com',
        age: 25
      }

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', validToken)
        .send(newUser)
        .expect(201)

      expect(response.body).toHaveProperty('id')
      expect(response.body.name).toBe(newUser.name)
      expect(response.body.email).toBe(newUser.email)
    })

    test('should return 400 for incomplete data', async () => {
      const incompleteUser = { name: 'Sin Email' }

      await request(app)
        .post('/api/users')
        .set('Authorization', validToken)
        .send(incompleteUser)
        .expect(400)
    })
  })

  describe('GET /api/users/:id/age-calculation', () => {
    test('should calculate age in days and hours', async () => {
      const response = await request(app)
        .get('/api/users/1/age-calculation')
        .set('Authorization', validToken)
        .expect(200)

      expect(response.body).toHaveProperty('ageInDays')
      expect(response.body).toHaveProperty('ageInHours')
      expect(typeof response.body.ageInDays).toBe('number')
      expect(typeof response.body.ageInHours).toBe('number')
    })
  })
})
