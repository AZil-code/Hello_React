// import { useState } from 'react';

import { utilService } from '../services/util.service.js';

const { useState, useEffect } = React;
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
];
const seasonTransitions = [new Date(2000, 2, 20), new Date(2000, 5, 20), new Date(2000, 8, 22), new Date(2000, 11, 21)];

export function SeasonClock() {
   const [isDark, setIsDark] = useState(false);
   const [timer, setTimer] = useState(new Date());
   let day, month, season;
   useEffect(() => {
      const intId = setInterval(() => setTimer(new Date()), 1000);

      return () => clearInterval(intId);
   }, []);

   function onToggleDarkMode() {
      setIsDark(!isDark);
   }

   function getSeason(date) {
      const checkDate = new Date(2000, date.getMonth(), date.getDate());
      if (checkDate < seasonTransitions[0] || checkDate >= seasonTransitions[3]) return 'Winter';
      if (checkDate < seasonTransitions[1]) return 'Spring';
      if (checkDate < seasonTransitions[2]) return 'Summer';
      if (checkDate < seasonTransitions[3]) return 'Autumn';
   }

   function generateClock() {
      return utilService.formatClock([timer.getHours(), timer.getMinutes(), timer.getSeconds()]);
   }

   day = dayNames[timer.getDay()];
   month = monthNames[timer.getMonth()];
   season = getSeason(timer);
   const isDarkClass = isDark ? 'dark' : '';
   return (
      <section className={`season-clock ${isDarkClass}`} onClick={onToggleDarkMode}>
         <h2>{`${month} (${season})`}</h2>
         <img src={`./assets/img/season-imgs/${season.toLowerCase()}.png`}></img>
         <h3>{day}</h3>
         <h3 className="clock">{generateClock()}</h3>
      </section>
   );
}
