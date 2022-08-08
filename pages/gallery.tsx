import type { NextPage } from 'next'
import Head from 'next/head'
import NFTCard from "../components/NFTCard"
import { useContractRead, useAccount } from "wagmi"
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { BigNumber } from "ethers"
import { useState, useEffect } from 'react'
import { createClient } from "urql"
import { ourCollection } from "../public/Constants";

// APIs
const API_MAINNET = "https://api.zora.co/graphql"
const API_RINKEBY = "https://indexer-dev-rinkeby.zora.co/v1/graphql"

const client = createClient({
  url: API_MAINNET,
})

const Gallery: NextPage = () => {

  const [nftsMinted, setNFTsMinted] = useState();
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [userData, setUserData] = useState([])
  const [enabled, setEnabled] = useState(false);
  
  // hook to get the current account of user
  const { address, connector, isConnecting, isConnected, status} = useAccount(); 
  const currentUserAddress = address ? address.toLowerCase() : ""

  // read call to get current totalSupply
  const { data: totalSupplyData, isLoading, isSuccess, isFetching  } = useContractRead({
    addressOrName: ourCollection, 
    contractInterface: editionsABI.abi,
    functionName: 'totalSupply',
    args: [],
    watch: true,
    onError(error) {
        console.log("error: ", error)
    },
    onSuccess(data) {
    }  
  })
  
  const totalSupply = totalSupplyData ? BigNumber.from(totalSupplyData).toString() : "loading"
  const totalSupplyNumber = Number(totalSupply)
  const numOfCallsRequired = Math.ceil(totalSupplyNumber / 100)

  const generateCalls = (numCalls) => {
      const callArray = [];

      for (let i = 0; i < numCalls; i++ ) {
      let call = 
    ` 
      query ListCollections {
        tokens(
          where: {collectionAddresses: "${ourCollection}"}
          pagination: {limit: 100}
        ) {
          nodes {
            marketsSummary {
              marketType
              tokenId
              properties {
                ... on V3Ask {
                  sellerFundsRecipient
                  findersFeeBps
                  askPrice {
                    nativePrice {
                      decimal
                      currency {
                        name
                      }
                    }
                  }
                  v3AskStatus
                }
              }
            }
            token {
              tokenId
              owner
              collectionAddress
              metadata
            }
          }
        }
      }
    `

    callArray.push(call)
    } 
    return callArray
  }
  
  const generateQueries = (array, length) => {
    const promises = []
    for (let i = 0; i < length; i++) {
    promises.push(client.query(array[i]).toPromise())
    }
    return promises
  }
  
  const runPromises = async (inputArray) => {
    return Promise.all(inputArray).then((results) => {
      return [results]
    })
  }
  
  const concatPromiseResultsRinkeby = (multipleArrays) => {
    const masterArray = []
    for (let i = 0; i < multipleArrays[0].length; i++ ) {
      for (let j = 0; j < multipleArrays[0][i].data.Token.length; j++ ) {
          masterArray.push(multipleArrays[0][i].data.Token[j])
      }
    } return masterArray
  }

  const concatPromiseResultsMainnet = (multipleArrays) => {
    const masterArray = []
    for (let i = 0; i < multipleArrays[0].length; i++ ) {
      for (let j = 0; j < multipleArrays[0][i].data.tokens.nodes.length; j++ ) {
          masterArray.push(multipleArrays[0][i].data.tokens.nodes[j])
      }
    } return masterArray
  }

  const ownerFilter = (rawData) => {
    const filteredArray = []
      const filteredNFTs = rawData.filter((nft) => {
          if (nft.owner === currentUserAddress) {
            filteredArray.push(nft)
          }
          return filteredArray
      });
    setUserData(filteredArray)
  }

  const fetchData = async () => {
    console.log("fetching data")

    try {
      setLoading(true);

      const finalCallArray = generateCalls(numOfCallsRequired);

      const finalPromises = generateQueries(finalCallArray, numOfCallsRequired);

      const promiseReturns = await runPromises(finalPromises);

      const promiseResults = concatPromiseResultsMainnet(promiseReturns)

      setRawData(promiseResults)

      ownerFilter(promiseResults)

    } catch(error) {
      console.error(error.message)
    }  finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
    },
    []
  )

  useEffect(() => {
    if(!!rawData)
    ownerFilter(rawData);
    },
    [currentUserAddress]
  )

  return (
    <div>
      <Head>
        <title>✧unun.gallery</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row flex-wrap justify-center mt-20 mb-20 pb-10">
      <div className="flex flex-row flex-wrap justify-center">
        {
            loading ? "loading . . . " : 
            <>
            { enabled === false ? ( 
            <NFTCard  nfts={rawData} />
            ) : (
            <NFTCard  nfts={userData} />
            )}
            </>               
        }
      </div>
    </div>
  </div>
  )
}

export default Gallery
