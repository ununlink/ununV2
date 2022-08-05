import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components";
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import { CreateAsk } from "./Asks/CreateAsk";
import AskWrite_disclosure from "./Asks/AskWrite_disclosure";
import Image from "next/image";
import Link from 'next/link';


const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
    Networks.MAINNET
)

const NFTCard = ({ nfts }) => {

    return (
        <>
            {
            nfts && nfts.length > 0
            ?
            nfts.map((nft, index) => {
                console.log("que es")
                return (
                    <div key={nft.token.tokenId} className="border border-black p-3 m-2 w-10/10 sm:w-5/5 md:w-3/3 border-dashed flex flex-col flex-wrap justify-center">
                       
                        {/* <MediaConfiguration
                        networkId="1"                        
                        strategy={zdkStrategyMainnet}
                        strings={{
                            CARD_OWNED_BY: "↳",
                            CARD_CREATED_BY: "↳",                           
                        }}                    
                        >
                        <NFTPreview
                            href={`https://zora.co/collections/0x532f7DB02D2ebE12f2CDdfAcDa807FD9B2D96F66/${nft.token.tokenId}`}
                            contract={nft.token.collectionAddress}
                            id={nft.token.tokenId}
                            showBids={false}
                            showPerpetual={false}                           
                        />
                        </MediaConfiguration> */}
                            <Link href={`https://ipfs.io/ipfs/${nft.token.metadata.image.slice(7)}`}><a target="_blank" rel="noreferrer"><Image
                                src={`https://ipfs.io/ipfs/${nft.token.metadata.image.slice(7)}`}
                                width={300}
                                height={300}
                            /></a></Link>
                            
                            <div>

                            {/* ↳owner{`${nft.token.owner}`} */}
                            <p className='text-sm'>
                            ↳owner:<span> </span>
                            <Link href={`https://etherscan.io/address/${nft.token.owner}`}><a target="_blank" rel="noreferrer">{`${nft.token.owner.slice(-42, -37)}`}...{`${nft.token.owner.slice(38)}`}</a>
                            </Link>
                            </p>
                            <p className='text-sm'>
                            ↳view on:<span> </span>
                            <Link href={`https://zora.co/collections/${nft.token.collectionAddress}/${nft.token.tokenId}`}><a target="_blank" rel="noreferrer">zora</a>
                            </Link><span> </span>
                            <Link href={`https://opensea.io/assets/ethereum/${nft.token.collectionAddress}/${nft.token.tokenId}`}><a target="_blank" rel="noreferrer">opensea</a>
                            </Link>
                            </p>
                            </div>
                        
                        {/* <audio
                            controls
                            src={`https://ipfs.io/ipfs/${nft.token.metadata.animation_url.slice(7)}`}
                        >

                        </audio> */}
                        

                        {/* <div className="">
                            { nft.marketsSummary.length === 0 ? (
                            <div className="mb-5">
                                <div>
                                    {"Listing Status: " + "INACTIVE"}
                                </div>                            
                                <div>
                                    {"Listing Price: " + "N/A"}
                                </div>
                                <div>
                                    {"Finders Fee: " + "N/A"}
                                </div>                                  
                            </div>
                            ) : ( 
                            <div className="mb-5"> 
                                <div>
                                    {"Listing Status: " + nft.marketsSummary[0].properties.v3AskStatus}
                                </div>                            
                                <div>
                                    {"Listing Price: " + nft.marketsSummary[0].properties.askPrice.nativePrice.decimal + " " + nft.marketsSummary[0].properties.askPrice.nativePrice.currency.name}
                                </div>
                                <div>
                                    {"Finders Fee: " + (nft.marketsSummary[0].properties.findersFeeBps / 100) + "%"}
                                </div>                                  
                            </div>
                            )}
                        </div> */}
                        {/* <AskWrite_disclosure nft={nft} /> */}
                    </div>
                )
            }
            ) : (
                <div>
                    {"꒰⁎×﹏×⁎꒱ ༘ؓ ँั๊ྃ"}
                </div>
            )
            }
        </>
    )
}

export default NFTCard