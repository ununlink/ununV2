import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

const Home: NextPage = () => {


    return (
        <div className='flex flex-col justify-around'>
            <Head>
            <title>✧unun.inicio</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="m-[10%]">
                <p className='italic mb-3'>links</p>
                <div className='flex flex-col'>

                    <p className='links-wrap'>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                Boiler Room Hard Dance 093: astrosuka b2b sofja
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                astrosuka + sofja - Nudos EP
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                gregorio nash x TVLRUIDO STREAMFEST 2021
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                gregorio nash - anti-cheto
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                ADAM OKO W/ QOA NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                Qoa x Nave Anima
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                KIT RECORDS W/ VIC BANG NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                vic bang - BLOP
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                Yoto: Hasta que la muerte nos repare, 2020 - MAMBA
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://twitter.com/_gregorionash" target={`_blank`}>
                                <a className="">
                                yoto - 🍴 
                                </a>
                            </Link>
                        </p>
                    </p>
                    
                </div>
            </main>
        </div>
    )
}

export default Home
