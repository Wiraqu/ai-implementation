const express = require('express');
const router = express.Router();
const { generateResponse, validatePrompt } = require('../utils/ai');

router.post('/', async (req, res) => {
  try {
      const { message } = req.body;
          
              if (!message || typeof message !== 'string') {
                    return res.status(400).json({ error: 'Mensaje requerido' });
                        }
                            
                                if (message.length > 2000) {
                                      return res.status(400).json({ error: 'Mensaje muy largo' });
                                          }
                                              
                                                  const validation = validatePrompt(message);
                                                      if (!validation.valid) {
                                                            return res.status(400).json({ error: validation.reason });
                                                                }
                                                                    
                                                                        const response = await generateResponse(message);
                                                                            
                                                                                res.json({
                                                                                      success: true,
                                                                                            data: {
                                                                                                    response: response.text,
                                                                                                            tokensUsed: response.tokensUsed,
                                                                                                                    model: response.model
                                                                                                                          }
                                                                                                                              });
                                                                                                                                  
                                                                                                                                    } catch (error) {
                                                                                                                                        console.error('Error:', error.message);
                                                                                                                                            res.status(500).json({ error: 'Error interno' });
                                                                                                                                              }
                                                                                                                                              });

                                                                                                                                              router.get('/history', (req, res) => {
                                                                                                                                                res.json({ success: true, data: [] });
                                                                                                                                                });

                                                                                                                                                module.exports = router;
                                                                                                                                                CHAT
