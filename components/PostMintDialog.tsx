import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/link';

export default function PostMintDialog({ colorScheme, publicTxnLoadingStatus, publicTxnSuccessStatus, publicTxnHashLink}) {
    let [isOpen, setIsOpen] = useState(false)
    let [publicIsRendered, setPublicIsRendered] = useState("");
    let [holderIsRendered, setHolderIsRendered] = useState("");


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    console.log("WHAT THE FUCK? " + publicTxnHashLink)
    const publicLocalTxnHash = publicTxnHashLink ? publicTxnHashLink.transactionHash : ""

    // const shortenedHash = (hash) => {
    //    let displayHash = hash?.substr(0,4) + "..." + hash?.substr(-4)
    //    return displayHash
    // }

    useEffect(() => {
        setPublicIsRendered(publicTxnSuccessStatus)
        openModal();
        console.log("runnning use effect")
        },
        [publicTxnSuccessStatus]
    )

    return (
        <> 
        {publicTxnLoadingStatus == false && publicIsRendered == "success" ? (    
            <div> 
            <button
                type="button"
                onClick={openModal}
                className="mt-3 w-full sm:text-lg relative justify-center flex flex-row p-2 bg-white hover:text-[#00F] rounded-lg"
            >✧ your mint info ✧
            </button>        
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                    <Dialog.Panel className="w-fit transform align-middletransition-all" >
                        <div className="text-black bg-white border-solid  overflow-hidden rounded-lg shadow-lg shadow-[0_0px_30px_10px_rgba(0,0,0,0.1)] border border-solid border-[#AAA]">
                            <div className="px-8 py-4">
                                <div className="mb-3">
                                {/* ღゝ◡╹)ノ💿 */}
                                🎉🎉🎉
                                </div>
                                <div className="mb-3">
                                <a 
                                    className={` hover:text-[${colorScheme}]`}
                                    href={"https://etherscan.io/tx/" + publicLocalTxnHash}
                                    target="_blank"
                                >
                                    etherscan tx
                            
                                </a>
                                </div>
                                <div className="mb-3">
                                <Link href="/gallery">
                                    <a className={` hover:text-[${colorScheme}]`}>
                                        go to gallery➝ 
                                    </a>
                                </Link>
                                </div>
                                <button                                    
                                    className={` hover:bg-[${colorScheme}] 
                                    px-2 pb-1 text text-black bg-white rounded-full borer-solid border-white border hover:text-black`} 
                                    onClick={() => {
                                    closeModal()                          
                                    }}
                                >
                                    ok
                                </button>
                            </div>
                        </div>                        
                    </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </div> 
            ) : (
                <>
                </>
            )}
        </>         
    )




}