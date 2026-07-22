const request = require('supertest');
const app = require('../server');

describe('Chatbot API', () => {
  
    test('GET /health retorna OK', async () => {
        const res = await request(app).get('/health');
            expect(res.status).toBe(200);
                expect(res.body.status).toBe('OK');
                  });
                    
                      test('POST /api/chat rechaza mensaje vacio', async () => {
                          const res = await request(app).post('/api/chat').send({});
                              expect(res.status).toBe(400);
                                });
                                  
                                    test('POST /api/chat rechaza mensaje muy largo', async () => {
                                        const res = await request(app).post('/api/chat').send({ message: 'a'.repeat(2001) });
                                            expect(res.status).toBe(400);
                                              });
                                                
                                                  test('GET /api/chat/history retorna array vacio', async () => {
                                                      const res = await request(app).get('/api/chat/history');
                                                          expect(res.status).toBe(200);
                                                              expect(res.body.data).toEqual([]);
                                                                });
                                                                });
                                                                TEST
