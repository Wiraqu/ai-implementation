const express = require('express');
const router = express.Router();
const { generateResponse, validatePrompt } = require('../utils/ai');

// POST /api/chat - Enviar mensaje al chatbot
router.post('/', async (req, res, next) => {
  try {
      const { message, context = '' } = req.body;
          
              // Validación
                  if (!message || typeof message !== 'string') {
                        return res.status(400).json({
                                error: 'Mensaje requerido',
                                        code: 'MISSING_MESSAGE'
                                              });
                                                  }
                                                      
                                                          if (message.length > 2000) {
                                                                return res.status(400).json({
                                                                        error: 'Mensaje demasiado largo (máx 2000 caracteres)',
                                                                                code: 'MESSAGE_TOO_LONG'
                                                                                      });
                                                                                          }
                                                                                              
                                                                                                  // Validar prompt por seguridad
                                                                                                      const validation = validatePrompt(message);
                                                                                                          if (!validation.valid) {
                                                                                                                return res.status(400).json({
                                                                                                                        error: validation.reason,
                                                                                                                                code: 'INVALID_PROMPT'
                                                                                                                                      });
                                                                                                                                          }
                                                                                                                                              
                                                                                                                                                  // Generar respuesta con IA
                                                                                                                                                      const startTime = Date.now();
                                                                                                                                                          const response = await generateResponse(message, context);
                                                                                                                                                              const processingTime = Date.now() - startTime;
                                                                                                                                                                  
                                                                                                                                                                      res.json({
                                                                                                                                                                            success: true,
                                                                                                                                                                                  data: {
                                                                                                                                                                                          response: response.text,
                                                                                                                                                                                                  tokensUsed: response.tokensUsed,
                                                                                                                                                                                                          model: response.model,
                                                                                                                                                                                                                  processingTime: `${processingTime}ms`
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                
                                                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                                                      next(error);
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        // GET /api/chat/history - Obtener historial (mock)
                                                                                                                                                                                                                                        router.get('/history', (req, res) => {
                                                                                                                                                                                                                                          res.json({
                                                                                                                                                                                                                                              success: true,
                                                                                                                                                                                                                                                  data: []
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                    module.exports = router;
                                                                                                                                                                                                                                                    