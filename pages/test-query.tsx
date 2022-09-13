import type { NextPage } from 'next'
import { useTokensQuery } from './../hooks/useTokensQuery'
import { ourCollection } from './../constants/Constants'
import { NFTObject } from '@zoralabs/nft-hooks'
import { NFTPreview } from '@zoralabs/nft-components'
import { NFTGridLoadMore } from '../components/NFTGridLoadMore'

const Test: NextPage = () => {
  const {
    data,
    isReachingEnd,
    isValidating,
    handleLoadMore,
  } = useTokensQuery({
    contractAddress: ourCollection,
    pageSize: 15
  })

  console.log('isReachingEnd', isReachingEnd)
  
  return (
    <div className='flex flex-col justify-around' style={{paddingTop: 100, paddingBottom: 200}}>
      <div className="flex flex-row flex-wrap justify-center space-x-4 items-center mb-10 md:mb-0">
        {data && data.map((nft: NFTObject) =>
          <NFTPreview key={`${nft?.nft?.tokenId}-${ourCollection}`} contract={ourCollection} id={nft?.nft?.tokenId} />
        )}
      </div>
      {/* IF YOU WANT A BUTTON: <button onClick={handleLoadMore}>Load More</button>*/}
      <NFTGridLoadMore
        showObserver
        isValidating={isValidating}
        handleLoadMore={handleLoadMore}
      />
    </div>
  )
}

export default Test
