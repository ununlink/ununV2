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
    const perMintPrice = 0.001
    const totalMintPrice = String(mintQuantity.queryValue * perMintPrice)
    const mintValue = BigNumber.from(ethers.utils.parseEther(totalMintPrice)).toString()
    console.log("mint VAlue", mintValue)


    const { data: totalSupplyData, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: "NUESTRO_CONTRATO", // Our Collection
        contractInterface: editionsABI.abi,
        functionName: 'totalSupply',
        args: [],
        watch: true,
        onError(error) {
            console.log("error: ", error)
        },
        onSuccess(data) {
            console.log("success! --> ", totalSupplyData)
        }  
    })    

    const totalSupply = totalSupplyData ? totalSupplyData.toString() : "loading"

    // useContractWrite Mint Call
    const { data: mintData, isError: mintError, isLoading: mintLoading, isSuccess: mintSuccess, status: mintStatus, write: mintWrite  } = useContractWrite({
        addressOrName: "NUESTRO_CONTRATO", // Our Collection
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
            <title>✧unun.mint</title>
            <meta name="description" content="✧unun." />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="">
                <div className="flex flex-col flex-wrap items-center">
                    <div className={`mt-3 text-center p-3 bg-[#eee] text-black rounded-sm`} >
                    {"Astrosuka + Sofja - init [UN000]"}
                    </div>
                    <div className="">
                        <div className="text-center p-3" >
                            de Boedo al mundo
                        </div>
                        <div className="flex justify-center border-solid border-[#eee] border">
                            <MintQuantity colorScheme={heavenly}/>
                            <button 
                            className=" p-3 hover:bg-[#eee] w-1/2 h-full"
                            onClick={() => mintWrite()}   
                            >
                            mint
                            </button>
                        </div>
                        <PostMintDialog 
                            publicTxnLoadingStatus={mintWaitLoading}
                            publicTxnSuccessStatus={mintStatus}
                            publicTxnHashLink={mintWaitData}
                            colorScheme={heavenly}
                        />               
                        { mintWaitLoading == true ? (
                            <div className="p-3 flex flex-col flex-wrap justify-center">           
                                <div className="text-center">
                                    0.02 Ξ
                                </div>                        
                                <div className="text-center">
                                    {`${totalSupply}` + " minted"}
                                </div>
                                <div className='flex flex-row justify-center flex-wrap'>
                                    <img
                                    className="bg-[#000] rounded-full p-1 mt-3" 
                                    width="25px"
                                    src="/SVG-Loaders-master/svg-loaders/tail-spin.svg"
                                    />
                                </div>
                            </div>
                            ) : (                  
                            <div className="p-3 flex flex-col flex-wrap justify-center text-center">
                            <div className="">
                                0.02 Ξ
                            </div>                
                                <div className="">
                                    {`${totalSupply}` + " minted"}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Mint
