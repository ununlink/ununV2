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
                            <Link className='links' href="https://soundcloud.com/platform/hard-dance-093-astrosuka-b2b-sofja" target={`_blank`}>
                                <a className="">
                                Boiler Room Hard Dance 093: astrosuka b2b sofja
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://astrosuka.bandcamp.com/album/nudos" target={`_blank`}>
                                <a className="">
                                astrosuka + sofja - Nudos EP
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=Cxmb5rTSstM" target={`_blank`}>
                                <a className="">
                                gregorio nash x TVLRUIDO STREAMFEST 2021
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://gregorionash.bandcamp.com/track/anti-cheto" target={`_blank`}>
                                <a className="">
                                gregorio nash - anti-cheto
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.nts.live/shows/adam-oko/episodes/adam-oko-24th-october-2021" target={`_blank`}>
                                <a className="">
                                ADAM OKO W/ QOA NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=z3nA15HFQg8" target={`_blank`}>
                                <a className="">
                                Qoa x Nave Anima
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.nts.live/shows/kitrecords/episodes/kit-records-19th-july-2020" target={`_blank`}>
                                <a className="">
                                KIT RECORDS W/ VIC BANG NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://abyssjuke.bandcamp.com/album/blop" target={`_blank`}>
                                <a className="">
                                vic bang - BLOP (abyss)
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=yb7aD1pXOqM" target={`_blank`}>
                                <a className="">
                                Yoto: Hasta que la muerte nos repare, 2020 - MAMBA
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://yoto.bandcamp.com/album/--2" target={`_blank`}>
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
