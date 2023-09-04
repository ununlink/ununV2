import Link from "next/link";
import { ElBoton } from "./CustomButton";
import { ThemeToggle } from "./ThemeToggle"


export const Header = () => {

  return (
    <div className="p-2 z-10 fixed top-0 left-0 right-0 flex justify-between backdrop-blur-md menu">

      <div className="flex flex-row w-fit space-x-4">  
      <ThemeToggle />
                 
        <Link
          href="/"
        >
          <a className="filter-none not-italic">
          ✧unun.
          </a>
        </Link>
        {/* <Link
          href="/"
        >
          <a className="filter-none not-italic">
          un000
          </a>
        </Link> */}
        <Link
          href="/about"
        >
          <a className="filter-none not-italic">
            ?
          </a>
        </Link>  
        <Link
          href="/links"
        >
          <a className="filter-none not-italic">
            links
          </a>
        </Link>
      </div>

      <div className="">
        <ElBoton />
      </div>
      
    </div>
  )

};