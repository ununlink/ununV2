import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { ethers, BigNumber } from 'ethers'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import { useAppContext } from "../../context/useAppContext"
import MintQuantity from '../../components/MintQuantity'
import PostMintDialog from '../../components/PostMintDialog'
import { ourCollection, tokenPrice } from '../../constants/Constants'

const heavenly = "#ff0000"
const price = tokenPrice
const contract = ourCollection

const Mint: NextPage = () => {

    const { mintQuantity, setMintQuantity } = useAppContext()

    // ZORA NFT Edition "purchase" Write
    const totalMintPrice = String(mintQuantity.queryValue * price)
    const mintValue = BigNumber.from(ethers.utils.parseEther(totalMintPrice)).toString()

    const { data: totalSupplyData, isLoading, isSuccess, isFetching  } = useContractRead({
        addressOrName: contract,
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
        addressOrName: contract,
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
            <title>✧unun.inicio</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <div className="flex flex-col flex-wrap items-center mb-10 md:mb-0">
                    <div className="w-[20%] min-w-[200px] text-center mb-1">
                        <Image  width={500}
                            height={500} src="https://ipfs.io/ipfs/bafybeihtbkqe27zo32njducvwncl73mmzj5w5ag634r7y5g6yykfdlfh3y" />
                    </div>
                    <div className={`mb-2 text-lg`} >
                    {"[UN000] Astrosuka + Sofja - inicio"}
                    </div>
                    <div className="flex justify-center mb-3 bg-[#f5f5f5] drop-shadow-hard z-[10]">
                        <MintQuantity colorScheme={heavenly}/>
                        <button 
                        className="p-1 hover:bg-[#eee] w-1/2 h-full border-solid border-[#000] border-l"
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
                        <div className="flex flex-col flex-wrap justify-center">           
                            <div className="text-center">
                            {price * mintQuantity.queryValue} ETH

                            </div>
                            <div className='flex flex-row justify-center flex-wrap'>
                                <img
                                className="bg-[#000] rounded-full p-1 mt-1" 
                                width="25px"
                                src="/SVG-Loaders-master/svg-loaders/tail-spin.svg"
                                />
                            </div>
                        </div>
                        ) : (                  
                        <div className="flex flex-col flex-wrap justify-center text-center">
                            <div className="">
                                
                            {price * mintQuantity.queryValue} ETH

                            </div>             
                            <div className="">
                                {`${totalSupply}` + "/404 minted"}
                            </div>                           
                        </div>
                    )}
                    <div className="text-center w-[95%] md:w-[60%] md:text-sm" >

                        <p className=''>
                            ♥
                        </p>
                        <p>
                            electronic music single.
                        </p>
                        <p>
                            each edition (<Link href={`https://etherscan.io/token/${contract}`} >
                            <a target="_blank" rel="noreferrer" className=''>ERC721</a></Link>) comes with a unique generative cover artwork.
                        </p>
                        <br />
                        <p>
                           {`synthesized and recorded directly from an access virus ti2's output to a single stereo track.`}
                        </p>
                        <br />
                        <Link
                            href="/un000/gallery" className=''
                        >
                            <a
                                className=""
                            >
                                gallery
                            </a>
                        </Link> 
                        
                        <p className='text-xs mt-6'>
                        powered by <Link href='https://zora.co/manifesto' ><a target="_blank" className=''>☾ zora ☽</a></Link>
                        </p>
                    </div>             
                </div>
            </main>
        </div>
    )
}

export default Mint
