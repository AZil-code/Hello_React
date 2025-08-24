import { AnimalList } from './cmps/AnimalList.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { CountDown } from './cmps/CountDown.jsx';
import { Home } from './cmps/Home.jsx';
import { MouseMonitor } from './cmps/MouseMonitor.jsx';
import { SeasonClock } from './cmps/SeasonClock.jsx';
import { WatcherApp } from './cmps/WatcherApp.jsx';
import { utilService } from './services/util.service.js';

const animalInfo = [
   { type: 'Malayan Tiger', count: 787 },
   { type: 'Mountain Gorilla', count: 212 },
   { type: 'Fin Whale', count: 28 },
   { type: 'Belgium Malonoa', count: 20000 },
];

function countDownIsDone(el) {
   console.log(el);
   const animProm = utilService.animateCSS(el);
   console.log('Done!');
}

export function RootCmp() {
   return (
      <section className="app main-layout">
         <AppHeader />
         <main>
            <Home />
            <AnimalList animalInfos={animalInfo} />
            <SeasonClock />
            <CountDown toTime={Date.now() + 1000} startFrom={3} onDone={countDownIsDone} />
            <WatcherApp />
            <MouseMonitor />
         </main>
      </section>
   );
}
