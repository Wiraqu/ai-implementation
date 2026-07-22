const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
          console.log('Servidor en puerto ' + PORT);
            });
            }

            module.exports = app;
            SERVER
