import { Router } from 'express';
import { classifyCalendars, getLatestClassification } from './clasificador.controller';

const router = Router();

/**
 * @swagger
 * /clasificador/classify:
 *   post:
 *     summary: Clasifica los calendarios y guarda el resultado
 *     tags: [Clasificador]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busyThreshold:
 *                 type: number
 *                 description: Umbral de ocupación para la clasificación (opcional, por defecto 10)
 *     responses:
 *       201:
 *         description: Clasificación realizada y guardada
 *       500:
 *         description: Error del servidor
 */
router.post('/classify', classifyCalendars);

/**
 * @swagger
 * /clasificador/latest:
 *   get:
 *     summary: Obtiene la última clasificación registrada
 *     tags: [Clasificador]
 *     responses:
 *       200:
 *         description: Última clasificación obtenida exitosamente
 *       404:
 *         description: No hay clasificaciones disponibles
 *       500:
 *         description: Error del servidor
 */
router.get('/latest', getLatestClassification);

export default router;
