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
import { ourCollection2, tokenPrice2 } from '../../constants/Constants'

const heavenly = "#ff0000"
const price = tokenPrice2
const contract = ourCollection2

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
        <div className='flex flex-col justify-around h-screen min-h-screen un001'>
            <Head>
            <title>✧unun.inicio</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <div className="flex flex-col flex-wrap items-center md:text-base text-sm">
                    <h1 className='' >
                    {"[UN001] Ocelo"}
                    </h1>
                    <br />
                    {/* <div className="w-[15%] min-w-[150px] text-center mb-1">
                        <Image  width={500}
                            height={500} src="https://ipfs.io/ipfs/bafybeiamaqgrlcsuiowkbqgmwypcznbzffhyslrikzs3ihrtuln4kwpevy/ocelo%20-%20cover.jpg" />
                    </div> */}
                    <div className="text-left w-[60%] md:w-[20%] p-3 bg-[#f5f5f5] drop-shadow-hard text-sm">
                        <p className=''>
                            <p className='italic pb-3'>
                            tracklist:
                            </p>                            
                            <Link 
                                href="https://qoaqoa.bandcamp.com/"
                                >
                                    <a target="_blank">QOA</a>
                            </Link> - RUI3007
                            <br />
                            <Link 
                                href="https://vicbang.bandcamp.com/"
                                ><a target="_blank">vic bang</a>
                                    </Link> - fluut
                            <br />
                            <Link 
                                href="https://yoto.bandcamp.com/"
                                ><a target="_blank">Yoto</a>
                                    </Link> - Pickles
                            <br />
                            <Link 
                                href="https://linktr.ee/astrosuka"
                                ><a target="_blank">Astrosuka</a>
                                    </Link> +&nbsp;
                            <Link 
                                href="https://linktr.ee/sofffja"
                                ><a target="_blank">Sofja</a>
                                    </Link> - antenas
                            <br />
                            <Link 
                                href="https://twitter.com/_gregorionash"
                                ><a target="_blank">gregorio nash</a>
                                    </Link> - xoxox ☀ɱιɱιƚσʂ☀༻
                        </p>
                        {/* <p className='mt-3'>
                            each edition — <Link href={`https://etherscan.io/token/${contract}`} >
                            <a target="_blank" rel="noreferrer" className=''>ERC721</a></Link> — comes with a unique generative cover artwork.
                        </p>                          */}
                        
                    
                    </div> 
                    <br />
                    <p className=''>
                            ♥
                    </p>
                    <br />
                    <Link href="/un001/gallery">
                        <a className='galeria'>
                            gallery
                        </a>
                    </Link> 
                    <Link href="/un001">
                        <a className='galeria'>
                            mint
                        </a>
                    </Link> 
                    <br />
                    {/* <p className=''>
                            ♥
                    </p> */}
                    <br />
                </div>
            </main>
        </div>
    )
}

export default Mint
