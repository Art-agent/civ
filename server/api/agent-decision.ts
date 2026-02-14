import Groq from "groq-sdk";
// import { useRuntimeConfig } from "nuxt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const runtimeConfig = useRuntimeConfig();
  const groq_api_key = runtimeConfig.groq_api_key;
  const groq = new Groq({
    apiKey: groq_api_key
  });
  try {
    
    const system_prompt = `${body.system_prompt}`;
    const user_prompt = `${body.user_prompt}`;
    
    // console.log(`System prompt is: ${system_prompt}`)
    // console.log(`User prompt is: ${user_prompt}`)
    
    const chat_completions = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system_prompt
        },
        {
          role: "user",
          content: user_prompt
        }
      ],
      model: "compound-beta",
      temperature: 0.8,
      
    })
    const chat_results = chat_completions.choices[0]!.message.content;
    
    const clean_result = chat_results!.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const decision = JSON.parse(clean_result);
    console.log(`Clean agent decision: `, decision);
    
    return decision
    
  } catch (error) {
    console.log(`Error: ${error}`)
    return {
      action: 'move',
      // target: {
      //   x: worldContext.bounds.minX + Math.random() * (worldContext.bounds.maxX - worldContext.bounds.minX),
      //   y: worldContext.bounds.minY + Math.random() * (worldContext.bounds.maxY - worldContext.bounds.minY),
      // },
      thought: 'Just wandering around...'
    };
  }
  
})