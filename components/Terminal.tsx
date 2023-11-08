import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/link';

export default function Terminal() {
    let [isOpen, setIsOpen] = useState(false)
    let [publicIsRendered, setPublicIsRendered] = useState("");
    let [holderIsRendered, setHolderIsRendered] = useState("");


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    

    return (
        <> 
   
            <div> 
            <button
                type="button"
                onClick={openModal}
                className="mt-3 sm:text-lg relative justify-center flex flex-row terminal hover:text-hover rounded-lg"
            >open terminal ✧
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
                                ღゝ◡╹)ノ💿

                                    <div className='pt-2 pl-6 pb-10 w-[100%] text-left text-xs terminal'>data:
                                        <>
                                        <ul className='text-xs flex flex-row flex-wrap justify-left items-center'>
                                            <li>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                            </li>
                                            <li>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis in excepturi nostrum, ullam neque tempora est provident! Enim corporis sunt facilis architecto, ipsam quia nobis laboriosam. Id cum odio quas!</p>
                                            </li>
                                        </ul>
                                        </>
                                
                                    </div>



                                </div>
                                <div className="mb-3">
                                
                                </div>
                                <button                                    
                                    className={` hover:bg-red] 
                                    px-2 pb-1 text text-black bg-white rounded-full borer-solid border-white border hover:text-black`} 
                                    onClick={() => {
                                    closeModal()                          
                                    }}
                                >
                                    close
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
    
        </>         
    )




}