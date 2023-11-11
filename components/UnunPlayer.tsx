import AudioPlayer from 'react-h5-audio-player';
import React from 'react';
// import useAppContext from '../context/useAppContext';
// import useAppContext2 from '../context/otherContext';

export const UnunPlayer = () => {
  // const playlist = useAppContext2()
  // console.log(playlist)
  const playlist = [
    { src: '/un002/01 antro.mp3',
    title: '[UN002] Aguja - antro',
    },
    { src: '/un002/02 13 42 57 68.mp3',
    title: '[UN002] Aguja - 13 42 57 68',
    },
    { src: '/un002/03 carta.mp3',
    title: '[UN002] Aguja - carta',
    },
    { src: '/un002/04 huesos afilados.mp3',
    title: '[UN002] Aguja - huesos afilados',
    },
    { src: '/un002/05 propulsor.mp3',
    title: '[UN002] Aguja - propulsor',
    },
    { src: '/un002/06 tecno.mp3',
    title: '[UN002] Aguja - tecno',
    },
    { src: '/un002/07 6167756a61.mp3',
    title: '[UN002] Aguja - 6167756a61',
    },
    { src: '/un002/08 mar cuadrado.mp3',
    title: '[UN002] Aguja - mar cuadrado',
    },
    { src: '/un002/09 sin título (bonus track).mp3',
    title: '[UN002] Aguja - sin título (bonus track)',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/qoa_rui3007.mp3',
      title: '[UN001] QOA - RUI3007',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/vic_bang_fluut.mp3',
      title: '[UN001] vic bang - fluut',
  },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/yoto_pickles.mp3',
      title: '[UN001] Yoto - Pickles',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/astrosuka_sofja_antenas.mp3',
      title: '[UN001] Astrosuka + Sofja - antenas',
    },
    { src: 'https://ipfs.io/ipfs/bafybeicb2wmg7ud2hzn4zsvg4o25msjv2ylyoh5q4ybgsldbofmrvvosoa/gregorio_nash_xoxox.mp3',
      title: '[UN001] gregorio nash - xoxox ☀ɱιɱιƚσʂ☀༻',
    },
    { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/inicio.mp3',
      title: '[UN000] Astrosuka + Sofja - inicio'
    },
    { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/escondido.mp3',
      title: '[UN000] Astrosuka + Sofja - escondido'
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