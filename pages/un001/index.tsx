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
import Gallery from './gallery'

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
        <div className='flex flex-col justify-around mt-12'>
            <Head>
            <title>✧unun/ocelo</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <main className="flex flex-wrap">
                <div className="flex flex-col flex-wrap items-center mb-10 pb-10 md:mb-0 md:text-base text-sm">
                    <h1 className='mb-1' >
                    {"[UN001] Ocelo"}
                    </h1>
                    <div className="w-[15%] min-w-[150px] text-center mb-1">
                        <Image  width={750}
                            height={750} src="https://ipfs.io/ipfs/bafybeiamaqgrlcsuiowkbqgmwypcznbzffhyslrikzs3ihrtuln4kwpevy/ocelo%20-%20cover.jpg" />
                    </div>
                    <div className="text-center w-[95%] md:w-[60%] mb-3" >           
                        <p>
                            electronic music compilation
                        </p>
                        <p>
                            with tracks by&nbsp; 
                            
                            <Link 
                                href="https://qoaqoa.bandcamp.com/"
                                ><a target="_blank">QOA</a>
                                    </Link>,&nbsp; 
                            <Link 
                                href="https://vicbang.bandcamp.com/"
                                ><a target="_blank">vic bang</a>
                                    </Link>,&nbsp;
                            <Link 
                                href="https://yoto.bandcamp.com/"
                                ><a target="_blank">Yoto</a>
                                    </Link>,&nbsp;
                            <Link 
                                href="https://linktr.ee/astrosuka"
                                ><a target="_blank">Astrosuka</a>
                                    </Link> +&nbsp;
                            <Link 
                                href="https://linktr.ee/sofffja"
                                ><a target="_blank">Sofja</a>
                                    </Link>, &nbsp;
                            <Link 
                                href="https://twitter.com/_gregorionash"
                                ><a target="_blank">gregorio nash</a>
                                    </Link>.
                        </p>
                        <p className='mt-3'>
                            each edition — <Link href={`https://etherscan.io/token/${contract}`} >
                            <a target="_blank" rel="noreferrer" className=''>ERC721</a></Link> — comes with a unique generative cover artwork & one of the five tracks.
                        </p>
                        <p className='mt-3 text-sm italic'>
                        to get the entire compilation mint 5 tokens in a single transaction.
                        </p>
                    </div> 
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
                        <div className="flex flex-col flex-wrap justify-center ">           
                            <div className="text-center">
                            {price * mintQuantity.queryValue} ETH
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
                        <div className="flex flex-col flex-wrap justify-center text-center">
                            <div>
                                {price * mintQuantity.queryValue} ETH
                            </div>                
                            <div className="">
                                {`${totalSupply}` + "/300 minted"}
                            </div>                                       
                        </div>
                    )}
                    
                    <br />
                    <Link href="/un001/gallery">
                        <a className='galeria'>
                            gallery
                        </a>
                    </Link> 
                    <br />
                    <p className=''>
                            ♥
                        </p>
                    <br />
              
                </div>
            </main> */}

            <main className="flex flex-col md:flex-row pb-[8em] lg:pb-[6em]">
                <div className="w-[100%] lg:w-[50%] min-w-[150px] text-center mb-1">
                <Image alt='ocelo' width={730} height={730} src="/0000227.jpg" />
                     {/* <Image  width={750} height={750} src="https://ipfs.io/ipfs/bafybeiamaqgrlcsuiowkbqgmwypcznbzffhyslrikzs3ihrtuln4kwpevy/ocelo%20-%20cover.jpg" /> */}
                </div>
                <div className="flex flex-col flex-wrap items-left mb-10 md:mb-0 pl-2 pr-2">
                <h1 className={`mb-2 text-4xl`} >
                    {"[UN001] Ocelo"}
                    </h1>
                    <div className="text-left" >

                        <p>
                        electronic music compilation & collection of 300 generative artworks.
                        </p>
                       <br />
                        <p>
                            01. <Link 
                                href="https://qoaqoa.bandcamp.com/"
                                ><a target="_blank">QOA</a>
                                    </Link> - RUI3007 [03:29]<br /> 
                            02. <Link 
                                href="https://vicbang.bandcamp.com/"
                                ><a target="_blank">vic bang</a>
                                    </Link> - fluut [03:59]<br />
                            03. <Link 
                                href="https://yoto.bandcamp.com/"
                                ><a target="_blank">Yoto</a>
                                    </Link> - Pickles [01:45]<br />
                            04. <Link 
                                href="https://astrosuka.xyz"
                                ><a target="_blank">Astrosuka</a>
                                    </Link> +&nbsp;
                            <Link 
                                href="https://sofffja.com"
                                ><a target="_blank">Sofja</a>
                                    </Link> - antenas [04:12]<br />
                            05. <Link 
                                href="https://twitter.com/_gregorionash"
                                ><a target="_blank">gregorio nash</a>
                                    </Link> - xoxox ☀ɱιɱιƚσʂ☀༻ [07:00]
                        </p>
                        <br />

                        <p>run the artwork script&nbsp;
                            <Link href="https://www.astrosuka.xyz/ocelo">
                                <a target='_blank' className='font-black'>here</a>
                            </Link>
                           <br /> (generate new versions on click)
                           
                        </p>
                        <br />
                        <p>
                            each edition — <Link href={`https://etherscan.io/token/${contract}`} >
                            <a target="_blank" rel="noreferrer" className=''>erc721</a></Link> — comes with: <br />
                            <ul className='list-disc list-inside'>
                                <li>1 of 5 .wav + .mp3</li>
                                <li>1 of 300 .jpg</li>
                            </ul>
                           
                        <span className='mt-3 text-sm italic'>
                        *to get the entire compilation mint 5 tokens in a single transaction.
                        </span>
                        </p>
                        <br />
                     
                        
                    </div>   

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
           
                {/* <div >
                        <Link
                            href="/un001/gallery" className=''
                        >
                            <a className="galeria">
                                view gallery
                            </a>
                        </Link> 
                </div> */}
                    <br />
                    <p>available on &nbsp;
                        <Link href='https://unun.bandcamp.com/album/un001-ocelo' >
                            <a target="_blank" rel="noreferrer" className=''>bandcamp</a>
                        </Link>
                        &nbsp; and &nbsp;
                        <Link href='https://www.ninaprotocol.com/9H9YQhdbvBhTpLiiFG322iWta9iokmzLFEBPZTbSDgCm' >
                            <a target="_blank" rel="noreferrer" className=''>nina protocol</a>
                        </Link>
                    </p>
                    <p>
                    mastering and coding by <Link href='https://astrosuka.xyz' ><a target="_blank" className=''>Astrosuka</a></Link> & <Link href='https://sofffja.com' ><a target="_blank" className=''>Sofja</a></Link>
                    </p>
                    <div className=''>released September 26, 2022
                    </div>
                    <br />
                    <div className='mt-[4em]'>
                    <Link href="un002" className=''>
                            <a className=''>{`< NEXT RELEASE`}</a>
                        </Link>
                        &nbsp;-&nbsp;
                    <Link href="un000" className=''>
                            <a className=''>{`PREVIOUS RELEASE >`}</a>
                        </Link>
                    </div>
                </div>
                        
                        
            </main>

            <Gallery />
        </div>
    )
}

export default Mint
