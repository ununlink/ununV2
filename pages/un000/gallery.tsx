import type { NextPage } from 'next'
import Head from 'next/head'
import { useTokensQuery } from '../../hooks/useTokensQuery'
import { ourCollection } from '../../constants/Constants'
import { NFTObject, Networks, Strategies } from '@zoralabs/nft-hooks'
import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components'
import { NFTGridLoadMore } from '../../components/NFTGridLoadMore'
import Image from 'next/image'
import Link from 'next/link'

const contract = ourCollection

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
  Networks.MAINNET
)

const STYLE_OVERRIDE = {
  theme: {
  bodyFont: `font-family: courier, "Courier New", andale mono, monaco, monospace, sans serif;`,
  titleFont: `font-family: courier, "Courier New", andale mono, monaco, monospace, sans serif;`,
  linkColor: 'var(--main-color)',
  borderStyle: "dashed 1px",
  defaultBorderRadius: 10,
  preferredIPFSGateway: "https://ipfs.io/ipfs/",
  showOwner: false,
  showCreator: false,
  previewCard: {
      background: 'var(--bg-color)'
  },
  padding: '3px',
  showTxnLinks: true,
  useEnsResolution: true,
  useCollectionTag: true,
  },
};

function imageIndex(tokenIndex){
  if (tokenIndex < 10){
    return "000000";
  } else if (tokenIndex >= 10 && tokenIndex < 100){
    return "00000";
  } else {
    return "0000";
  }
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
  ///

  /// this provides a front end check for the infinite scroll check
  console.log('isReachingEnd', isReachingEnd)
  
  return (
    <div>
      <Head>
        <title>✧unun/inicio</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex flex-col justify-around pb-20 my-20'>
               
        <div className="flex flex-row flex-wrap justify-center items-center mb-10 md:mb-0">
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
              {/* <NFTPreview                 
                contract={contract} 
                id={nft?.nft?.tokenId} 
                href={`https://zora.co/collections/${contract}/${nft?.nft?.tokenId}`}
                showBids={false}
                showPerpetual={false}
              /> */}
                 {/* <NFTPreview                 
                contract={contract} 
                id={nft?.nft?.tokenId} 
                href={`https://ipfs.decentralized-content.com/ipfs/bafybeigs4g2j74r44o5lbfegdven7ejoq65mosildkun63r3ct2jjl6emm/${imageIndex(nft?.nft?.tokenId)}${nft?.nft?.tokenId - 1}.jpg`}
                showBids={false}
                showPerpetual={false}
              /> */}
              <Link href={`https://ipfs.decentralized-content.com/ipfs/bafybeigs4g2j74r44o5lbfegdven7ejoq65mosildkun63r3ct2jjl6emm/${imageIndex(nft?.nft?.tokenId)}${nft?.nft?.tokenId}.jpg`} >
              <Image src={`https://ipfs.decentralized-content.com/ipfs/bafybeigs4g2j74r44o5lbfegdven7ejoq65mosildkun63r3ct2jjl6emm/${imageIndex(nft?.nft?.tokenId)}${nft?.nft?.tokenId}.jpg`} alt={nft?.nft?.tokenId} width={400} height={400} className='hover:cursor-crosshair' />
              </Link>
            </MediaConfiguration>
          )}
        </div>
        {/* IF YOU WANT A BUTTON: <button onClick={handleLoadMore}>Load More</button>*/}
        <NFTGridLoadMore
          showObserver
          isValidating={isValidating}
          handleLoadMore={handleLoadMore}
        />
        <div className='w-[100%] text-center mb-20'>
          view on <a href={`https://market.zora.co/collections/${contract}`} target={`_blank`}>zora</a> / <a href="https://opensea.io/collection/un000-inicio" target={`_blank`}>opensea</a>
        </div> 
      </div>
    </div>
  )
}

export default Gallery