import { createContext, useContext, useState} from 'react';

const AppContext2 = createContext();

export function AppWrapper({ children }) {
    const playlist = useState([
        { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/inicio.mp3',
        title: 'Astrosuka + Sofja - inicio',
        },
        { src: 'https://ipfs.io/ipfs/bafybeidhl3ygczc4b3lfn63mpybkhzpfjdsaz2tafpa35zzvqjfxxwblnq/escondido.mp3',
        title: 'Astrosuka + Sofja - escondido',
        }
      ])
   const values = {
      playlist
   }


   return (
      <AppContext2.Provider value={values}>
         {children}
      </AppContext2.Provider>
   );
}

export function useAppContext2() {
   const context = useContext(AppContext2);

   if(!context){
   console.error('Error deploying other context!!!');
   }

   return context;
}

export default useAppContext2;