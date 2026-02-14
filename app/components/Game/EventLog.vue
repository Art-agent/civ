<script setup lang="ts">
import type { GameEvent } from '~/types/game'

const { events } = useGameLoop()

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

const getEventColor = (type: GameEvent['type']) => {
  const colors = {
    birth: 'text-green-400',
    death: 'text-red-400',
    marriage: 'text-pink-400',
    war: 'text-orange-400',
    peace: 'text-blue-400',
    economic: 'text-yellow-400',
    judicial: 'text-purple-400',
    religious: 'text-cyan-400'
  }
  return colors[type] || 'text-slate-300'
}
</script>

<template>
  <div class="absolute left-4 bottom-4 w-96 max-h-48 overflow-y-auto bg-black/80 backdrop-blur rounded-lg p-3 space-y-1">
    <h3 class="text-xs font-semibold text-slate-400 mb-2">EVENT LOG</h3>
    <div
      v-for="event in events.slice(0, 10)"
      :key="event.id"
      class="text-xs font-mono"
    >
      <span class="text-slate-500">[{{ formatTime(event.timestamp) }}]</span>
      <span :class="getEventColor(event.type)" class="ml-2">
        {{ event.message }}
      </span>
    </div>
  </div>
</template>
