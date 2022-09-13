import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {


    return (
        <div className='flex flex-col justify-around h-screen min-h-screen'>
            <Head>
            <title>✧unun.inicio</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <div className="flex flex-row flex-wrap justify-center space-x-4 items-center mb-10 md:mb-0">
                    <Link
                        href="/un001"
                    >
                        <div 
                        className=" hover:text-[#0000ff] hover:unerline hover:cursor-pointer"
                        >
                            un001
                        </div>
                    </Link>
                    <Link
                        href="/un002"
                    >
                        <div
                            className="hover:text-[#0000ff] hover:unerline hover:cursor-pointer"
                        >
                            un002
                        </div>
                    </Link>                    
                </div>
            </main>
        </div>
    )
}

export default Home
