// config/appkit.ts
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from "wagmi";
import { monad, monadTestnet } from '@reown/appkit/networks'

// const runtimeConfig = useRuntimeConfig();

export const projectId = process.env.NUXT_PUBLIC_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID'

export const networks = [monad]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig