import AudioPlayer from 'react-h5-audio-player';
import React from 'react';
// import useAppContext from '../context/useAppContext';
// import useAppContext2 from '../context/otherContext';

export const NFTPlayer = () => {
  // const playlist = useAppContext2()
  // console.log(playlist)
  const playlist = [
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/qoa_rui3007.mp3',
      title: 'QOA - RUI3007 [UN001]',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/vic_bang_fluut.mp3',
      title: 'vic bang - fluut [UN001]',
  },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/yoto_pickles.mp3',
      title: 'Yoto - Pickles [UN001]',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/astrosuka_sofja_antenas.mp3',
      title: 'Astrosuka + Sofja - antenas [UN001]',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/gregorio_nash_xoxox.mp3',
      title: 'gregorio nash - xoxox ☀ɱιɱιƚσʂ☀༻ [UN001]',
    },
    { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/inicio.mp3',
      title: 'Astrosuka + Sofja - inicio [UN000]'
    },
    { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/escondido.mp3',
      title: 'Astrosuka + Sofja - escondido [UN000]'
    }
  ]

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