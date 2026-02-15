<script setup lang="ts">
import { createAppKit } from '@reown/appkit/vue'
import { wagmiAdapter, networks, projectId } from './config/appkit'

// const config = useRuntimeConfig()
// const projectId = config.public.reown_project_id

const metadata = {
  name: 'Civ',
  description: 'A monad powered agent world',
  url: 'https://civ-woad.vercel.app/',
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
