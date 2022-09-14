import type { NextPage } from 'next'
import Head from 'next/head'
import { useTokensQuery } from '../../hooks/useTokensQuery'
import { ourCollection } from '../../constants/Constants'
import { NFTObject, Networks, Strategies } from '@zoralabs/nft-hooks'
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components'
import { NFTGridLoadMore } from '../../components/NFTGridLoadMore'

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
  Networks.MAINNET
)

const STYLE_OVERRIDE = {
  theme: {
  bodyFont: `font-family: courier, "Courier New", andale mono, monaco, monospace, sans serif;`,
  titleFont: `font-family: courier, "Courier New", andale mono, monaco, monospace, sans serif;`,
  borderStyle: "dashed 1px",
  defaultBorderRadius: 0,
  preferredIPFSGateway: "https://ipfs.io/ipfs/",
  showOwner: false,
  showCreator: false,
  previewCard: {
      background: '#f5f5f5'
  },
  padding: '3px',
  showTxnLinks: true,
  useEnsResolution: true,
  useCollectionTag: true,
  },
};

const Gallery: NextPage = () => {
  const {
    data,
    isReachingEnd,
    isValidating,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress: ourCollection,
    pageSize: 16
  })

  console.log('isReachingEnd', isReachingEnd)
  
  return (
    <div>
      <Head>
        <title>✧unun.gallery</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-around' style={{paddingTop: 100, paddingBottom: 200}}>
        <div className='w-[100%] text-center'>
          view on <a href={`https://market.zora.co/collections/${ourCollection}`} target={`_blank`}>zora</a> / <a href="https://opensea.io/collection/un000-inicio" target={`_blank`}>opensea</a>
        </div>        
        <div className="flex flex-row flex-wrap justify-center space-x-4 items-center mb-10 md:mb-0">
          {data && data.map((nft: NFTObject) =>
            
            <MediaConfiguration
              key={`${nft?.nft?.tokenId}-${ourCollection}`} 
              style={STYLE_OVERRIDE}
              networkId="1"
              strategy={zdkStrategyMainnet}
              strings={{
                CARD_OWNED_BY: "↳",
                CARD_CREATED_BY: "↳",              
              }}
            >
              <NFTPreview                 
                contract={ourCollection} 
                id={nft?.nft?.tokenId} 
                href={`https://zora.co/collections/${ourCollection}/${nft?.nft?.tokenId}`}
                showBids={false}
                showPerpetual={false}
              />
            </MediaConfiguration>
          )}
        </div>
        {/* IF YOU WANT A BUTTON: <button onClick={handleLoadMore}>Load More</button>*/}
        <NFTGridLoadMore
          showObserver
          isValidating={isValidating}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  )
}

export default Gallery