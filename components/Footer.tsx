import { NFTPlayer } from '../components/NFTPlayer'
import 'react-h5-audio-player/lib/styles.css';


export const Footer = () => {

  return (
   <div className="flex flex-col items-center z-10 fixed bottom-0 left-0 right-0 flex justify-between backdrop-blur-md">
      <div className='w-[100%]'>
          <NFTPlayer />
        </div>
   </div>
  )

};