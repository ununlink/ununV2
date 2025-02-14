import React from "react";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Header } from "./Header";
import { Footer } from "./Footer";

const Layout = ({ children }) => {

  const router = useRouter();
  const showHeader = router.pathname === "/" ? false : true;

  return (
    <>
        {<Header />}
      {children}
      {<Footer />}
      {/* {showHeader && <Footer />} */}

    </>
  );
};
  
export default Layout;