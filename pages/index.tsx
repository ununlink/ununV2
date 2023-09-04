import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Marquee from "react-fast-marquee";


const Home: NextPage = () => {


    return (
        <div className='flex flex-col justify-around h-screen min-h-screen'>
            <Head>
            <title>✧unun</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <main className="">
                <div className="flex flex-row flex-wrap justify-center space-x-4 items-center mb-10 md:mb-0">
                    <Link
                        href="/un000"
                    >
                        <div 
                        className=" hover:text-[#0000ff] hover:unerline hover:cursor-pointer"
                        >
                            un000
                        </div>
                    </Link>
                    <Link
                        href="/un001"
                    >
                        <div
                            className="hover:text-[#0000ff] hover:unerline hover:cursor-pointer"
                        >
                            un001
                        </div>
                    </Link>                    
                </div>
            </main> */}

              
            <main className=''>

                <div className='fixed top-14 z-[-10]'>
                    <video autoPlay loop muted style={{ width: '500px', height: '500px' }}>
                        <source src="/film.mp4" />
                    </video>

                </div>

                <div className="flex flex-row flex-wrap justify-center space-x-4 items-center mb-10 md:mb-0 ">
                    <Marquee
                                    className="banner md:text-[10em] text-[6em] overflow-hidden font-black italic" speed={200}
                                >unun. mutable netlabel for hybrid music & multimedia experiments.&nbsp;
                    </Marquee>
                    <div className="flex flex-row flex-wrap justify-center mt-16 space-x-8 items-center md:text-[1em] text-[1em]">

                        <Link
                                    href="/un001"
                                >
                                    <div 
                                    className=" hover:text-hover hover:unerline hover:cursor-help"
                                    >
                                        [UN001]
                                    </div>
                        </Link>
                        <Link
                                    href="/un000"
                                >
                                    <div
                                        className="hover:text-hover hover:unerline hover:cursor-help"
                                    >
                                        [UN000]
                                    </div>
                        </Link>  
                    </div>
                </div>
                {/* <div className="h-screen">
                    <Marquee className="md:text-[10em] text-[6em] overflow-hidden font-black text-[#ff4400] italic" speed={200}
                                    >
                                       
                                        mutable netlabel for hybrid music & multimedia experiments.
                                 &nbsp;
                    </Marquee>
                        <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-10 md:mb-0">
                            <Link
                                                href="/un001"
                                            >
                                <div className="border  w-80 h-80  hover:text-hover hover:underline hover:cursor-crosshair">
                                    <span>[UN001]</span>
                                </div>
                            </Link> 
                            <Link
                                                href="/un000"
                                            >
                                <div className="border  w-80 h-80  hover:text-hover hover:underline hover:cursor-crosshair">
                                    <span>[UN000]</span>
                                </div>
                            </Link>

                        </div>
       
                </div> */}
            </main>
        </div>
    )
}

export default Home
