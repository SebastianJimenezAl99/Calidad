const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/users')
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: '🚀 API funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.use('/api/users', auth.validateToken, userRoutes)

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack)
  res.status(500).json({
    error: 'Algo salió mal!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🌟 Servidor corriendo en puerto ${PORT}`)
  })
}

module.exports = app
