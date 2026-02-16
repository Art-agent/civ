<script setup lang="ts">
import type { Agent } from '~/shared/types/Agent'

defineProps<{
  agent: Agent | null
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <div 
    v-if="agent" 
    class="fixed right-4 top-20 w-80 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-6 shadow-2xl z-50"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-white">Agent Info</h3>
      <button 
        @click="$emit('close')"
        class="text-gray-400 hover:text-white transition"
      >
        ✕
      </button>
    </div>

    <!-- Agent Name & Role -->
    <div class="mb-6">
      <div class="text-2xl font-bold text-blue-400 mb-1">
        🦞 {{ agent.name }}
      </div>
      <div class="text-sm text-gray-400 uppercase tracking-wide">
        {{ agent.role }}
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="space-y-3 mb-6">
      <!-- Health -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-400">Health</span>
          <span class="text-white font-semibold">{{ agent.health }}%</span>
        </div>
        <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            class="h-full bg-green-500 transition-all"
            :style="{ width: `${agent.health}%` }"
          ></div>
        </div>
      </div>

      <!-- Hunger -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-400">Hunger</span>
          <span class="text-white font-semibold">{{ agent.hunger }}%</span>
        </div>
        <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            class="h-full bg-orange-500 transition-all"
            :style="{ width: `${agent.hunger}%` }"
          ></div>
        </div>
      </div>

      <!-- Wealth -->
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-400">Wealth</span>
          <span class="text-yellow-400 font-semibold">{{ agent.wealth }} 💰</span>
        </div>
      </div>
    </div>

    <!-- Personal Info -->
    <div class="border-t border-slate-700 pt-4 mb-4 space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Age</span>
        <span class="text-white">{{ agent.age }} years</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Gender</span>
        <span class="text-white capitalize">{{ agent.gender }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Country</span>
        <span class="text-white">{{ agent.country }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Activity</span>
        <span class="text-blue-400 capitalize">{{ agent.currentActivity }}</span>
      </div>
    </div>

    <!-- Inclination -->
    <div v-if="agent.inclination !== 'none'" class="border-t border-slate-700 pt-4 mb-4">
      <div class="text-sm text-gray-400 mb-1">Inclination</div>
      <div class="text-white capitalize">{{ agent.inclination }}</div>
      <div v-if="agent.inclinationMessage" class="text-xs text-gray-400 mt-1 italic">
        "{{ agent.inclinationMessage }}"
      </div>
    </div>

    <!-- Family -->
    <div v-if="agent.spouse || agent.children.length > 0" class="border-t border-slate-700 pt-4">
      <div class="text-sm text-gray-400 mb-2">Family</div>
      <div v-if="agent.spouse" class="text-sm text-white mb-1">
        💍 Spouse: {{ agent.spouse }}
      </div>
      <div v-if="agent.children.length > 0" class="text-sm text-white">
        👶 Children: {{ agent.children.length }}
      </div>
    </div>

    <!-- Position (for debugging) -->
    <div class="border-t border-slate-700 pt-4 mt-4">
      <div class="text-xs text-gray-500">
        Position: ({{ Math.round(agent.position.x) }}, {{ Math.round(agent.position.y) }})
      </div>
      <div v-if="agent.walletAddress" class="text-xs text-gray-500 mt-1 truncate">
        Wallet: {{ agent.walletAddress.slice(0, 6) }}...{{ agent.walletAddress.slice(-4) }}
      </div>
    </div>
  </div>
</template>

