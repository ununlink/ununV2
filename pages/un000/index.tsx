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
        <div className='flex flex-col justify-around mt-12'>
            <Head>
            <title>✧unun/inicio</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <main className="md:text-base text-sm md:pb-0 pb-10"> */}
            <main className="flex flex-col md:flex-row">
                <div className="w-[100%] lg:w-[50%] min-w-[150px] text-center mb-1">
                {/* <Image  width={800} height={800} src="https://ipfs.io/ipfs/bafybeihtbkqe27zo32njducvwncl73mmzj5w5ag634r7y5g6yykfdlfh3y" /> */}
                     <Image  width={730} height={730} src="/0000114.jpg" />
                </div>
                <div className="flex flex-col flex-wrap items-left mb-10 md:mb-0 pl-2 pr-2">
                <div className={`mb-2 text-2xl`} >
                    {"[UN000] Astrosuka + Sofja - inicio"}
                    </div>
                    <div className="text-left" >

                        <p>
                            electronic music single & collection of 404 generative artworks.
                        </p>
                       
                        <br />
                        <p>
                            1. inicio [03:47]<br />
                            2. escondido [04:20] — <span className='italic'>hidden track</span>
                        </p>
                        <br />
                        <p>
                           music synthesized and recorded directly from an access virus ti2's output to a single stereo track. <br />
                           artworks coded in p5.js by the artists.
                        </p>
                        <br />
                        <p>
                            each edition — <Link href={`https://etherscan.io/token/${contract}`} >
                            <a target="_blank" rel="noreferrer" className=''>erc721</a></Link> — comes with: <br />
                            <ul className='list-disc list-inside'>
                                <li>inicio.mp3 or escondido.mp3</li>
                                <li>1 of 404 .jpg</li>
                            </ul>
                           
                        </p>
                        <br />
                     
                    </div>   

                           {/* <div className="w-[20%] min-w-[150px] text-center mb-1">
                        <Image  width={500}
                            height={500} src="https://ipfs.io/ipfs/bafybeihtbkqe27zo32njducvwncl73mmzj5w5ag634r7y5g6yykfdlfh3y" />
                    </div> */}
                <div className="w-[35%] lg:w-[20%] z-[10]">
                    <div className="flex justify-center mb-3 bg-background drop-shadow-hard z-[10]">
                        <MintQuantity colorScheme={heavenly}/>
                        <button 
                        className="p-1 hover:bg-minthov w-1/2 h-full border-solid border-[#000] border-l"
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
                        <div className="flex flex-col flex-wrap justify-center text-left">
                            <div className="">
                                
                            {price * mintQuantity.queryValue} ETH

                            </div>             
                            <div className="">
                                {`${totalSupply}` + " collected"}
                            </div>                           
                        </div>
                    )}   
                </div>
                    <div >
                        <Link
                            href="/un000/gallery" className=''
                        >
                            <a className="galeria">
                                view gallery
                            </a>
                        </Link> 
                    </div>
                    <br />
                    <p>available on &nbsp;
                        <Link href='https://unun.bandcamp.com/album/un000-inicio' >
                            <a target="_blank" rel="noreferrer" className=''>bandcamp</a>
                        </Link>
                        </p>
                    <div className='mb-[15em]'>released August 6, 2022
                    </div>
                </div>
 
            </main>
        </div>
    )
}

export default Mint
