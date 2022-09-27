import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useAppContext } from "../context/useAppContext"

const sortOptions = [
   // { name: 'QUANTITY', queryValue: '0' },
   { name: '1', queryValue: '1' },
   { name: '2', queryValue: '2' },
   { name: '3', queryValue: '3' },
   { name: '4', queryValue: '4' },
   { name: '5', queryValue: '5' },
   { name: '10', queryValue: '10' }
]

export default function MintQuantity({ colorScheme }) {
   const { mintQuantity, setMintQuantity } = useAppContext()
   
   const select = (arg) => {
      setMintQuantity(arg);
   }
   
   return (
      <div className="z-10 flex flex-row justify-self-end hover:bg-[#eee] w-1/2">
         <Listbox value={mintQuantity} onChange={select}>
            <div className="relative w-full">
               <Listbox.Button className="
                  h-full
                  cursor-pointer relative
                  pl-3 pr-10
                  focus-visible:ring-offset-[#000]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
                  >
                  <span className="block truncate">{mintQuantity.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pb-0.4">
                     <SelectorIcon
                        className="h-4 w-4"
                        aria-hidden="true" 
                     />
                  </span>
               </Listbox.Button>

               <Transition
               as={Fragment}
               leave="transition ease-in duration-100"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
               >
                  <Listbox.Options className="absolute z-[11] mt-1 w-full overflow-auto bg-[#f5f5f5] 
                  ring-1 ring-black ring-opacity-5 focus:outline-none">
                     {sortOptions.map((option, optionIdx) => (
                        <Listbox.Option
                        key={optionIdx}
                        className={({ active }) =>
                           `cursor-pointer relative select-none py-1 pl-3 ${
                              active ? `bg-[#eee]` : `bg-[#f5f5f5] `
                           }`
                        }
                        value={option}
                        >
                           {({ selected }) => (
                              <>
                                 <span
                                 className=""
                                 >
                                 {option.name}
                                 </span>
                                 {selected ? (
                                 <span className="absolute inset-y-0 r-0 flex items-center text-black pl-[1em]">
                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                 </span>
                                 ) : null}
                              </>
                           )}
                        </Listbox.Option>

                     ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   )
}