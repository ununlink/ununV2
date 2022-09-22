import AudioPlayer from 'react-h5-audio-player';
import React from 'react';

const playlist = [
  { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/inicio.mp3',
  title: 'Astrosuka + Sofja - inicio',
  },
  { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/escondido.mp3',
  title: 'Astrosuka + Sofja - escondido',
  }
]

export const NFTPlayer = () => {
  const [currentTrack, setTrackIndex] = React.useState(0)

  const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
    };

    const handleClickPrev = () => {
        setTrackIndex((currentTrack) =>
            currentTrack > 1 ? currentTrack - 1 : 0
        );
    };
  
  const handleEnd = () => {
    setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
        );
  }
  return (
    <AudioPlayer
    src={playlist[currentTrack].src}
    // other props here
    header={playlist[currentTrack].title}
    showJumpControls={false}
    showSkipControls={true}
    onClickNext={handleClickNext}
    onClickPrevious={handleClickPrev}
    onEnded={handleEnd}
  />
  )
}