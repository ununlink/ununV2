import { NextPage } from "next"
import { useState, useEffect } from "react"
import { useContractWrite, useSwitchNetwork, useNetwork, useConnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { utils } from "ethers"
const ZoraNFTCreatorProxy_ABI = require("../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json")
const ZoraNFTCreatorProxy_ADDRESS_MAINNET = "0xF74B146ce44CC162b601deC3BE331784DB111DC1"

const DropMetadataRenderer_ABI = require("../node_modules/@zoralabs/nft-drop-contracts/dist/artifacts/DropMetadataRenderer.sol/DropMetadataRenderer.json")
const DropMetadataRenderer_ADDRESS = "0x5914d9a241008B9F02f22811bF3A77e02B84D226"


const Update: NextPage = () => {

  const [metadataInputs, setMetadataInputs] = useState({
    target: "",
    baseUri: "",
    newContractUri: "",
  })

  const { chain } = useNetwork()

  // connect to network and call create drop flow (for when no wallet previously connected)
  const { connectAsync: connectToMainnet } = useConnect({
    connector: new InjectedConnector,
    chainId: 1,
    onSettled(data, error, variables, context) {
      console.log("connect to mainnet settled: ", data)
    },
  })

  const connectToMainnetAndUpdate = async () => {
    await connectToMainnet()
    metadataUpdate()
  }

  // switch network and call create drop flow (for when wallet already connected but to incorrect network

  const { data: mainnetChainData, switchNetworkAsync: switchToMainnet } = useSwitchNetwork({
    chainId: 1,
    onSuccess(mainnetChainData) {
      console.log("Success", mainnetChainData)
    }
  })

  const switchToMainnetAndUpdate = async () => {
    await switchToMainnet()
    metadataUpdate()
  }  

  // updateMetadata function used in button

  const updateMetadataMainnet = () => {
    if (!chain ) {
      connectToMainnetAndUpdate()
      return
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndUpdate()
      return
    }
    metadataUpdate()
  }



  const dealWithEther = (price) => {
    if (price === "") {
      return 0
    }
    return utils.parseEther(price)
  }

  // updateMetadata functions

  const { data: mainnetUpdateData, isError: mainnetUpdateError, isLoading: mainnetUpdateLoading, write: metadataUpdate } = useContractWrite({
    addressOrName: DropMetadataRenderer_ADDRESS,
    contractInterface: DropMetadataRenderer_ABI.abi,
    functionName: 'updateMetadata',
    args: [
        metadataInputs.target,
        metadataInputs.baseUri,
        metadataInputs.newContractUri
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
      <main className="mt-10 pb-10 md:pb-10 mb-20">
        <div className="text-center">
            update metadata
        </div> 
        <div className="md:mx-20 mx-10 my-5 text-left">
          <div className="form-line">
            <div className="form-name">
              contract address
            </div>
            <input
              className="form-input"
              placeholder="your contract"
              name="inputContract"
              type="text"
              defaultValue={metadataInputs.target}
              onChange={(e) => {
                  e.preventDefault();
                  setMetadataInputs(current => {
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
              new base uri
            </div>
            <input
              className="form-input"
              placeholder="baseUri/"
              name="inputContract"
              type="text"
              defaultValue={metadataInputs.baseUri}
              onChange={(e) => {
                  e.preventDefault();
                  setMetadataInputs(current => {
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
              new contract uri
            </div>
            <input
              className="form-input"
              placeholder="contractUri/"
              name="inputContract"
              type="text"
              defaultValue={metadataInputs.newContractUri}
              onChange={(e) => {
                  e.preventDefault();
                  setMetadataInputs(current => {
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
          <div className="flex flex-row justify-around mt-5">
            <button
              className="hover:bg-[#eee] px-5 drop-shadow-hard bg-[#f5f5f5]"
              onClick={() => metadataUpdate()}
            >
              update
            </button>              
          </div>             
        </div>
      </main>
    </div>
  )
}

export default Update
