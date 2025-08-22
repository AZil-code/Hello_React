import { watcherService } from '../services/watcher.service.js';

const { useEffect, useState } = React;

const defaultWatchers = [
   {
      id: 'w101',
      fullname: 'Puki Ba',
      movies: ['Rambo', 'Rocky'],
   },
   {
      id: 'w102',
      fullname: 'asdas',
      movies: ['Dark Souls', 'Elden Ring'],
   },
   {
      id: 'w103',
      fullname: 'Ma Gogo',
      movies: ['Harry Potter', 'LoD'],
   },
   {
      id: 'w104',
      fullname: 'Ja Ja Binks',
      movies: ['Star Wars', 'Star Trek'],
   },
];

export function WatcherApp() {
   const [watchers, setWatchers] = useState(undefined);
   const [selectedWatcher, setSelectedWatcher] = useState(null);

   useEffect(() => {
      let isMounted = true; // avoid setting state if component unmounted

      async function fetchData() {
         try {
            const data = await watcherService.query(); // call model layer
            console.log(data);
            if (isMounted) {
               setWatchers(data);
            }
         } catch (err) {
            console.error('Error fetching items', err);
         }
      }

      fetchData();

      return () => {
         isMounted = false;
      };
   }, []);

   function renderWatchers() {
      return watchers.map((watcher) => generateWatcherEl(watcher));
   }

   function generateWatcherEl(watcher) {
      console.log(watcher);
      return (
         <div className="watcher-card" key={watcher.id}>
            <img src="assets/img/season-imgs/autumn.png" />
            <h3 className="watcher-title">{watcher.fullName}</h3>
            <button className="remove-watcher" onClick={() => onRemove(watcher.id)}>
               X
            </button>
            <button className="select-watcher" onClick={() => onSelect(watcher.id)}>
               Select
            </button>
         </div>
      );
   }

   function onAdd() {
      console.log('Add watcher');
      console.log(watchers);
   }

   function onRemove(watcherId) {
      console.log('Remove watcher ' + watcherId);
   }

   function onSelect(watcherId) {
      console.log('Select watcher ' + watcherId);
   }

   if (!watchers) return <h1>Loading...</h1>;
   return (
      <section className="watcher-app">
         <h1>Watcher App</h1>
         <button className="add-watcher-button" onClick={onAdd}>
            Add Watcher
         </button>
         <article className="watcher-container">{renderWatchers()}</article>
      </section>
   );
}
