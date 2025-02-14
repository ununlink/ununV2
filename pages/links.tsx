import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { About } from '../components/About'

const Home: NextPage = () => {


    return (
        
        <div className='flex flex-col justify-around'>
            
            <Head>
            <title>✧unun/links</title>
            <meta name="description" content="mutable netlabel for music and multimedia" />
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="mt-12 mb-40">
            <About />
                <div className='flex flex-col mt-10 p-4'>

                    <p className='links-wrap'>
                        <p className='links'>
                            <Link className='links' href="https://soundcloud.com/platform/hard-dance-093-astrosuka-b2b-sofja">
                                <a target={`_blank`}>
                                Boiler Room Hard Dance 093: astrosuka b2b sofja
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://astrosuka.bandcamp.com/album/nudos">
                                <a target={`_blank`}>
                                astrosuka + sofja - Nudos EP
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=Cxmb5rTSstM">
                                <a target={`_blank`}>
                                gregorio nash x TVLRUIDO STREAMFEST 2021
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://gregorionash.bandcamp.com/track/anti-cheto">
                                <a target={`_blank`}>
                                gregorio nash - anti-cheto
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.nts.live/shows/adam-oko/episodes/adam-oko-24th-october-2021">
                                <a target={`_blank`}>
                                ADAM OKO W/ QOA NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=z3nA15HFQg8">
                                <a target={`_blank`}>
                                Qoa x Nave Anima
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://vicbang.bandcamp.com/album/burung">
                                <a target={`_blank`}>
                                vic bang - Burung (Moon Glyph)
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://vicbang.bandcamp.com/album/lira">
                                <a target={`_blank`}>
                                vic bang - Lira (Kit Records)
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=dLV6GtNKQB8&t=1426s">
                                <a target={`_blank`}>
                                Vic Bang en Vivo ≧◠‿◠≦ x Salon Bruit Rerouted x ColaBoRadio
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=RIX2ZpKJ9Wg">
                                <a target={`_blank`}>
                                Música para muebles de interior - Insatlación Audiovisual para Música Expandida - Instituto Kagel
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.nts.live/shows/kitrecords/episodes/kit-records-19th-july-2020">
                                <a target={`_blank`}>
                                KIT RECORDS W/ VIC BANG NTS
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://abyssjuke.bandcamp.com/album/blop">
                                <a target={`_blank`}>
                                vic bang - BLOP (abyss)
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://www.youtube.com/watch?v=yb7aD1pXOqM">
                                <a target={`_blank`}>
                                Yoto: Hasta que la muerte nos repare, 2020 - MAMBA
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://yoto.bandcamp.com/album/--2">
                                <a target={`_blank`}>
                                yoto - 🍴 
                                </a>
                            </Link>
                        </p>
                        <p className='links'>
                            <Link className='links' href="https://aguja.re">
                                <a target={`_blank`}>
                                aguja 
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
