<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const {
  initGame,
  agents,
  isPaused,
  togglePause,
  selectedAgent
} = useGameLoop();

const { getAgentDecision } = useGroq();

onMounted(async () => {
  if (canvasRef.value) {
    console.log('Init');
    await initGame(canvasRef.value)
    // await getAgentDecision()
  }
})
</script>

<template>
  <div class="relative w-full h-full bg-slate-900">
    <!-- PixiJS Canvas for the world -->
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>