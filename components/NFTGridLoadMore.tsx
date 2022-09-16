import { useCallback, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export function LoadMoreObserver({
  handleVisible,
}: {
  handleVisible?: () => void,
  className?: string
}) {
  const [ref, inView] = useInView({
    threshold: 0.25,
    rootMargin: '0px 0px 500px 0px',
  })

  useEffect(() => {
    if (inView && handleVisible) {
      handleVisible()
    }
  }, [inView, handleVisible])

  return (
    <div
      ref={ref}
      aria-hidden
    />
  )
}

interface NFTGridLoadMoreProps {
  showObserver?: boolean
  isValidating?: boolean
  handleLoadMore?: () => void
}

export const NFTGridLoadMore = ({
  showObserver,
  isValidating,
  handleLoadMore,
}: NFTGridLoadMoreProps) => {
  
  const handleVisible = useCallback(() => {
    if (showObserver && handleLoadMore) handleLoadMore()
  }, [handleLoadMore, showObserver])

  return (
    <div className={`w-full relative mb-4 ${isValidating && 'validating'}`}>
      {!isValidating && (
        <LoadMoreObserver
          className="pointer-events-none"
          handleVisible={handleVisible}
        />
      )}
      <div
        className='justify-center align-center flex py-4 w-full flex-row h-4'
        aria-hidden
      >
        {/* {isValidating && <span>...loading...</span>} */}
      </div>
    </div>
  )
}
