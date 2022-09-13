import Link from "next/link";
import { ElBoton } from "./CustomButton";

export const Header = () => {

  return (
    <div className="p-2 z-10 fixed top-0 left-0 right-0 flex justify-between backdrop-blur-md">

      <div className="flex flex-row w-fit space-x-4">
      <Link
          href="/"
        >
          <a className="filter-none">
          home
          </a>
        </Link>          
        <Link
          href="/un001"
        >
          <a className="filter-none">
          un001
          </a>
        </Link>               
        <Link
          href="/un002"
        >
          <a className="filter-none">
          un002
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
        <ElBoton />
      </div>
      
    </div>
  )

};