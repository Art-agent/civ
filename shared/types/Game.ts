// This file contains the types and interfaces for important game elements like position and the like

// import type { Agent } from "./Agent";

export interface Position {
  x: number
  y: number
}

export type CountryChoice = 'Aurelia' | 'Eurelia' | 'Asyra' | 'Afryt';

export type GameActivityType = 'birth' | 'death'
  | 'marriage' | 'war'
  | 'peace' | 'economic'
  | 'judicial' | 'religious';

export interface GameActivity {
  id: string
  timestamp: number
  activityName?: string
  message: string
  type: GameActivityType
}

export interface Country {
  id: CountryChoice
  name: CountryChoice
  color: number // hex for rendering country color
  leader: string // We could do this (agent id) or we could do Agent
  agentCount: number // This is the count of agents in a country to be updated at all times
  territory: Position[] // A birectional array making it a boxed territory btw
  atWar: boolean
  warTarget?: CountryChoice
  laws: string[] // Laws of the country each agent is supposed to abide by
  treasury: number // important wealth of the nation, will include seperate currencies later
  /**
   * Important note: MON will be the currency used across all governments interacting with each other
   * However in each individual country they have their own currencies but paired to MON
   * Some countries will obviously have less than the other.
   * Rate of country currency is simple driven by simple demand and supply:
   * 1000 of the STRONGEST currency is 1 MON
   * This feature may be implemented later
   * current feature is simple one currency across the board. 1000 of each currency is for 1 MON
   */
}

export interface House {
  id: string
  position: Position[] // Just the coordinates of the House
  occupants: string[] // Again either agents or agent id
  country: CountryChoice
  sprite?: any
}