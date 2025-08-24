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
      fetchWatchers();
   }, []);

   async function fetchWatchers() {
      try {
         const data = await watcherService.query();
         setWatchers(data);
      } catch (err) {
         console.error(err);
      }
   }

   function renderWatchers() {
      return watchers.map((watcher) => generateWatcherEl(watcher));
   }

   function generateWatcherEl(watcher) {
      const isSelected = selectedWatcher === watcher.id;
      return (
         <div className={`watcher-card ${isSelected ? 'selected' : ''}`} key={watcher.id}>
            <img src="assets/img/season-imgs/autumn.png" />
            <h3 className="watcher-title">{watcher.fullName}</h3>
            <button className="remove-watcher" onClick={() => onRemove(watcher.id)}>
               X
            </button>
            <button className={`select-watcher ${isSelected ? 'toggled' : ''}`} onClick={() => onSelect(watcher.id)}>
               Select
            </button>
         </div>
      );
   }

   function renderModal() {
      const watcher = watchers.find((watcher) => selectedWatcher === watcher.id);
      return (
         <div className="watcher-details">
            {watcher.movies.map((movie) => (
               <li key={`${watcher.id}-${movie}`}>{movie}</li>
            ))}
            <button onClick={() => setSelectedWatcher(null)}>Close</button>
         </div>
      );
   }

   // Add/remove/select functions can be made sync - send the request to db, and modify the local data
   async function onAdd() {
      const name = prompt('Watcher Name:');
      await watcherService.save({ fullName: name });
      fetchWatchers();
   }

   async function onRemove(watcherId) {
      await watcherService.remove(watcherId);
      fetchWatchers();
   }

   function onSelect(watcherId) {
      setSelectedWatcher(watcherId !== selectedWatcher ? watcherId : null);
   }

   if (!watchers) return <h1>Loading...</h1>;
   return (
      <section className="watcher-app">
         <h1>Watcher App</h1>
         {selectedWatcher && renderModal()}
         <button className="add-watcher-button" onClick={onAdd}>
            Add Watcher
         </button>
         <article className="watcher-container">{renderWatchers()}</article>
      </section>
   );
}
