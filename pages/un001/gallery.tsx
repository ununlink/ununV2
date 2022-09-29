import type { NextPage } from 'next'
import Head from 'next/head'
import { useTokensQuery } from '../../hooks/useTokensQuery'
import { ourCollection2 } from '../../constants/Constants'
import { NFTObject, Networks, Strategies } from '@zoralabs/nft-hooks'
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components'
import { NFTGridLoadMore } from '../../components/NFTGridLoadMore'
import Image from 'next/image'

const contract = ourCollection2

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
    contractAddress: contract,
    pageSize: 12
  })

  /// aqui es donde puedes accesar la metadata de cada nft
  console.log("data: ", data)
  console.log("https://ipfs.io/ipfs/"+data[0].media.image.uri.split("://").pop())
  ///

  /// this provides a front end check for the infinite scroll check
  console.log('isReachingEnd', isReachingEnd)
  
  return (
    <div>
      <Head>
        <title>✧unun.ocelo</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-around pb-20 py-20'>
        <div className='w-[100%] text-center'>
          view on <a href={`https://market.zora.co/collections/${contract}`} target={`_blank`}>zora</a> / <a href="https://opensea.io/collection/un001-ocelo" target={`_blank`}>opensea</a>
        </div>        
        <div className="flex flex-row flex-wrap justify-center items-center mb-10 md:mb-0">
          <div className="text-center mb-1">
            <Image  width={500}
                height={500} src={`https://ipfs.io/ipfs/`+data[1].media.image.uri.split("://").pop()} />
          </div>
          {data && data.map((nft: NFTObject) =>
            
            <MediaConfiguration
              key={`${nft?.nft?.tokenId}-${contract}`} 
              style={STYLE_OVERRIDE}
              networkId="1"
              strategy={zdkStrategyMainnet}
              strings={{
                CARD_OWNED_BY: "↳",
                CARD_CREATED_BY: "↳",              
              }}
            >
              <NFTPreview                 
                contract={contract} 
                id={nft?.nft?.tokenId} 
                href={`https://zora.co/collections/${contract}/${nft?.nft?.tokenId}`}
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