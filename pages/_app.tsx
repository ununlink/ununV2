import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { AppWrapper } from '../context/useAppContext';
import Layout from '../components/Layout';

import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => (chain.id === 1 ? { http: `https://rpc.ankr.com/eth` } : null)
    }),
    publicProvider()
  ]
);



const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export const strategy = new ZDKFetchStrategy('1', 'https://api.zora.co/graphql')

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains} 
        theme={darkTheme({
          borderRadius: "large",
          accentColor: "none",
          accentColorForeground: "white"
      })}>
        <NFTFetchConfiguration networkId="1" strategy={strategy}>
        <Layout>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Layout>
        </NFTFetchConfiguration>
      </RainbowKitProvider>
    </WagmiConfig>        
  )
}

export default MyApp
