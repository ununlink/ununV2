import type { NextPage } from 'next'
import Head from 'next/head'
import { About } from '../components/About'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center h-screen min-h-screen bg-gradient-to-r from-black-200 to-blue-300'>
      <Head>
        <title>✧unun/about</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col m-[10%] md:m-[30%] mb-20">        
        <h1 className="text-3xl mb-3 drop-shadow-hard text-[#f5f5f5]">
          {'✧unun.'}
        </h1>

        <About />
      </main>
    </div>
  )
}

export default Home
