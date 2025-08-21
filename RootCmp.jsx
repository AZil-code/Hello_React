import { AnimalList } from './cmps/AnimalList.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './cmps/Home.jsx';

const animalInfo = [
   { type: 'Malayan Tiger', count: 787 },
   { type: 'Mountain Gorilla', count: 212 },
   { type: 'Fin Whale', count: 28 },
   { type: 'Belgium Malonoa', count: 20000 },
];

export function RootCmp() {
   return (
      <section className="app main-layout">
         <AppHeader />
         <main>
            <Home />
            <AnimalList animalInfos={animalInfo} />
         </main>
      </section>
   );
}
