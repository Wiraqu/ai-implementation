const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const { errorHandler } = require('./utils/errors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
      status: 'OK', 
          timestamp: new Date().toISOString(),
              version: '1.0.0'
                });
                });

                // Error handler
                app.use(errorHandler);

                // Solo iniciar servidor si no estamos en test
                if (process.env.NODE_ENV !== 'test') {
                  app.listen(PORT, () => {
                      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
                        });
                        }

                        module.exports = app;
  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  require('dotenv').config();

  const chatRoutes = require('./routes/chat');
  const { errorHandler } = require('./utils/errors');

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Servir archivos estáticos (frontend)
  app.use(express.static(path.join(__dirname, '../public')));

  // Rutas API
  app.use('/api/chat', chatRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
            timestamp: new Date().toISOString(),
                version: '1.0.0'
                  });
                  });

                  // Redirigir raíz al frontend
                  app.get('/', (req, res) => {
                    res.sendFile(path.join(__dirname, '../public/index.html'));
                    });

                    // Error handler
                    app.use(errorHandler);

                    if (process.env.NODE_ENV !== 'test') {
                      app.listen(PORT, () => {
                          console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
                            });
                            }

                            module.exports = app;
                                                  