import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import { useAppContext } from "../context/useAppContext"
import MintQuantity from '../components/MintQuantity'
import PostMintDialog from '../components/PostMintDialog'

const heavenly = "#ff0000"

const Mint: NextPage = () => {

    const { mintQuantity, setMintQuantity } = useAppContext()

    // ZORA NFT Edition "purchase" Write
    const perMintPrice = 0.02
    const totalMintPrice = String(mintQuantity.queryValue * perMintPrice)
    const mintValue = BigNumber.from(ethers.utils.parseEther(totalMintPrice)).toString()

    const { data: totalSupplyData, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: "0x532f7DB02D2ebE12f2CDdfAcDa807FD9B2D96F66", // Our Collection
        contractInterface: editionsABI.abi,
        functionName: 'totalSupply',
        args: [],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            // console.log("success! --> ", totalSupplyData)
        }  
    })    

    const totalSupply = totalSupplyData ? totalSupplyData.toString() : "loading"

    // useContractWrite Mint Call
    const { data: mintData, isError: mintError, isLoading: mintLoading, isSuccess: mintSuccess, status: mintStatus, write: mintWrite  } = useContractWrite({
        addressOrName: "0x532f7DB02D2ebE12f2CDdfAcDa807FD9B2D96F66", // Our Collection
        contractInterface: editionsABI.abi,
        functionName: 'purchase',
        args: [
            mintQuantity.queryValue
        ],
        overrides: {
            value: mintValue
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(mintData, variables, context) {
            console.log("Success!", mintData)
 },
    })
    
    // useWaitforTransaction
    const { data: mintWaitData, isError: mintWaitError, isLoading: mintWaitLoading } = useWaitForTransaction({
        hash:  mintData?.hash,
        onSuccess(mintWaitData) {
            console.log("txn complete: ", mintWaitData)
            console.log("txn hash: ", mintWaitData.transactionHash)
        }
    })           

    return (
        <div className='flex flex-col justify-around h-screen min-h-screen'>
            <Head>
                {/* unun-link.eth <3 */}
            <title>✧unun.loading</title>
            <meta name="description" content="✧unun." />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Header /> */}
            <main className="">
                <div className="flex flex-col flex-wrap items-center">
                    <div className={`mb-3`} >
                    {"✧unun."}
                    </div>
                    <div className='' >
                    {"under construction..."}
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default Mint
