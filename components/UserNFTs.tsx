import { useState } from "react"

const UserNFTs = ({ userAddress, nfts, collectionInfo, setCollectionCB }) => {

    const [collectionLookup, setCollectionLookup] = useState("0xca21d4228cdcc68d4e23807e5e370c07577dd152")

    return (
        <>
            <div className="pt-36 sm:pt-24 flex flex-row flex-wrap justify-center text-center w-full ">
                <div className="w-full underline text-3xl">
                    {`My NFTs (${userAddress.substring(0, 4) + "..." + userAddress.substring(userAddress.length - 4)})`}
                </div>
                <div className="mt-5 w-full md:w-7/12  grid grid-cols-3">
                    <div className=" text-xl mb-1 w-fit flex flex-row justify-self-center self-center">
                        Address
                    </div>                
                    <div className=" text-xl mb-1 w-fit flex flex-row justify-self-center self-center">
                        Balance
                    </div>
                    <div className=" text-xl mb-1 w-fit flex flex-row justify-self-center self-center">
                        Name
                    </div>
                </div>
                <div className="w-full md:w-7/12"> 
                    {
                        nfts && nfts.length > 0
                        ?
                        nfts.map((nft, index) => {
                        while (index < nfts.length && index < 10 ) {
                            return (
                                <div key={nft.collectionAddress} className="text-black w-full grid grid-cols-3">
                                    <a
                                    href={`https://etherscan.io/address/${nft.collectionAddress}`}
                                    className=" py-[0.5px] w-fit flex flex-row justify-self-center self-center hover:underline hover:text-green-300"
                                    >
                                        {"" + (nft.collectionAddress.substring(0, 4)) + "..." + (nft.collectionAddress.substring(nft.collectionAddress.length - 4))}
                                    </a>
                                    <div className=" py-[0.5px] w-fit flex flex-row justify-self-center self-center ">
                                        {"" + nft.count}    
                                    </div>                                             
                                    <div className=" py-[0.5px] w-fit flex flex-row justify-self-center self-center">
                                        {"" + nft.name}    
                                    </div>                     
                                </div>
                            )
                        }
                    }   
                        ) : (
                            <div className="  w-full grid grid-cols-3 ">
                                <div className="w-fit flex flex-row justify-self-center self-center ">
                                    n/a
                                </div>        
                                <div className="w-fit flex flex-row justify-self-center self-center ">
                                    0  
                                </div>                                             
                                <div className="w-fit flex flex-row justify-self-center self-center ">
                                    n/a
                                </div>                     
                            </div>
                        )
                    }                    
                </div>
            </div>
            <div className="h-fit flex flex-row flex-wrap  justify-center pt-5 sm:pt-10 text-center w-full ">                        
                <div className="w-full  underline text-3xl pb-5 ">
                    Collection Lookup
                </div>
                <div className="flex flex-col flex-wrap">
                    <input
                        className="text-center bg-slate-200 h-full w-6/12 px-2"
                        placeholder="Input NFT Address"
                        name="inputContract"
                        type="text"
                        value={collectionLookup} // zorbs
                        onChange={(e) => {
                            e.preventDefault();
                            setCollectionLookup(e.target.value)
                        }}
                        required                    
                    >
                    </input>
                    <button
                        className="h-full ml-2 border-2 border-solid text-slate-200 border-slate-200 hover:text-black hover:bg-slate-200  px-2 "
                        onClick={() => {
                            setCollectionCB(collectionLookup)
                        }}
                    >
                        SEARCH
                    </button>
                </div>
                <div className="pt-2 flex flex-col flex-wrap content-center w-full">
                    <div className="h-full">
                        <div className="">
                            Address
                        </div>                
                        <div className=" ">
                            Name
                        </div>
                        <div className=" ">
                            Current Supply
                        </div>
                        <div className=" ">
                            Unique Owners
                        </div>
                        <div className=" ">
                            Sales Volume
                        </div>
                        <div className=" ">
                            Floor Price
                        </div>
                    </div>
                    <div className="h-full">
                        <div className=" ">
                            {"" + (collectionInfo.address.substring(0, 4)) + "..." + (collectionInfo.address.substring(collectionInfo.address.length - 4))}                
                        </div>                
                        <div className=" ">
                            {collectionInfo.name}
                        </div>
                        <div className=" ">
                            {collectionInfo.nftCount}
                        </div>
                        <div className=" ">
                            {collectionInfo.ownerCount}
                        </div>
                        <div className=" ">
                            {"" + Number(collectionInfo["salesVolume"].chainTokenPrice).toFixed(2) + " ETH"}
                        </div>
                        <div className=" ">
                            {collectionInfo.floorPrice + " ETH"} 
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default UserNFTs