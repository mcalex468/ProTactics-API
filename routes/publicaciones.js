const express = require('express');
const router = express.Router();
const { 
    obtenerTodasPublicaciones, 
    obtenerPublicacionPorId, 
    crearNuevaPublicacion, 
    eliminarPublicacionPorId, 
    likePublicacion, 
    unlikePublicacion 
} = require('../controllers/publicacionesController.js');
const authMiddleware = require('../middlewares/auth');

router.get('/', obtenerTodasPublicaciones);  // Obtener todas las publicaciones
router.get('/:id', obtenerPublicacionPorId);  // Obtener una publicación por ID
router.post('/', authMiddleware, crearNuevaPublicacion);  // Crear una nueva publicación
router.delete('/:id', authMiddleware, eliminarPublicacionPorId);  // Eliminar publicación por ID
router.post('/:id/like', authMiddleware, likePublicacion);  // Dar like a una publicación
router.delete('/:id/like', authMiddleware, unlikePublicacion);  // Quitar like a una publicación

module.exports = router;
