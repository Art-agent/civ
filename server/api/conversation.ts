import Groq from "groq-sdk";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const { agent1, agent2 } = body;
  const config = useRuntimeConfig();
  const groq_api_key = config.groq_conversation_key;
  
  const groq = new Groq({
    apiKey: groq_api_key
  });
  
  const systemPrompt = `You are generating a brief, natural conversation between two AI agents who just met.
  
  Agent 1: ${agent1.name} (${agent1.role})
  ${agent1.inclination !== 'none' ? `- Inclination: ${agent1.inclination}` : ''}
  
  Agent 2: ${agent2.name} (${agent2.role})
  ${agent2.inclination !== 'none' ? `- Inclination: ${agent2.inclination}` : ''}
  
  Generate a short, natural 2-line exchange. Each agent says ONE thing (max 15 words each).
  Make it contextual to their roles and inclinations.
  
  Examples:
  - Citizen meets Judge: "Hello judge, is everything lawful today?" / "Indeed, citizen. Stay safe."
  - Priest meets Merchant: "Blessings on your business!" / "Thank you, father. Trade is good."
  
  Respond ONLY with JSON:
  {
    "agent1_message": "...",
    "agent2_message": "..."
  }`;
  
  
  try {
    const chat_completions = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: "Generate the conversation"
        }
      ],
      model: "compound-beta-mini",
      temperature: 0.9,
    });
    
    const chat_results = chat_completions.choices[0]!.message.content;
    
    const clean_result = chat_results!.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const conversation = JSON.parse(clean_result);
    console.log(`Clean agent decision: `, conversation);
    
    return conversation
  } catch (error) {
    console.log(`An error occurred`, error)
    return {
      agent1_message: `Hello, ${agent2.name}!`,
      agent2_message: `Greetings, ${agent1.name}!`,
    };
  }
  
})