import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center h-screen min-h-screen bg-gradient-to-r from-black-200 to-blue-300'>
      <Head>
        <title>✧unun.</title>
        <meta name="description" content="✧unun." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center">        
        <h1 className="text-4xl">
          {'✧unun.'}
        </h1>
      </main>

      <Footer />
    </div>
  )
}

export default Home
