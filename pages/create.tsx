import { NextPage } from "next"
import { Header } from "../components/Header"
import { useState, useEffect } from "react"
import { useContractWrite, useSwitchNetwork, useNetwork, useConnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from "ethers"
const ZoraNFTCreatorProxy_ABI = require("../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json")
const ZoraNFTCreatorProxy_ADDRESS_RINKEBY = "0x2d2acD205bd6d9D0B3E79990e093768375AD3a30"
const ZoraNFTCreatorProxy_ADDRESS_MAINNET = "0xF74B146ce44CC162b601deC3BE331784DB111DC1"
const ZoraNFTCreatorProxy_ADDRESS_GOERLI = "0xb9583D05Ba9ba8f7F14CCEe3Da10D2bc0A72f519";


const Create: NextPage = () => {

  const [dropInputs, setDropInputs] = useState({
    contractName: "",
    contractSymbol: "",
    contractAdmin: "",
    contractMaxSupply: "",
    secondaryRoyalties: "1000",
    fundsRecipient: "",
    salesConfig: {
      priceEther: "",
      perWalletMintCap: "",
      publicSaleStart: "0", // makes it so edition will be live to start 
      publicSaleEnd: "5000000000000", // makes it so edition will be live to start
      presaleStart: "0",
      presaleEnd: "0",
      presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    metadataURIBase: "",
    metadtaContractURI: "",
  })

  const [editionInputs, setEditionInputs] = useState({
    contractName: "Example Edition",
    contractSymbol: "EDTN",
    contractMaxSupply: "100",
    secondaryRoyalties: "500",
    fundsRecipient: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    contractAdmin: "0x153D2A196dc8f1F6b9Aa87241864B3e4d4FEc170",
    salesConfig: {
      priceEther: "0.001",
      perWalletMintCap: "5",
      publicSaleStart: "0", // makes it so edition will be live to start
      publicSaleEnd: "5000000000000", // makes it so edition will be live to start
      presaleStart: "0",
      presaleEnd: "0",
      presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    editionDescription: "description",
    metadataAnimationURI: "animationURI/",
    metadataImageURI: "imageURI/",
  })  

  const { chain } = useNetwork()

  // connect to network and call create drop flow (for when no wallet previously connected)
  const { connectAsync: connectToGoerli } = useConnect({
    connector: new InjectedConnector,
    chainId: 5,
    onSettled(data, error, variables, context) {
      console.log("connect to mainnet settled: ", data)
    },
  })

  const { connectAsync: connectToMainnet } = useConnect({
    connector: new InjectedConnector,
    chainId: 1,
    onSettled(data, error, variables, context) {
      console.log("connect to mainnet settled: ", data)
    },
  })

  const connectToGoerliAndDrop = async () => {
    await connectToGoerli()
    goerliDropWrite()
  }
  
  const connectToMainnetAndDrop = async () => {
    await connectToMainnet()
    mainnetDropWrite()
  }

  // switch network and call create drop flow (for when wallet already connected but to incorrect network)
  const { data: goerliChainData, switchNetworkAsync: switchToGoerli } = useSwitchNetwork({
    chainId: 5,
    onSuccess(goerliChainData) {
      console.log("Success", goerliChainData)
    }
  })

  const { data: mainnetChainData, switchNetworkAsync: switchToMainnet } = useSwitchNetwork({
    chainId: 1,
    onSuccess(mainnetChainData) {
      console.log("Success", mainnetChainData)
    }
  })

  const switchToGoerliAndDrop = async () => {
    await switchToGoerli()
    goerliDropWrite()
  }

  const switchToMainnetAndDrop = async () => {
    await switchToMainnet()
    mainnetDropWrite()
  }  

  // createDrop function used in button
  const createDropGoerli = () => {
    if (!chain ) {
      connectToGoerliAndDrop()
      return
    } else if (chain && chain.id !== 5) {
      switchToGoerliAndDrop()
      return
    }
    goerliDropWrite()
  }

  const createDropMainnet = () => {
    if (!chain ) {
      connectToMainnetAndDrop()
      return
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndDrop()
      return
    }
    mainnetDropWrite()
  }


  // connect to network and call create edition flow (for when no wallet previously connected)
  const connectToGoerliAndEdition = async () => {
    await connectToGoerli()
    goerliEditionWrite()
  }

  const connectToMainnetAndEdition = async () => {
    await connectToMainnet()
    mainnetEditionWrite()
  }

  // switch network and call edition drop flow (for when wallet already connected but to incorrect network)
  const switchToGoerliAndEdition = async () => {
    await switchToGoerli()
    goerliEditionWrite()
  }

  const switchToMainnetAndEdition = async () => {
    await switchToMainnet()
    mainnetEditionWrite()
  }

  // createEdition function used in button  
  const createEditionGoerli = () => {
    if (!chain ) {
      connectToGoerliAndEdition()
      return
    } else if (chain && chain.id !== 4) {
      switchToGoerliAndEdition()
      return
    }
    goerliEditionWrite()
  }

  const createEditionMainnet = () => {
    if (!chain ) {
      connectToMainnetAndEdition()
      return
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndEdition()
      return
    }
    mainnetEditionWrite()
  }

  const dealWithEther = (price) => {
    if (price === "") {
      return 0
    }
    return utils.parseEther(price)
  }

  // createDrop functions

  const { data: goerliDropData, isError: goerliDropError, isLoading: goerliDropLoading, write: goerliDropWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_GOERLI,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      dropInputs.fundsRecipient,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ]
  })

  const { data: mainnetDropData, isError: mainnetDropError, isLoading: mainnetDropLoading, write: mainnetDropWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_MAINNET,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      dropInputs.fundsRecipient,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ]
  })

  // createEdition functions

  const { data: goerliEditionData, isError: goerliEditionError, isLoading: goerliEditionLoading, write: goerliEditionWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_GOERLI,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      editionInputs.fundsRecipient,
      editionInputs.contractAdmin,
      [
        dealWithEther(editionInputs.salesConfig.priceEther),
        editionInputs.salesConfig.perWalletMintCap,
        editionInputs.salesConfig.publicSaleStart,
        editionInputs.salesConfig.publicSaleEnd,
        editionInputs.salesConfig.presaleStart,
        editionInputs.salesConfig.presaleEnd,
        editionInputs.salesConfig.presaleMerkleRoot
      ],
      editionInputs.editionDescription,
      editionInputs.metadataAnimationURI,
      editionInputs.metadataImageURI
    ],
  })

  const { data: mainnetEditionData, isError: mainnetEditionError, isLoading: mainnetEditionLoading, write: mainnetEditionWrite } = useContractWrite({
    addressOrName: ZoraNFTCreatorProxy_ADDRESS_MAINNET,
    contractInterface: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      editionInputs.fundsRecipient,
      editionInputs.contractAdmin,
      [
        dealWithEther(editionInputs.salesConfig.priceEther),
        editionInputs.salesConfig.perWalletMintCap,
        editionInputs.salesConfig.publicSaleStart,
        editionInputs.salesConfig.publicSaleEnd,
        editionInputs.salesConfig.presaleStart,
        editionInputs.salesConfig.presaleEnd,
        editionInputs.salesConfig.presaleMerkleRoot
      ],
      editionInputs.editionDescription,
      editionInputs.metadataAnimationURI,
      editionInputs.metadataImageURI
    ]
  })  

  useEffect(() => {
    if(!chain) {
      console.log("no wallet connected")
    } else {
      console.log("chain ID =", chain.id)
    }},
    [chain]
  )

  return (
    <div className="">
      <main className="mt-10 pb-10 md:pb-20 mb-10">
        <div className="text-center">
            drop deployoooor
        </div> 
        <div className="md:mx-20 mx-10 my-5 text-left">
          <div className="form-line">
            <div className="form-name">
              contract name
            </div>
            <input
              className="form-input"
              placeholder="unun uwu"
              name="inputContract"
              type="text"
              value={dropInputs.contractName}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      contractName: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              contract symbol
            </div>
            <input
              className="form-input"
              placeholder="UN000"
              name="inputContract"
              type="text"
              value={dropInputs.contractSymbol}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      contractSymbol: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              contract admin
            </div>
            <input
              className="form-input"
              placeholder="your address"
              name="inputContract"
              type="text"
              value={dropInputs.contractAdmin}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      contractAdmin: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>       
          </div>
          <div className="form-line">
            <div className="form-name">
              contract max supply
            </div>
            <input
              className="form-input"
              placeholder="1000"
              name="inputContract"
              type="number"
              value={dropInputs.contractMaxSupply}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      contractMaxSupply: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>          
          </div>                    
          <div className="form-line">
            <div className="form-name">
              secondary royalties
            </div>
            <input
              className="form-input"
              placeholder="1000"
              name="inputContract"
              type="number"
              value={dropInputs.secondaryRoyalties}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      secondaryRoyalties: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              funds recipient
            </div>
            <input
              className="form-input"
              placeholder="your address"
              name="inputContract"
              type="text"
              value={dropInputs.fundsRecipient}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      fundsRecipient: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              price per mint
            </div>
            <input
              className="form-input"
              placeholder="0.05"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.priceEther}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        priceEther: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              mint cap per wallet
            </div>
            <input
              className="form-input"
              placeholder="1000"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.perWalletMintCap}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        perWalletMintCap: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              public sale start
            </div>
            <input
              className="form-input"
              placeholder="Input NFT Address"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.publicSaleStart}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        publicSaleStart: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              public sale end
            </div>
            <input
              className="form-input"
              placeholder="Input NFT Address"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.publicSaleEnd}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        publicSaleEnd: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              presale start
            </div>
            <input
              className="form-input"
              placeholder="Input NFT Address"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.presaleStart}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        presaleStart: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>                 
          <div className="form-line">
            <div className="form-name">
              presale end
            </div>
            <input
              className="form-input"
              placeholder="Input NFT Address"
              name="inputContract"
              type="number"
              value={dropInputs.salesConfig.presaleEnd}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        presaleEnd: e.target.value
                      }                        
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              presale merkle root
            </div>
            <input
              className="form-input"
              placeholder="Input NFT Address"
              name="inputContract"
              type="text"
              value={dropInputs.salesConfig.presaleMerkleRoot}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      salesConfig: {
                        ...current.salesConfig,
                        presaleMerkleRoot: e.target.value
                      }
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              uri base
            </div>
            <input
              className="form-input"
              placeholder="uribase/"
              name="inputContract"
              type="text"
              value={dropInputs.metadataURIBase}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      metadataURIBase: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>
          <div className="form-line">
            <div className="form-name">
              contract uri
            </div>
            <input
              className="form-input"
              placeholder="contracturi/"
              name="inputContract"
              type="text"
              value={dropInputs.metadtaContractURI}
              onChange={(e) => {
                  e.preventDefault();
                  setDropInputs(current => {
                    return {
                      ...current,
                      metadtaContractURI: e.target.value
                    }
                  })
              }}
              required                    
            >
            </input>
          </div>      
          <div className="flex flex-row justify-around mt-5">
            <button
              className="hover:bg-[#eee] px-5 drop-shadow-hard bg-[#f5f5f5]"
              onClick={() => createDropMainnet()}
            >
              create
            </button>              
          </div>                   
        </div>
      </main>
    </div>
  )
}

export default Create
