import Link from "next/link";

export const About = () => {

  return (
    <div className=' bg-[#eee] bg-opacity-50 p-4 rounded-lg'>
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
            <a target="_blank" className=''>boedo</a>
        </Link>
        </p>
        <p>
        sofja + astrosuka
        </p>
    </div>
  )

};