import type { Agent, AgentRole, AgentActivity, AgentInclination } from '#shared/types/Agent';
import type { Country, CountryChoice, Position, House, GameActivity } from '#shared/types/Game';
import { useAgents } from "./useAgents";

export const useGroq = () => {
  // We are going to have to hook up agents to this agent
  /**
  WORLD CONTEXT:
  - Territory bounds: x(${worldContext.bounds.minX}-${worldContext.bounds.maxX}), y(${worldContext.bounds.minY}-${worldContext.bounds.maxY})
  - Current position: (${agent.x}, ${agent.y})
  - Current direction: ${agent.direction}
   */
  const getAgentDecision = async (agent: any, worldContext: any) => {
    const groq_system_prompt = `You are the brain of an AI agent in a simple world simulation. 
    Your role is to decide what this agent should do next.
    
    
    IGNORE WORLD CONTEXT AND SIMPLY WING THE BOUNDS WITH THESE INSTEAD:
    - Territory bounds: x(100), y(800)
    - Current position: (150, 450)
    - Current direction: left
    
    AGENT PERSONALITY:
    - Curious and likes to explore
    - Occasionally pauses to think
    - Wanders around the territory
    
    YOUR TASK:
    Decide what the agent should do next. You can choose:
    1. Move to a specific location (give x, y coordinates within bounds)
    2. Stay idle and think
    
    Respond ONLY with valid JSON in this exact format:
    {
      "action": "move" or "idle",
      "target": {"x": number, "y": number} (only if action is "move"),
      "thought": "A brief thought the agent is having (1 sentence max)"
    }
    
    Keep thoughts short and natural. Examples: "I wonder what's over there?", "Time to explore the eastern side", "Let me rest here for a moment"`
  
    const groq_user_query = `The agent is currently at position (150, 400). What should they do next?`
    try {
      const querybody = {
        system_prompt: groq_system_prompt,
        user_prompt: groq_user_query
      }
      var response = await useFetch('/api/agent-decision', {
        method: 'POST',
        body: JSON.stringify(querybody),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // if (!chat_response.ok) {
      //   throw new Error('Groq error')
      // }
      console.log(`AI response: ${response.data}`)
      console.log(response.data)
      
    } catch (error) {
      throw new Error(`Nothing from groq:${error}`)
    }
  }
  
  return {
    getAgentDecision,
  }
}