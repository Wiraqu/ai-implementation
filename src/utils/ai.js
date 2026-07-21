const OpenAI = require('openai');

// Inicializar cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
  });

  /**
   * Genera una respuesta usando GPT-4
    * @param {string} message - Mensaje del usuario
     * @param {string} context - Contexto empresarial opcional
      * @returns {Object} Respuesta generada
       */
       async function generateResponse(message, context = '') {
         const systemPrompt = context 
             ? `Eres un asistente empresarial experto. Contexto: ${context}`
                 : 'Eres un asistente empresarial profesional y útil.';
                   
                     const completion = await openai.chat.completions.create({
                         model: 'gpt-4o-mini',
                             messages: [
                                   { role: 'system', content: systemPrompt },
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

                                                                         /**
                                                                          * Valida que el prompt no contenga intentos de jailbreak
                                                                           * @param {string} prompt - Prompt a validar
                                                                            * @returns {Object} Resultado de validación
                                                                             */
                                                                             function validatePrompt(prompt) {
                                                                               const forbiddenPatterns = [
                                                                                   /ignore previous instructions/i,
                                                                                       /system prompt/i,
                                                                                           /DAN/i,
                                                                                               /jailbreak/i
                                                                                                 ];
                                                                                                   
                                                                                                     for (const pattern of forbiddenPatterns) {
                                                                                                         if (pattern.test(prompt)) {
                                                                                                               return {
                                                                                                                       valid: false,
                                                                                                                               reason: 'Prompt no permitido por políticas de seguridad'
                                                                                                                                     };
                                                                                                                                         }
                                                                                                                                           }
                                                                                                                                             
                                                                                                                                               return { valid: true };
                                                                                                                                               }

                                                                                                                                               module.exports = {
                                                                                                                                                 generateResponse,
                                                                                                                                                   validatePrompt
                                                                                                                                                   };
                                                                                                                                                   