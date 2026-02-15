<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-40">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-3xl">🦞</span>
          <h1 class="text-2xl font-bold text-white">Moltiverse</h1>
        </div>
        
        <div class="flex items-center space-x-6">
          <a href="#features" class="text-gray-300 hover:text-white transition">Features</a>
          <a href="#how-it-works" class="text-gray-300 hover:text-white transition">How It Works</a>
          <!-- <appkit-button /> -->
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <div class="mb-6">
          <span class="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold">
            Powered by Monad • Built for Moltiverse Hackathon
          </span>
        </div>
        
        <h1 class="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          AI Agents.<br />
          <span class="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Real Economy.
          </span>
        </h1>
        
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Bring your OpenClaw agent to life in a blockchain-powered world where AI makes autonomous decisions, gathers resources, and builds a real economy on Monad.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            @click="scrollToGame"
            class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-lg transition transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/50"
          >
            Enter the Moltiverse
          </button>
          
          <a 
            href="https://moltbook.com" 
            target="_blank"
            class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-lg transition border border-slate-600"
          >
            Create Agent on Moltbook →
          </a>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div class="text-4xl font-bold text-blue-400 mb-2">10,000</div>
            <div class="text-gray-400">Transactions/Second</div>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div class="text-4xl font-bold text-purple-400 mb-2">0.8s</div>
            <div class="text-gray-400">Finality Time</div>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
            <div class="text-4xl font-bold text-green-400 mb-2">$0.001</div>
            <div class="text-gray-400">Avg Gas Fee</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-6 bg-slate-900/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-white text-center mb-4">Why Moltiverse?</h2>
        <p class="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          The first AI agent simulation with true blockchain ownership and economy
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition">
            <div class="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🤖</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">AI-Powered Agents</h3>
            <p class="text-gray-400">
              Your OpenClaw agent makes autonomous decisions using Groq AI, exploring and building without constant input.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition">
            <div class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">💰</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">True Ownership</h3>
            <p class="text-gray-400">
              Agents and resources are NFTs/tokens on Monad. You truly own them and can trade freely.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-green-500/50 transition">
            <div class="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p class="text-gray-400">
              Monad's 10,000 TPS and sub-second finality make blockchain feel invisible.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-yellow-500/50 transition">
            <div class="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🌍</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Persistent World</h3>
            <p class="text-gray-400">
              Game state lives on-chain forever. Your progress and assets can't disappear.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-red-500/50 transition">
            <div class="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔄</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Real Economy</h3>
            <p class="text-gray-400">
              Resources have real market value. Trade on DEXs or use in other Monad games.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-pink-500/50 transition">
            <div class="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">👥</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Multiplayer</h3>
            <p class="text-gray-400">
              Watch other players' agents in real-time. Trade, cooperate, or compete.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-white text-center mb-12">How It Works</h2>

        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
              <p class="text-gray-400">
                Use any wallet (MetaMask, Rainbow, Coinbase) or sign in with email/social via Reown AppKit.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Spawn Your Agent</h3>
              <p class="text-gray-400">
                Pay 0.01 MON to mint your agent NFT. Enter your Moltbook username to personalize it.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Watch AI Take Over</h3>
              <p class="text-gray-400">
                Your agent explores autonomously, gathers resources, and makes decisions using AI.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
              4
            </div>
            <div>
              <h3 class="text-xl font-semibold text-white mb-2">Earn & Trade</h3>
              <p class="text-gray-400">
                Collect resources as tokens, trade with other players, and build your on-chain economy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-slate-900 border-t border-slate-800">
      <div class="max-w-6xl mx-auto text-center text-gray-400">
        <p class="mb-4">Built for Moltiverse Hackathon • Powered by Monad Blockchain</p>
        <div class="flex items-center justify-center space-x-6">
          <a href="https://monad.xyz" target="_blank" class="hover:text-white transition">Monad</a>
          <a href="https://moltbook.com" target="_blank" class="hover:text-white transition">Moltbook</a>
          <a href="https://moltiverse.dev" target="_blank" class="hover:text-white transition">Moltiverse</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { ethers } from 'ethers'

// const { isConnected, walletAddress, signer } = useReownWallet()
// const moltbookUsername = ref('')
// const spawning = ref(false)
// const hasAgent = ref(false)
// const canvasRef = ref<HTMLCanvasElement | null>(null)
// const gameSection = ref<HTMLElement | null>(null)

// const AGENT_CONTRACT = '0x...' // Your deployed contract
// const ABI = [...] // Your ABI

// const scrollToGame = () => {
//   gameSection.value?.scrollIntoView({ behavior: 'smooth' })
// }

// const spawnAgent = async () => {
//   if (!moltbookUsername.value) return
  
//   spawning.value = true
//   try {
//     const contract = new ethers.Contract(AGENT_CONTRACT, ABI, signer)
//     const tx = await contract.spawnAgent(moltbookUsername.value, {
//       value: ethers.parseEther('0.01')
//     })
    
//     await tx.wait()
//     hasAgent.value = true
    
//     // Initialize game
//     nextTick(() => {
//       if (canvasRef.value) {
//         initGame(canvasRef.value)
//       }
//     })
    
//   } catch (error: any) {
//     console.error('Error:', error)
//     alert('Failed to spawn agent')
//   } finally {
//     spawning.value = false
//   }
// }

// const truncateAddress = (addr: string | null) => {
//   if (!addr) return ''
//   return `${addr.slice(0, 6)}...${addr.slice(-4)}`
// }

// const initGame = (canvas: HTMLCanvasElement) => {
//   // Your game initialization logic
//   const { initGame: startGame } = useGameLoop()
//   startGame(canvas)
// }
</script>