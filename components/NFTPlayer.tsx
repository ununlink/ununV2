import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React from 'react';
// import H5AudioPlayer from 'react-h5-audio-player';
// // import 'react-h5-audio-player/lib/styles.less' Use LESS
// // import 'react-h5-audio-player/src/styles.scss' Use SASS

const playlist = [
  { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/inicio.mp3' },
  { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/escondido.mp3' },
]

export const NFTPlayer = () => {
  const [currentTrack, setTrackIndex] = React.useState(0)

  const handleClickNext = () => {
      console.log('click next')
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleClickPrev = () => {
      console.log('click prev')
        setTrackIndex((currentTrack) =>
            currentTrack > 1 ? currentTrack - 1 : 0
        );
    };
  
  const handleEnd = () => {
    console.log('end')
    setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
  }
  return (
    // <div className='container'>
      <AudioPlayer
        src={playlist[currentTrack].src}
        onPlay={e => console.log("onPlay")}
        // other props here
        showSkipControls
        showJumpControls={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrev}
        onEnded={handleEnd}
      />
  )
}