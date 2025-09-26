const express = require('express')
const calculator = require('../utils/calculator')

const router = express.Router()

const users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 25 },
  { id: 2, name: 'María García', email: 'maria@example.com', age: 30 },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', age: 28 }
]

router.get('/', (req, res) => {
  const { limit, offset } = req.query
  let result = users

  if (offset) {
    const offsetNum = parseInt(offset)
    if (offsetNum >= 0) {
      result = result.slice(offsetNum)
    }
  }

  if (limit) {
    const limitNum = parseInt(limit)
    if (limitNum > 0) {
      result = result.slice(0, limitNum)
    }
  }

  res.json({
    users: result,
    total: users.length,
    count: result.length
  })
})

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id
    })
  }

  res.json(user)
})

router.post('/', (req, res) => {
  const { name, email, age } = req.body

  if (!name || !email) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'name y email son requeridos'
    })
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(409).json({
      error: 'Email ya existe',
      email
    })
  }

  const newUser = {
    id: Math.max(...users.map(u => u.id)) + 1,
    name,
    email,
    age: age || 0
  }

  users.push(newUser)
  res.status(201).json(newUser)
})

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id
    })
  }

  const { name, email, age } = req.body
  const updatedUser = { ...users[userIndex] }

  if (name) updatedUser.name = name
  if (email) updatedUser.email = email
  if (age !== undefined) updatedUser.age = age

  users[userIndex] = updatedUser
  res.json(updatedUser)
})

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id
    })
  }

  const deletedUser = users.splice(userIndex, 1)[0]
  res.json(deletedUser)
})

router.get('/:id/age-calculation', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      id
    })
  }

  try {
    const daysInYear = 365
    const ageInDays = calculator.multiply(user.age, daysInYear)
    const ageInHours = calculator.multiply(ageInDays, 24)

    res.json({
      user: user.name,
      age: user.age,
      ageInDays,
      ageInHours
    })
  } catch (error) {
    res.status(500).json({
      error: 'Error en cálculo',
      message: error.message
    })
  }
})

module.exports = router
