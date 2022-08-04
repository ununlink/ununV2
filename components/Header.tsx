import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ElBoton } from "./CustomButton";


export const Header = () => {

  return (
    <div className="p-2 z-10 fixed top-0 left-0 right-0 flex justify-between backdrop-blur-md">

      <div className="flex flex-row w-fit space-x-4">
        <Link
          href="/"
        >
          <a className="hover:text-[#0000ff]">
          🌿 mint
          </a>
        </Link>
        {/* <Link
          href="/mint"
        >
          <a className="hover:text-[#0000ff]">
          🌿mint
          </a>
        </Link> */}
        <Link
          href="/gallery"
        >
          <a className="hover:text-[#0000ff]">
            view gallery
          </a>
        </Link>
        <Link
          href="/about"
        >
          <a className="hover:text-[#0000ff]">
            ?
          </a>
        </Link>
      </div>

      <div className="">
        {/* <ConnectButton 
          accountStatus="address" 
          showBalance={false}
        /> */}
        <ElBoton />
      </div>
      
    </div>
  )

};