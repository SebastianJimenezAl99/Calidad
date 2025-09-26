const auth = {
  /**
   * Valida el token de autenticación
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - Next middleware function
   */
  validateToken (req, res, next) {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        error: 'Token de acceso requerido',
        message: 'Debe proporcionar un token en el header Authorization'
      })
    }

    if (token !== 'Bearer valid-token') {
      return res.status(403).json({
        error: 'Token inválido',
        message: 'El token proporcionado no es válido'
      })
    }

    req.user = { id: 1, username: 'testuser' }
    next()
  },

  /**
   * Genera un token simulado (solo para demo)
   * @param {object} user - Usuario
   * @returns {string} Token generado
   */
  generateToken (user) {
    if (!user || !user.username) {
      throw new Error('Usuario inválido para generar token')
    }
    return `token-${user.username}-${Date.now()}`
  }
}

module.exports = auth
