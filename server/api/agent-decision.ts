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
    
    console.log(`System prompt is: ${system_prompt}`)
    console.log(`User prompt is: ${user_prompt}`)
    
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
      model: "compound-beta-mini",
      temperature: 0.8,
    })
    const chat_results = chat_completions.choices[0]!.message.content;
    
    const clean_result = chat_results!.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const decision = JSON.parse(clean_result);
    console.log(`Clean agent decision: `, decision);
    
    return decision
    // return {
    //   action: 'move',
    //   target: {
    //     x: Math.floor(Math.random() * 661) + 120,
    //     y: Math.floor(Math.random() * 661) + 120,
    //   },
    //   thought: 'Just wandering around...'
    // }; This is for testing purposes btw
    
  } catch (error) {
    console.log(`Error: ${error}`)
    console.log("sending hardcoded values")
    return {
      action: 'move',
      target: {
        x: 300,
        y: 500,
      },
      thought: 'Just wandering around...'
    };
  }
  
})