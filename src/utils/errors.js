/**
 *  * Middleware de manejo de errores centralizado
  */
  function errorHandler(err, req, res, next) {
    console.error('❌ Error:', err.message);
      
        // Error de OpenAI
          if (err.name === 'APIError') {
              return res.status(502).json({
                    error: 'Error en servicio de IA',
                          code: 'AI_SERVICE_ERROR',
                                details: process.env.NODE_ENV === 'development' ? err.message : undefined
                                    });
                                      }
                                        
                                          // Error genérico
                                            res.status(err.status || 500).json({
                                                error: err.message || 'Error interno del servidor',
                                                    code: err.code || 'INTERNAL_ERROR'
                                                      });
                                                      }

                                                      module.exports = {
                                                        errorHandler
                                                        };
                                                        
 */