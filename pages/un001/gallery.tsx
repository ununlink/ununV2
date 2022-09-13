import type { NextPage } from 'next'
import Head from 'next/head'
import NFTCard from "../../components/NFTCard"
import { useContractRead, useAccount } from "wagmi"
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { BigNumber } from "ethers"
import { useState, useEffect } from 'react'
import { createClient } from "urql"
import { ourCollection } from "../../constants/Constants";

import useSWR from 'swr';
import request, { RequestDocument } from "graphql-request";


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

  const [nftTotalSupply, setNFTTotalSupply] = useState(0);
  const [growingData, setGrowingData] = useState();
  const [nftData, setNFTData] = useState([]);
  
  // // hook to get the current account of user
  // const { address, connector, isConnecting, isConnected, status} = useAccount(); 
  // const currentUserAddress = address ? address.toLowerCase() : ""

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

  // gets allstarz total supply and sets it to state
  const getTotalSupply = () => {
    const totalSupply = totalSupplyData ? Number(totalSupplyData) : 0
    setNFTTotalSupply(totalSupply);
    console.log("total supply", totalSupply)
  }

  // creates a sequential array of all the tokenIds we want to render and sets it to state
  const createNFTPreviewData = () => {
    const updatedData = [];
    for ( let i = 0; i < nftTotalSupply ; i++) {
      updatedData.push(String(i + 1));
      setNFTData(updatedData);
    }
    console.log("updated data", updatedData)
  }
  
  useEffect(() => {
    getTotalSupply(),
    [totalSupplyData]
  })  

  useEffect(() => {
    if (!!nftData) {
      createNFTPreviewData();
    }},
    [
      nftTotalSupply
    ]
  )  

  return (
    <div>
      <Head>
        <title>✧unun.gallery</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-row flex-wrap justify-center mt-20 mb-20 pb-10">
        <div className='w-[100%] text-center'>
          view on <a href="https://zora.co/collections/0x532f7db02d2ebe12f2cddfacda807fd9b2d96f66" target={`_blank`}>zora</a> / <a href="https://opensea.io/collection/un000-inicio" target={`_blank`}>opensea</a>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {
              loading ? "loading . . . " : 
              <>
              { enabled === false ? ( 
              <NFTCard  nfts={nftData}  />
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
