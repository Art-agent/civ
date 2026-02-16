// import { supabase } from "../utils/supabase";
import type { Agent } from "#shared/types/Agent"
import { createClient } from "@supabase/supabase-js";


export const useDatabase = () => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseKey
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const createAgent = async (agent: Partial<Agent>): Promise<Agent | null> => {
    const { data, error } = await supabase
      .from('agents')
      .insert({
        wallet_address: agent.wallet_address!,
        name: agent.name,
        country: agent.country || 'Aurelia',
        position_x: agent.position?.x || 300,
        position_y: agent.position?.y || 300,
        age: agent.age || 20,
        gender: agent.gender || 'male',
        role: agent.role || 'citizen',
        wealth: agent.wealth || 100,
        hunger: agent.hunger || 100,
        health: agent.health || 100,
      })
      .select()
      .single()
  
    if (error) {
      console.error(`An error occurred while creating agent: ${error}`)
      return null
    }
    return dbAgentToAgent(data)
  }
  
  const getAllAgents = async (): Promise<Agent[]> => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_alive', true)
    if (error) {
      console.error(`An error occurred while fetching all agents: ${error}`)
      return []
    }
    return data.map(dbAgentToAgent);
  }
  
  const updateAgentPosition = async (agentId: string, position: Position) => {
    const { data, error } = await supabase
      .from('agents')
      .update({ position_x: position.x, position_y: position.y })
      .eq('id', agentId)
    if (error) {
      console.log(`An error occurred while updating location: ${error}`)
    }
  }
  
  const getAllBuildings = async () => {
    const { data, error } = await supabase
      .from('buildings')
      .select('*')
        
    if (error) {
      console.error('Error fetching buildings:', error)
      return []
    }
        
    return data
  }
  const getAllCountries = async () => {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
        
    if (error) {
      console.error('Error fetching buildings:', error)
      return []
    }
        
    return data
  }
  
  const subscribeToAgents = (callback: (agents: Agent[]) => void) => {
    const subscription = supabase
      .channel('agents-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'agents' },
        async () => {
          const agents = await getAllAgents()
          callback(agents)
        }
      )
      .subscribe()
      
    return subscription
  }
  
  const storeConversation = async (
    agent1Id: string,
    agent2Id: string,
    agent1Message: string,
    agent2Message: string,
    location: Position
  ) => { 
    const { error } = await supabase
      .from('conversations')
      .insert({
        agent1_id: agent1Id,
        agent2_id: agent2Id,
        agent1_message: agent1Message,
        agent2_message: agent2Message,
        location_x: location.x,
        location_y: location.y,
      })
      
      if (error) {
        console.error('Error storing conversation:', error)
      } else {
        console.log('✅ Conversation saved to database')
      }
  }
  
  const dbAgentToAgent = (dbAgent: any): Agent => {
    return {
      id: dbAgent.id,
      wallet_address: dbAgent.wallet_address,
      name: dbAgent.name,
      country: dbAgent.country,
      position: { x: dbAgent.position_x, y: dbAgent.position_y },
      targetPosition: { 
        x: dbAgent.target_x || dbAgent.position_x, 
        y: dbAgent.target_y || dbAgent.position_y 
        },
      age: dbAgent.age,
      gender: dbAgent.gender,
      isAlive: dbAgent.is_alive,
      house: dbAgent.house,
      spouse: dbAgent.spouse,
      children: dbAgent.children || [],
      role: dbAgent.role,
      wealth: dbAgent.wealth,
      hunger: dbAgent.hunger,
      health: dbAgent.health,
      currentActivity: dbAgent.current_activity,
      inclination: dbAgent.inclination,
      inclinationMessage: dbAgent.inclination_message,
    }
  }
  return {
    supabase,
    createAgent,
    getAllAgents,
    updateAgentPosition,
    getAllBuildings,
    getAllCountries,
    storeConversation,
    subscribeToAgents,
  }
}