import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components";
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import { CreateAsk } from "./Asks/CreateAsk";
import AskWrite_disclosure from "./Asks/AskWrite_disclosure";

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
                return (
                    <div key={nft.token.tokenId} className="border border-black m-2 w-10/10 sm:w-5/5 md:w-3/3 border-dashed flex flex-row flex-wrap justify-center">
                        <MediaConfiguration
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
                        </MediaConfiguration>
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