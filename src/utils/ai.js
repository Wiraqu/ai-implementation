const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
  });

  async function generateResponse(message) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
            messages: [
                  { role: 'system', content: 'Eres un asistente empresarial profesional.' },
                        { role: 'user', content: message }
                            ],
                                max_tokens: 1000,
                                    temperature: 0.7
                                      });
                                        
                                          return {
                                              text: completion.choices[0].message.content,
                                                  tokensUsed: completion.usage.total_tokens,
                                                      model: completion.model
                                                        };
                                                        }

                                                        function validatePrompt(prompt) {
                                                          const forbidden = [
                                                              /ignore previous instructions/i,
                                                                  /system prompt/i,
                                                                      /jailbreak/i
                                                                        ];
                                                                          
                                                                            for (const pattern of forbidden) {
                                                                                if (pattern.test(prompt)) {
                                                                                      return { valid: false, reason: 'Prompt no permitido' };
                                                                                          }
                                                                                            }
                                                                                              
                                                                                                return { valid: true };
                                                                                                }

                                                                                                module.exports = { generateResponse, validatePrompt };
                                                                                                AI
