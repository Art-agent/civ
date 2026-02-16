<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const {
  initGame,
  selectedAgent
} = useGameLoop();

onMounted(async () => {
  if (canvasRef.value) {
    console.log('Init');
    await initGame(canvasRef.value)
  }
})
</script>

<template>
  <div class="relative w-full h-full bg-slate-900">
    <!-- PixiJS Canvas for the world -->
    <canvas ref="canvasRef" class="w-full h-full" />
    <AgentsAgentInfoPanel 
      :agent="selectedAgent" 
      @close="selectedAgent = null"
    />
  </div>
</template>