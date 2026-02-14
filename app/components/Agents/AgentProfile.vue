<script setup lang="ts">
const { selectedAgent, agents } = useGameLoop()

const getCountryColor = (country: 'A' | 'B') => {
  return country === 'A' ? '#e74c3c' : '#3498db'
}

const getAgentName = (id: string) => {
  return agents.value.find(a => a.id === id)?.name || 'Unknown'
}

</script>

<template>
  <div class="absolute right-4 top-24 w-80 bg-slate-800/95 backdrop-blur rounded-lg border border-slate-600 shadow-2xl">
    <!-- Header -->
    <div class="p-4 border-b border-slate-600 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div 
          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
          :style="{ backgroundColor: getCountryColor(selectedAgent.country) }"
        >
          {{ selectedAgent.name.charAt(0) }}
        </div>
        <div>
          <h3 class="text-lg font-bold text-white">{{ selectedAgent.name }}</h3>
          <p class="text-sm text-slate-400">{{ selectedAgent.role }}</p>
        </div>
      </div>
      <button 
        @click="selectedAgent = null"
        class="text-slate-400 hover:text-white"
      >
        ✕
      </button>
    </div>
    
    <!-- Stats -->
    <div class="p-4 space-y-3">
      <div class="flex justify-between text-sm">
        <span class="text-slate-400">Country</span>
        <span class="text-white font-semibold">
          {{ selectedAgent.country === 'A' ? '🔴 Redland' : '🔵 Blueland' }}
        </span>
      </div>
      
      <div class="flex justify-between text-sm">
        <span class="text-slate-400">Age</span>
        <span class="text-white font-semibold">{{ Math.floor(selectedAgent.age) }} cycles</span>
      </div>
      
      <div class="flex justify-between text-sm">
        <span class="text-slate-400">Wealth</span>
        <span class="text-white font-semibold">{{ selectedAgent.wealth.toFixed(0) }} MON</span>
      </div>
      
      <div class="flex justify-between text-sm">
        <span class="text-slate-400">Status</span>
        <span :class="selectedAgent.isAlive ? 'text-green-400' : 'text-red-400'">
          {{ selectedAgent.isAlive ? '✓ Alive' : '✗ Dead' }}
        </span>
      </div>
      
      <div class="flex justify-between text-sm">
        <span class="text-slate-400">Activity</span>
        <span class="text-white font-semibold">{{ selectedAgent.currentActivity }}</span>
      </div>
      
      <!-- Health/Hunger Bars -->
      <div class="space-y-2">
        <div>
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>Health</span>
            <span>{{ selectedAgent.health.toFixed(0) }}%</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div 
              class="bg-green-500 h-2 rounded-full transition-all"
              :style="{ width: `${selectedAgent.health}%` }"
            />
          </div>
        </div>
        
        <div>
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>Hunger</span>
            <span>{{ selectedAgent.hunger.toFixed(0) }}%</span>
          </div>
          <div class="w-full bg-slate-700 rounded-full h-2">
            <div 
              class="bg-orange-500 h-2 rounded-full transition-all"
              :style="{ width: `${selectedAgent.hunger}%` }"
            />
          </div>
        </div>
      </div>
      
      <!-- Family -->
      <div v-if="selectedAgent.spouse || selectedAgent.children.length" class="pt-3 border-t border-slate-600">
        <h4 class="text-sm font-semibold text-slate-300 mb-2">Family</h4>
        <div class="text-xs text-slate-400 space-y-1">
          <div v-if="selectedAgent.spouse">
            Spouse: <span class="text-white">{{ getAgentName(selectedAgent.spouse) }}</span>
          </div>
          <div v-if="selectedAgent.children.length">
            Children: <span class="text-white">{{ selectedAgent.children.length }}/2</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
