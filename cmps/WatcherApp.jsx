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
   const [watchers, setWatchers] = useState(defaultWatchers);
   const [selectedWatcher, setSelectedWatcher] = useState(null);

   function renderWatchers() {
      return watchers.map((watcher) => generateWatcher(watcher));
   }

   function generateWatcher(watcher) {
      return (
         <div className="watcher-card" key={watcher.id}>
            <img src="assets/img/season-imgs/autumn.png" className="wathcer-img" />
            <h3 className="watcher-title">{watcher.fullname}</h3>
            <button className="remove-watcher">X</button>
            <button className="select-watcher">Select</button>
         </div>
      );
   }

   return (
      <section className="watcher-app">
         <h1>Watcher App</h1>
         <button className="add-watcher-button">Add Watcher</button>
         <article className="watcher-container">{renderWatchers()}</article>
      </section>
   );
}
