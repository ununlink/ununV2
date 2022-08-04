import Link from "next/link";

export const About = () => {

  return (
    <div>
    <div className=' bg-[#eee] bg-opacity-50 p-4 rounded-sm'>
        <p className='mb-3'>our own small mutable netlabel for hybrid music & multimedia releases.</p>
        <p className='mb-3'>
        an excuse to collaborate with friends from local scenes, learn new shit and build an autonomous + self sustaining space for experiments.
        </p>
        <p className='mb-6'>
        a platform that adapts itself to our artistic needs, not the other way around.
        </p>
        <p className='mb-3'>
        {'with <3 from '}
        <Link href='https://goo.gl/maps/rxAJK2uvzUwyVdUr6' >
            <a target="_blank" rel="noreferrer" className=''>boedo</a>
        </Link>
        </p>
        <p>
        <Link href='https://twitter.com/_sofffja' ><a target="_blank" className=''>sofja</a></Link> + <Link href='https://twitter.com/astrosuka' ><a target="_blank" className=''>astrosuka</a></Link>
        </p>
        
    </div>
    <div className="drop-shadow-soft mb-3 w-[100%] flex justify-center mt-3"><img className="w-[100px]" src="https://ipfs.io/ipfs/bafkreifafxg55lte6mpconj7wna3nafnud37liazalnuykee6m4hidq6eu"></img></div>

    </div>
  )

};