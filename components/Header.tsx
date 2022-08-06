import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ElBoton } from "./CustomButton";
import DarkButton from "./DarkModeButton";


export const Header = () => {

  return (
    <div className="p-2 z-10 fixed top-0 left-0 right-0 flex justify-between backdrop-blur-md">

      <div className="flex flex-row w-fit space-x-4">
        <Link
          href="/"
        >
          <a className="filter-none">
          🌿 mint
          </a>
        </Link>
        <Link
          href="/gallery"
        >
          <a className="filter-none">
            gallery
          </a>
        </Link>
        <Link
          href="/about"
        >
          <a className="filter-none">
            ?
          </a>
        </Link>
      </div>

      <div className="">
        {/* <ConnectButton 
          accountStatus="avatar" 
          showBalance={false}
        /> */}
        <ElBoton />
      </div>
      
    </div>
  )

};