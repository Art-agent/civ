// This file has what the agent(person) will have, its properties and all that
import type { Position, CountryChoice, GameActivity } from "./Game" // This isn't supposed to be, perhaps because its type?

export type AgentRole = 'citizen' | 'leader'
  | 'judge' | 'economist'
  | 'student' | 'priest'
  | 'teacher' | 'worker'
  | 'soldier' | 'CEO'
  | 'merchant';

export type AgentActivity = 'idle' | 'walking'
  | 'working' | 'eating'
  | 'sleeping' | 'fighting'
  | 'socializing' | 'praying';

export type AgentInclination = 'none' | 'religious' | 'activism'; // will increase this as time goes
// For now agent can be inclined to religion and activism about something

export interface Agent {
  id: string
  wallet_address?: string
  name: string
  country: CountryChoice
  position: Position
  targetPosition: Position
  age: number
  gender: 'male' | 'female'
  isAlive: boolean
  house?: string // This should be boolean right?
  spouse?: string // This string will probably contain the id of the agent
  children: string[] // For now a maximum of 2 children
  role: AgentRole
  wealth: number
  hunger: number // from 0 to 100
  health: number // from 0 to 100
  // setAnimation(animationName: string)?: void
  // update()?: void
  currentActivity: AgentActivity // This is meant to resonate with game activity for important events
  gameActivity?: GameActivity
  inclination: AgentInclination
  inclinationMessage?: string // This is important context for the agent when it is inclined, else it can be null or skipped
  sprite?: any // What the agent looks like
}