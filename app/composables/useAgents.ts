import type { Agent, AgentRole, AgentActivity, AgentInclination } from '#shared/types/Agent';
import type { Country, CountryChoice, Position, House, GameActivity } from '#shared/types/Game';

export const useAgents = () => {
  const agents = useState<Agent[]>('agents', () => [])
  
  const createAgent = (
    name: string,
    country: CountryChoice,
    position: Position,
    role: AgentRole
  ): Agent => {
    return {
      id: crypto.randomUUID(),
      name,
      country,
      position,
      targetPosition: { ...position },
      age: 0,
      isAlive: true,
      children: [],
      gender: 'male',
      role,
      wealth: 50,
      hunger: 50,
      health: 100,
      currentActivity: 'idle',
      inclination: 'none'
    }
  }
  
  const spawnInitialAgents = () => {
    agents.value = [
      createAgent('Alice', 'Aurelia', { x: 200, y: 300 }, 'citizen'),
      createAgent('Alice', 'Aurelia', { x: 200, y: 300 }, 'citizen')
    ]
  }
  
  const updateAgentBehavior = (agent: Agent, deltaTime: number) => {
    if (!agent.isAlive) return
      
    // Age agents slowly
    agent.age += deltaTime * 0.0001
      
    // Hunger increases over time
    agent.hunger = Math.min(100, agent.hunger + deltaTime * 0.01)
      
    // Simple AI: Random walk when idle
    if (agent.currentActivity === 'idle') {
      if (Math.random() < 0.02) {
        // Set new target position
        agent.targetPosition = {
          x: Math.max(50, Math.min(750, agent.position.x + (Math.random() - 0.5) * 200)),
          y: Math.max(50, Math.min(550, agent.position.y + (Math.random() - 0.5) * 200))
        }
        agent.currentActivity = 'walking'
      }
    }
      
    // Move towards target
    if (agent.currentActivity === 'walking') {
      const dx = agent.targetPosition.x - agent.position.x
      const dy = agent.targetPosition.y - agent.position.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 2) {
        const speed = 1
        agent.position.x += (dx / distance) * speed
        agent.position.y += (dy / distance) * speed
      } else {
        agent.currentActivity = 'idle'
      }
    }
      
    // Death conditions
    if (agent.hunger >= 100) {
      agent.isAlive = false
      agent.currentActivity = 'idle'
    }
  }
  
  return {
      agents,
      createAgent,
      spawnInitialAgents,
      updateAgentBehavior
    }
}
