import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

export const watcherService = {
   query,
   get,
   remove,
   save,
};

const DB_KEY = 'watchersDb';

// Sample data for data generation
const firstNames = ['Alex', 'Jordan', 'Taylor', 'Sam', 'Chris', 'Morgan', 'Jamie', 'Riley', 'Casey', 'Avery'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Davis', 'Miller', 'Wilson', 'Moore', 'Clark'];
const movieNames = [
   'The Shawshank Redemption',
   'Inception',
   'The Dark Knight',
   'Pulp Fiction',
   'Forrest Gump',
   'The Matrix',
   'Interstellar',
   'The Godfather',
   'Gladiator',
   'Jurassic Park',
];

// Generate sample data
_setupWatchers();

async function query() {
   // Add filtering - currently none
   return await storageService.query(DB_KEY);
}

async function get(watcherId) {
   return await storageService.get(DB_KEY, watcherId);
}

async function remove(watcherId) {
   return await storageService.remove(DB_KEY, watcherId);
}

async function save(watcher) {
   if (watcher.id) {
      return await storageService.put(DB_KEY, watcher);
   } else {
      return await storageService.post(DB_KEY, watcher);
   }
}

async function _setupWatchers(watcherAmount = 3, movieAmount = 3) {
   let watchers = await storageService.query(DB_KEY);
   if (!watchers || !watchers.length) {
      watchers = [];
      for (let i = 0; i < watcherAmount; ++i) {
         watchers.push(_genWatcher(movieAmount));
      }
      utilService.saveToStorage(DB_KEY, watchers);
   }
}

function _genWatcher(movieAmount = 3) {
   const movies = [];
   for (let m = 0; m < movieAmount; ++m) {
      let movieName;
      while (!movieName || movies.includes(movieName)) movieName = utilService.randomizeString(movieNames);
      movies.push(movieName);
   }
   return {
      id: utilService.makeId(),
      fullName: utilService.randomizeString(firstNames, lastNames),
      movies: movies,
   };
}
