import Image from "next/image";
import { NFTPlayer } from '../components/NFTPlayer'


export const Footer = () => {

  return (
   <div className="flex flex-col items-center p-2 z-10 fixed bottom-0 left-0 right-0 flex justify-between backdrop-blur-md">
      {/* <div>
         💿
      </div>
      <div>
         a++s
      </div> */}
      <div className='w-[100%]'>
          <NFTPlayer />
        </div>
   </div>
  )

};