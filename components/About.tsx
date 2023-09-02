import Link from "next/link";

export const About = () => {

  return (
    <div>
    <div id="darks" className='bg-background p-4 drop-shadow-hard text-sm'>
        <p className='mb-3'>mutable netlabel for hybrid music & multimedia releases.</p>
        {/* <p className='mb-3'>
        an excuse to collaborate with friends from local scenes, learn new shit and build an autonomous + self sustaining space for experiments.
        </p> */}
        {/* <p className='mb-6'>
        a platform that adapts itself to our artistic needs, not the other way around.
        </p> */}
      <p className="mb-6">
        <p>
          download music:&nbsp;
          <Link href='https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/' >
            <a target="_blank" rel="noreferrer" className=''>un000</a>
          </Link>
          ,&nbsp;
          <Link href='https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/' >
            <a target="_blank" rel="noreferrer" className=''>un001</a>
          </Link>
        </p>
        <Link  href='https://mirror.xyz/unun-link.eth' >
          <a target="_blank" rel="noreferrer">(+info)</a>
        </Link>
      </p>

        {/* <p className='mb-3'>
        {'with <3 from '}
        <Link href='https://goo.gl/maps/rxAJK2uvzUwyVdUr6' >
            <a target="_blank" rel="noreferrer" className=''>boedo</a>
        </Link>
        </p> */}
        <div className="flex justify-between">
          <p>
            <Link href='https://sofffja.com' ><a target="_blank" className=''>sofja</a></Link> + <Link href='https://astrosuka.xyz' ><a target="_blank" className=''>astrosuka</a></Link>
          </p>
          <p className="">
            <Link href='https://twitter.com/ununlink' ><a target="_blank" className=''>tw</a></Link> | <Link href='https://github.com/ununlink/unun' ><a target="_blank" className=''>git</a></Link>
          </p>
        </div>
        
    </div>
    <div className="w-[100%] flex justify-center mt-5"><img className="w-[80px] md:w-[100px]" src="https://ipfs.io/ipfs/bafkreifafxg55lte6mpconj7wna3nafnud37liazalnuykee6m4hidq6eu"></img></div>

    </div>
  )

};