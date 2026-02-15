<script setup lang="ts">
import { createAppKit } from '@reown/appkit/vue'
import { wagmiAdapter, networks, projectId } from './config/appkit'

const metadata = {
  name: 'Civ',
  description: 'A monad powered agent world',
  url: 'http://localhost:3000/',
  icons: ['https://avatars.mywebsite.com/']
}

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: metadata
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
